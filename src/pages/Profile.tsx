import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import {home, logOut, person} from 'ionicons/icons';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Storage} from '@ionic/storage';
import '../theme/profpic.css'

const Profile: React.FC = () => {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [nim, setNim] = useState('');
    const [prodi, setProdi] = useState('');
    const [email, setEmail] = useState('');
    
    useEffect(() => {
        const getUser = async() => {
            const store = new Storage();
            await store.create();
    
            const nameStore = await store.get("namaLengkap");
            const nimStore = await store.get("nim");
            const prodiStore = await store.get("prodi");
            const emailStore = await store.get("email");

            // console.log(nameStore, nimStore, prodiStore, emailStore);

            if(nameStore === null || nimStore === null || prodiStore === null || emailStore === null) {
                history.replace("/checkUser");
                return;
            }

            setUserName(nameStore);
            setNim(nimStore);
            setProdi(prodiStore);
            setEmail(emailStore);
        }

        getUser();
    })

    const logoutHandler = async() => {
        const store = new Storage();
        await store.create();
        await store.clear();
    }

    return(
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton/>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton routerLink="/profile">
                        <IonIcon icon={person}/>
                    </IonButton>
                </IonButtons>
                <IonTitle>Profile</IonTitle>
            </IonToolbar>
        </IonHeader>


        <IonContent className="ion-padding">
            <IonCard>
                <IonRow>
                    <IonCard className="card">
                        <IonCardContent>
                            <IonCardHeader>
                                <IonAvatar className="fotoProfile"><img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile Pic"></img></IonAvatar>
                                    <IonCardTitle className="judul">{userName}</IonCardTitle>
                            </IonCardHeader>
                        </IonCardContent>
                    </IonCard>
                </IonRow>

                <IonRow>
                    <IonCard className="card">
                        <IonCardContent>
                            <IonCard >
                                <IonCardHeader>
                                    <IonCardTitle className="judul">Email: </IonCardTitle>
                                        <IonCardTitle>
                                            {email}
                                        </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>

                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle className="judul">NIM: </IonCardTitle>
                                        <IonCardTitle>
                                            000000{nim}
                                        </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>

                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle className="judul">Prodi: </IonCardTitle>
                                        <IonCardTitle>
                                            {prodi}
                                        </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>  
                        </IonCardContent>
                    </IonCard>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonButton color="primary" routerLink="/home">
                        <IonIcon slot="start" icon={home}/>
                            Back to home
                    </IonButton>
                    <IonButton color="danger" routerLink="/login" className="ion-text-center" onClick={logoutHandler}>
                        <IonIcon slot="start" icon={logOut}/>Log Out
                    </IonButton>
                </IonRow>
                <br></br>
            </IonCard>

        </IonContent>
    </IonPage>
    );
}

export default Profile;