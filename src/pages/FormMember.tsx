import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonList, IonSelect, IonSelectOption, IonButton, useIonToast } from "@ionic/react";
import { Storage } from "@ionic/storage";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { MemberContext } from "../data/MemberContext";

const FormMember: React.FC = () => {    

    const memberCtx = useContext(MemberContext);

    const nama = useRef<HTMLIonInputElement>(null);
    const number = useRef<HTMLIonInputElement>(null);
    const hoursStart = useRef<HTMLIonInputElement>(null);
    const hoursEnd = useRef<HTMLIonInputElement>(null);
    let day: any = 'Mon';

    const [idStore, setIdStore] = useState();
    const [nameStore, setNameStore] = useState('');
    const [phoneStore, setPhoneStore] = useState('');
    const [dayStore, setDayStore] = useState('');
    const [hoursStartStore, setHoursStartStore] = useState('');
    const [hoursEndStore, setHoursEndStore] = useState('');

    let hours: any;

    const addHandler = () => {
        console.log("add");
        hours = hoursStart.current?.value + " - " + hoursEnd.current?.value;
        memberCtx.addMember(nama.current?.value, number.current?.value, day, hours)
        present({
            message: 'Member Added',
            duration: 1500,
            position: 'bottom'
        })
        history.replace('/admin/members')
    }

    const [present] = useIonToast();
    const history = useHistory();

    const editHandler = () => {
        console.log("edit");
        hours = hoursStart.current?.value + " - " + hoursEnd.current?.value;
        memberCtx.updateMember(idStore, nama.current?.value, number.current?.value, day, hours)
        present({
            message: 'Member Edited!',
            duration: 1500,
            position: 'bottom'
        })
        history.replace('/admin/members')
        
    }

    useEffect(() => {
        const getInit = () => {
            const store = new Storage();
            store.create();

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
        }

        getInit();
    })

    if(idStore === 0){
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