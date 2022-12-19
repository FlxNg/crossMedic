import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { home } from "ionicons/icons";
import {Storage} from '@ionic/storage';
import { useHistory } from "react-router-dom";

const SyaratKetentuan: React.FC = () => {
    const [tipe, setTipe] = useState<'jasa' | 'alat'>('jasa');
    const history = useHistory();
    const segmentHandler = (event:CustomEvent) => {
        setTipe(event.detail.value);
    }

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
        }

        getUser();
    })

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                    <IonTitle>Syarat & Ketentuan</IonTitle>
                    <IonAvatar slot="end" className="avatar"><img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile Pic"></img></IonAvatar>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonSegment value={tipe} onIonChange={segmentHandler}>
                                <IonSegmentButton value="jasa">
                                    <IonLabel>Jasa</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton value="alat">
                                    <IonLabel>Peralatan & obat-obatan</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {tipe === 'jasa' && (
                                <IonCard>
                                    <IonCardHeader className="ion-text-justify">
                                        <IonCardTitle>CATATAN:</IonCardTitle>
                                        <IonText><br/>Bagi yang mengisi dan mengajui form pengajuan jasa artinya pengaju menyetujui persyaratan dibawah ini :<br/></IonText>
                                    </IonCardHeader>
                                    <IonCardContent className="ion-text-justify">
                                        <IonText>1. Wajib mengadakan <i>technical meeting</i> antara pengaju dan utusan dari Medic maksimal H-7 sebelum acara berlangsung.<br/></IonText>
                                        <IonText><br/>2. Anggota Medic wajib mendapatkan konsumsi yang layak apabila pengaju membutuhkan jasa medic selama empat jam atau lebih. Jumlah konsumsi disesuaikan dengan tenaga medis yang diajukan.<br/></IonText>
                                        <IonText><br/>3. Anggota Medic wajib diperlakukan dengan baik sesuai dengan aturan serta norma yang berlaku. Jika ditemukan perlakukan tidak baik terhadap anggota Medic, maka Medic berhak memberikan sanksi dengan yang terberat adalah menarik anggota dari pengajuan jasa dan <i>blacklist</i> acara.<br/></IonText>
                                    </IonCardContent>
                                </IonCard>
                            )}
                            {tipe === 'alat' && (
                                <IonCard>
                                <IonCardHeader className="ion-text-justify">
                                    <IonCardTitle>CATATAN:</IonCardTitle>
                                    <IonText><br/>Bagi yang mengisi dan mengajui form pengajuan alat kesehatan & obat-obatan artinya pengaju menyetujui persyaratan dibawah ini :<br/></IonText>
                                </IonCardHeader>
                                <IonCardContent className="ion-text-justify">
                                    <IonText>1. Alat kesehatan yang dipinjam <b>HARUS</b> dijaga dan dikembalikan dengan keadaan serupa. Apabila alat kesehatan yang dipinjam hilang atau rusak maka pihak pengaju bersedia mengganti dengan barang yang sama.<br/></IonText>
                                    <IonText><br/>2. Apabila pihak pengaju melakukan kesalahan yang sama lebih dari dua kali, maka pihak UMN Medical Center berhak mem-<i>blacklist</i> selama 1 tahun organisasi  / himpunan / event yang merusak alat kesehatan / obat-obatan yang dipinjam.<br/></IonText>
                                    <IonText><br/>3. Apabila pihak pengaju terlambat mengembalikan alat kesehatan maupun obat-obatan, harap menginformasikan hal tersebut kepada pihak UMN Medical Center.<br/></IonText>
                                    <IonText><br/>4. Apabila pihak pengaju mengalami kesulitan dalam menggunakan alat-alat kesehatan atau obat-obatan. harap menanyakan kepada pihak UMN Medical Center.<br/></IonText>
                                </IonCardContent>
                            </IonCard>
                            )}
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" color="light" routerLink="/home">
                                <IonIcon slot="start" icon={home}/>
                                Back to home
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default SyaratKetentuan;