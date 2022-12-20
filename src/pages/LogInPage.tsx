import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonToast, } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import UsersContext from "../data/user-context";
import '../theme/login.css'
import { collection, addDoc, getDocs} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";

const LogInPage: React.FC = () => {
    const history = useHistory();
    const usersCtx = useContext(UsersContext);
    const [nullToast, setNullToast] = useState(false);
    const [invalidToast, setInvalidToast] = useState(false);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passRef = useRef<HTMLIonInputElement>(null);

    const db = getFirestore();
    const [users, setUsers] = useState<Array<any>>([]);

    useEffect(()=>{
        async function getData(){
          const querySnapshot = await getDocs(collection(db, "users"));
          setUsers(querySnapshot.docs.map((doc)=>({...doc.data(), id:doc.id})));
        }
        getData();
      }, []);
      
      
    const login = async(nama: string, nim: string, prodi: string, email:string) => {
        await usersCtx.logIn(nama, nim, prodi, email);
        history.replace("/checkUser");
    }

    const loginAdmin = async(email:string) => {
        await usersCtx.logIn("admin", "admin", "admin", email);
        history.replace("/admin"); 
    }

    const logInHandler = () => {
        if(emailRef.current?.value === "" || passRef.current?.value === "") {
            setNullToast(true);
        }
        if(emailRef.current?.value === "admin@umn.ac.id" && passRef.current?.value === "admin123"){
            loginAdmin("admin@umn.ac.id");
        }
        else{
            var email = emailRef.current?.value?.toString;
            // if((email+"").includes("@student.umn.ac.id")) {
                for (let index = 0; index < users.length; index++) {
                    if(emailRef.current?.value === users[index].email && passRef.current?.value === users[index].password) {
                        login(users[index].nama, users[index].nim, users[index].prodi, users[index].email);
                        break;
                    }

                }
            // }
            setInvalidToast(true);
        }
    }

    return (
        <>
        <IonPage>
            <IonContent >
                <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>
                <IonRow className="ion-justify-content-center">
                    <img src="assets/image/umnmedicalcenter.png" alt=""/>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonText>
                        <h1>Log In</h1>
                    </IonText>
                </IonRow>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol sizeLg="4">
                            <IonCard>
                                <IonCardContent>
                                    <IonItem>
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="email" placeholder="Input Email anda" ref={emailRef}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" placeholder="Input password anda" ref={passRef}></IonInput>
                                    </IonItem>
                                    <IonButton color="success" className="ion-margin" shape="round" fill="solid" expand="block" onClick={logInHandler}>
                                        Log In
                                    </IonButton>
                                    <IonRow className="ion-justify-content-center">
                                        <IonText>Belum punya akun? <a href="/register">Register sekarang</a>!</IonText>
                                    </IonRow>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>
                <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>
                <IonRow className="ion-justify-content-center">
                    <img src="assets/image/umnlogo.png" alt=""/>
                </IonRow>
            </IonContent>
        </IonPage>
        <IonToast
            isOpen={nullToast}
            onDidDismiss={() => setNullToast(false)}
            message="Mohon input Email dan password anda!"
            duration={1500}
        />
        <IonToast
            isOpen={invalidToast}
            onDidDismiss={() => setInvalidToast(false)}
            message="Email atau password anda salah!"
            duration={1500}
        />
        </>
    )
}

export default LogInPage;