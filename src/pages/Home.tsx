import { IonAvatar, IonButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar, isPlatform } from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../data/user-context";
import { Storage } from '@ionic/storage';
import '../theme/home.css'
import { useHistory } from "react-router-dom";
import { add, person, personAdd } from 'ionicons/icons';
import AboutUs from "./AboutUs";

const Home: React.FC = () => {
    const history = useHistory();
    const usersCtx = useContext(UsersContext);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const store = new Storage();
            await store.create();

            const nameStore = await store.get("namaLengkap");
            const nimStore = await store.get("nim");
            const prodiStore = await store.get("prodi");
            const emailStore = await store.get("email");

            // console.log(nameStore, nimStore, prodiStore, emailStore);

            if (nameStore === null || nimStore === null || prodiStore === null || emailStore === null) {
                history.replace("/checkUser");
                return;
            }

            setUserName(nameStore);
        }

        getUser();
    })

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonButton routerLink="/profile">
                                <IonIcon icon={person} />
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Welcome, {userName}</IonTitle>
                        {/* <IonAvatar slot="end" className="avatar"><img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile Pic"></img></IonAvatar> */}
                    </IonToolbar>
                </IonHeader>

                <IonContent className="gradient">
                    {!isPlatform("desktop") && (
                        <IonGrid className="box">
                            <IonRow>
                                <IonCol>
                                    <IonCard button routerLink="/requesthelp">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconRequestHelp" src="assets/image/requesthelp.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">Request Help</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard button routerLink="/viewrequest">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconViewRequest" src="assets/image/viewrequest.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">View Request</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonCard button routerLink="/syaratdanketentuan">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconsk" src="assets/image/syaratketentuan.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">Syarat & Ketentuan</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard button routerLink="/aboutus">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconabout" src="assets/image/medic.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">About Us</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>)}

                    {isPlatform("desktop") && (
                        <IonGrid className="boxDesktop">
                            <IonRow>
                                <IonCol>
                                    <IonCard button routerLink="/requesthelp">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconRequestHelp-d" src="assets/image/requesthelpbig.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">Request Help</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard button routerLink="/viewrequest">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconViewRequest-d" src="assets/image/viewrequest.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">View Request</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonCard button routerLink="/syaratdanketentuan">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconsk-d" src="assets/image/syaratketentuan.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">Syarat & Ketentuan</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                                <IonCol>
                                    <IonCard button routerLink="/aboutus">
                                        <IonRow className="ion-justify-content-center">
                                            <img className="iconabout-d" src="assets/image/medic.png" alt="Request" />
                                        </IonRow>
                                        <IonCardHeader>
                                            <IonCardTitle className="ion-text-center">About Us</IonCardTitle>
                                        </IonCardHeader>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>)}
                    <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>
                    <IonRow><IonCol size="12" className="ion-margin-bottom"></IonCol></IonRow>

                    {/* Yang buat bagian telpon modif aja lgsg harusnya sih bisa yaa, bismillah*/}
                    <IonRow className="ion-justify-content-center">
                        <a href="tel:021542208087000"><div className="red">
                            <img className="iconemergency-d" src="assets/image/emergencycall.png" />
                        </div></a>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                        <IonTitle className="ion-text-center"><h1><b>Emergency Call</b></h1></IonTitle>
                    </IonRow>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Home;