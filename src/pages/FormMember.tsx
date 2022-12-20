import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonList, IonSelect, IonSelectOption, IonButton, useIonToast } from "@ionic/react";
import { Storage } from "@ionic/storage";
import { id } from "date-fns/locale";
import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { MemberContext } from "../data/MemberContext";

const FormMember: React.FC = () => {    

    // const memberCtx = useContext(MemberContext);

    const [idStore, setIdStore] = useState('');
    const [nameStore, setNameStore] = useState('');
    const [phoneStore, setPhoneStore] = useState('');
    const [dayStore, setDayStore] = useState('');
    const [hoursStartStore, setHoursStartStore] = useState('');
    const [hoursEndStore, setHoursEndStore] = useState('');
    const [isNewMember, setIsNewMember] = useState<true|false>(true);

    const nama = useRef<HTMLIonInputElement>(null);
    const number = useRef<HTMLIonInputElement>(null);
    const hoursStart = useRef<HTMLIonInputElement>(null);
    const hoursEnd = useRef<HTMLIonInputElement>(null);
    let day: any = dayStore;

    let hours: any;

    useEffect(() => {
        const getUser = async () => {
            const store = new Storage();
            await store.create();

            const nameStore = await store.get("namaLengkap");
            const nimStore = await store.get("nim");
            const prodiStore = await store.get("prodi");
            const emailStore = await store.get("email");

            if (nameStore === null || nimStore === null || prodiStore === null || emailStore === null) {
                history.replace("/checkUser");
                return;
            }
        }

        getUser();
    })

    const addHandler = async () => {
        console.log("add");
        
        if(nama!==null||number!==null||hoursStart!==null||hoursEnd!==null||day!==null) {
            hours = hoursStart.current?.value + " - " + hoursEnd.current?.value;
            try {
                const memberRef = await addDoc(collection(db, 'members'),{
                    name:nama.current!.value,
                    phone:number.current!.value,
                    hours:hours,
                    day:day,
                    available:true
                })
            } catch (error) {
                console.log(error);
            }
            present({
                message: 'Member Added',
                duration: 1500,
                position: 'bottom'
            });
        } else {
            present({
                message: 'Please fill in the form',
                duration: 1500,
                position: 'bottom'
            });
            return;
        }
        history.goBack();
    }

    const [present] = useIonToast();
    const history = useHistory();
    const db = getFirestore(); 
    const editHandler = async() => {
        console.log("edit");
        hours = hoursStart.current?.value + " - " + hoursEnd.current?.value;
        
        const memberRef = doc(db, "members", idStore);
        await updateDoc(memberRef,{
            "name":nama.current?.value,
            "phone":number.current?.value,
            "hours":hours,
            "day":day}).then(memberRef => {
            console.log("member edit");
        }).catch(error => {
            console.log(error);
        });
        present({
            message: 'Member Edited!',
            duration: 1500,
            position: 'bottom'
        })
        history.goBack();
        
    }

    useEffect(() => {
        const getInit = async () => {
            const store = new Storage();
            store.create();
            if(await store.get('FormFor')!=="add_new_member") {
                store.get('id').then((value) => {
                    setIdStore(value);
                });
                store.get('name').then((value) => {
                    setNameStore(value);
                });
                store.get('phone').then((value) => {
                    setPhoneStore(value);
                });
                store.get('day').then((value) => {
                    setDayStore(value);
                });
                store.get('hours').then((value) => {
                    
                        var splitted = value.split(" - ", 2);
                        setHoursStartStore(splitted[0]);
                        setHoursEndStore(splitted[1]);
                    
                });
                setIsNewMember(false);
            }
        }

        getInit();
    }, []);

    if(isNewMember){
        return(
            <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>        
                    <IonTitle>Form Member</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonLabel position="floating">Nama</IonLabel>
                    <IonInput ref={nama} placeholder="Name"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Phone</IonLabel>
                    <IonInput ref={number} placeholder="000"></IonInput>
                </IonItem>        
                <IonItem>
                    <IonLabel position="floating">Start Time</IonLabel>
                    <IonInput type="time" ref={hoursStart} placeholder="HH:MM"></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">End Time</IonLabel>
                    <IonInput type="time" ref={hoursEnd} placeholder="HH:MM"></IonInput>
                </IonItem>
                <IonItem>
                    <IonList>
                        <IonItem>
                            <IonSelect interface="action-sheet" placeholder="Select day" onIonChange={e => day = e.detail.value}>
                                <IonSelectOption value="Mon">Monday</IonSelectOption>
                                <IonSelectOption value="Tue">Tuesday</IonSelectOption>
                                <IonSelectOption value="Wed">Wednesday</IonSelectOption>
                                <IonSelectOption value="Thu">Thursday</IonSelectOption>
                                <IonSelectOption value="Fri">Friday</IonSelectOption>
                                <IonSelectOption value="Sat">Saturday</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonList>  
                </IonItem>   
                <IonItem>
                    <IonButton onClick={addHandler}>Confirm</IonButton>
                </IonItem>
            </IonContent>
        </IonPage>
        )
    }else{
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>        
                        <IonTitle>Form Member</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonLabel position="floating">Nama</IonLabel>
                        <IonInput ref={nama} placeholder="Name" value={nameStore}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Phone</IonLabel>
                        <IonInput ref={number} placeholder="Phone Number" value={phoneStore}></IonInput>
                    </IonItem>        
                    <IonItem>
                    <IonLabel position="floating">Start Time</IonLabel>
                    <IonInput type="time" ref={hoursStart} placeholder="HH:MM" value={hoursStartStore}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">End Time</IonLabel>
                    <IonInput type="time" ref={hoursEnd} placeholder="HH:MM" value={hoursEndStore}></IonInput>
                </IonItem>  
                    <IonItem>
                        <IonList>
                            <IonItem>
                                <IonSelect interface="action-sheet" placeholder="Select day" onIonChange={e => day = e.detail.value} value={dayStore}>
                                    <IonSelectOption value="Mon">Monday</IonSelectOption>
                                    <IonSelectOption value="Tue">Tuesday</IonSelectOption>
                                    <IonSelectOption value="Wed">Wednesday</IonSelectOption>
                                    <IonSelectOption value="Thu">Thursday</IonSelectOption>
                                    <IonSelectOption value="Fri">Friday</IonSelectOption>
                                    <IonSelectOption value="Sat">Saturday</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={editHandler}>Confirm</IonButton>
                    </IonItem>
                </IonContent>
            </IonPage>
        )
    }
    
}

export default FormMember;