import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonToast, } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import UsersContext from "../data/user-context";
import '../theme/login.css'

import { collection, addDoc, getDocs} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import "../firebaseConfig";

const RegisterPage: React.FC = () => {
    const history = useHistory();
    const usersCtx = useContext(UsersContext);
    const [nullToast, setNullToast] = useState(false);
    const [passToast, setPassToast] = useState(false);
    const [emailToast, setEmailToast] = useState(false);
    const [doubleToast, setDoubleToast] = useState(false); 
    const namaRef = useRef<HTMLIonInputElement>(null);
    const nimRef = useRef<HTMLIonInputElement>(null);
    const prodiRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passRef = useRef<HTMLIonInputElement>(null);
    const conPassRef = useRef<HTMLIonInputElement>(null);

    const storage = getStorage();
    const db = getFirestore();
    const [users, setUsers] = useState<Array<any>>([]);
  
    
    useEffect(()=>{
        async function getData(){
          const querySnapshot = await getDocs(collection(db, "users"));
          setUsers(querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }
        getData();
      }, []);
      
    const addData = async() =>{
        try {
        const docRef = await addDoc(collection(db, "users"), {
            nim: nimRef.current?.value,
            nama: namaRef.current?.value,
            prodi: prodiRef.current?.value,
            email : emailRef.current?.value,
            password : passRef.current?.value
        });
        // console.log('Document written with ID:', docRef.id);
        } catch (e){
        console.error("Error adding document : ",e);
        }
    }

    const registerHandler = () => {
        if(!((emailRef.current?.value?.toString()+"").includes("umn.ac.id"))) {
            setEmailToast(true);
            return;
        }
        if(conPassRef.current?.value !== passRef.current?.value) {
            setPassToast(true);
            return;
        }
        if(namaRef.current?.value === "" || nimRef.current?.value === "" || prodiRef.current?.value === "" || emailRef.current?.value === "" || passRef.current?.value === "") {
            setNullToast(true);
        } else {
            for (let index = 0; index < users.length; index++) {
                if(emailRef.current?.value === users[index].email || nimRef.current?.value === users[index].nim){
                    setDoubleToast(true);
                    return;
                }
                else{
                    addData();
                    usersCtx.logIn(namaRef.current?.value+"", nimRef.current?.value+"", prodiRef.current?.value+"", emailRef.current?.value+"");
                    break;
                }
            }

            history.replace("/checkUser");
        }
    }

    return (
        <>
        <IonPage>
            <IonContent>
                <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>
                <IonRow className="ion-justify-content-center">
                    <img src="assets/image/umnmedicalcenter.png" alt=""/>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonText>
                        <h1>Register</h1>
                    </IonText>
                </IonRow>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeLg="4">
                            <IonCard>
                                <IonCardContent>
                                    <IonItem>
                                        <IonLabel position="floating">Nama Lengkap</IonLabel>
                                        <IonInput type="text" placeholder="Input nama lengkap anda" ref={namaRef}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">NIM</IonLabel>
                                        <IonInput type="text" placeholder="Input NIM anda" ref={nimRef}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Prodi</IonLabel>
                                        <IonInput type="text" placeholder="Input prodi anda" ref={prodiRef}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="email" placeholder="Input Email anda" ref={emailRef}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" placeholder="Input password anda" ref={passRef}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Confirm Password</IonLabel>
                                        <IonInput type="password" placeholder="Confirm password anda" ref={conPassRef}></IonInput>
                                    </IonItem>
                                    <IonButton color="success" className="ion-margin" shape="round" fill="solid" expand="block" onClick={registerHandler}>
                                        Register
                                    </IonButton>
                                    <IonRow className="ion-justify-content-center">
                                        <IonText>Sudah memiliki akun? <a href="/login">Log in sekarang</a>!</IonText>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
        <IonToast
            isOpen={nullToast}
            onDidDismiss={() => setNullToast(false)}
            message="Mohon masukkan seluruh input yang diperlukan!"
            duration={1500}
        />
        <IonToast
            isOpen={passToast}
            onDidDismiss={() => setPassToast(false)}
            message="Password dan Confirm password tidak sesuai!"
            duration={1500}
        />
        <IonToast
            isOpen={doubleToast}
            onDidDismiss={() => setDoubleToast(false)}
            message="Email atau NIM sudah pernah dipakai!"
            duration={1500}
        />
        <IonToast
            isOpen={emailToast}
            onDidDismiss={() => setEmailToast(false)}
            message="Email harus menggunakan email umn"
            duration={1500}
        />
        </>
    )
}

export default RegisterPage;