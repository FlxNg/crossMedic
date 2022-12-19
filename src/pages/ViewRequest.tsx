import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonCol, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getFirestore, query, where } from "firebase/firestore";
import { home } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import '../theme/viewReq.css'
import React from "react";

const ViewRequest: React.FC = () => {
    const history = useHistory();

    const [request, setRequest] = useState<Array<any>>([]);

    const db = getFirestore();

    useEffect(() => {
        const getRequest = async () => {
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
            const q = query(collection(db, "requesthelp"), where("created_by", "==", nimStore));
            const querySnapshot = await getDocs(q);

            setRequest(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getRequest();
        
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>View Request</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="cardLuar">
                    <IonCardContent>
                        <IonCardHeader>
                            <IonRow>
                                <IonCol className="subJudulLeft">
                                    <h1>Request</h1>
                                </IonCol>
                                <IonCol className="subJudulRight">
                                    <h1>Status</h1>
                                </IonCol>
                            </IonRow>
                            {request.map((item, index) => {
                                return (
                                    <IonCard button routerLink={`/viewdetailrequest/`+item.id} className="cardDalam">
                                        <IonCardContent>
                                            <IonCardHeader>
                                                <IonRow key={item.id}>
                                                    <IonCol>{item.nama_acara}</IonCol>
                                                    <IonCol className="right">{item.status}</IonCol>
                                                </IonRow>
                                            </IonCardHeader>
                                        </IonCardContent>
                                    </IonCard>
                                )
                            })}
                            <IonRow>
                                <IonCol >
                                    <IonButton expand="block" color="success" routerLink="/home">
                                        <IonIcon slot="start" icon={home} />
                                        Back
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCardHeader>
                    </IonCardContent>
                </IonCard>
            </IonContent>

        </IonPage>
    );
}

export default ViewRequest;