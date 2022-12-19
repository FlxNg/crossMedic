import React, { useEffect } from "react";
import { Storage } from '@ionic/storage';
import { useHistory } from "react-router-dom";
import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { home } from "ionicons/icons";

const AboutUs: React.FC = () => {
    const history = useHistory();

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

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>About Us</IonTitle>
                    <IonAvatar slot="end" className="avatar"><img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile Pic"></img></IonAvatar>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <img src="assets/image/umnmedicalcenter.png" alt="" />
                    </IonRow>
                    <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonText className="ion-text-center">Visit UMN Medical Center website at: <a href="https://medic.umn.ac.id" target="_blank">medic.umn.ac.id</a></IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Project created by:</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonItem>
                                    <IonAvatar slot="start"><img src="assets/image/Felix Nugraha.jpg" alt="Felix Nugraha"></img></IonAvatar>
                                    <IonLabel>
                                        <h2>Felix Nugraha</h2>
                                        <IonText>NIM: 00000043938</IonText>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start"><img src="assets/image/Leonardus Efendi.png" alt="Leonardus Efendi"></img></IonAvatar>
                                    <IonLabel>
                                        <h2>Leonardus Efendi</h2>
                                        <IonText>NIM: 00000043939</IonText>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start"><img src="assets/image/Putra Tjandra.jpeg" alt="Putra Tjandra"></img></IonAvatar>
                                    <IonLabel>
                                        <h2>Putra Tjandra</h2>
                                        <IonText>NIM: 00000043354</IonText>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start"><img src="assets/image/cw.jpg" alt="Christian Winarta"></img></IonAvatar>
                                    <IonLabel>
                                        <h2>Christian Winarta</h2>
                                        <IonText>NIM: 00000043902</IonText>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonAvatar slot="start"><img src="assets/image/liong.jpg" alt="Steven Liong"></img></IonAvatar>
                                    <IonLabel>
                                        <h2>Steven Liong</h2>
                                        <IonText>NIM: 00000042707</IonText>
                                    </IonLabel>
                                </IonItem>
                                    <IonItem>
                                        <IonAvatar slot="start"><img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Hendy"></img></IonAvatar>
                                        <IonLabel>
                                            <h2>Hendy Ferdianto Halim</h2>
                                            <IonText>NIM: 00000050502</IonText>
                                        </IonLabel>
                                    </IonItem>
                            </IonCardContent>
                        </IonCard>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" color="light" routerLink="/home">
                                <IonIcon slot="start" icon={home} />
                                Back to home
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default AboutUs;