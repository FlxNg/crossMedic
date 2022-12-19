import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonToast, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useHistory } from "react-router";
import { Storage } from '@ionic/storage';

import '../theme/ReqHelp.css'

const RequestHelp: React.FC = () => {
    const history = useHistory();
    const [nullToast, setNullToast] = useState(false);
    const [jenisBantuan, setJenisBantuan] = useState("");
    const [nimAccount, setNimAccount] = useState("");

    const namaRef = useRef<HTMLIonInputElement>(null);
    const nimRef = useRef<HTMLIonInputElement>(null);
    const lineRef = useRef<HTMLIonInputElement>(null);
    const orgRef = useRef<HTMLIonInputElement>(null);
    const jabatanRef = useRef<HTMLIonInputElement>(null);
    const acaraRef = useRef<HTMLIonInputElement>(null);
    const tglRef = useRef<HTMLIonInputElement>(null);
    const waktuRef = useRef<HTMLIonInputElement>(null);
    const jumlahRef = useRef<HTMLIonInputElement>(null);
    const tglPengembalianRef = useRef<HTMLIonInputElement>(null);
    const deskripsiRef = useRef<HTMLIonInputElement>(null);
    const keteranganRef = useRef<HTMLIonInputElement>(null);

    const db = getFirestore();

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
            setNimAccount(nimStore);
            
        }
        getUser();
        
    }, [])

    const submitHandler = () => {
        if (namaRef.current?.value === "" || nimRef.current?.value === "" || lineRef.current?.value === "" || orgRef.current?.value === "" || jabatanRef.current?.value === "" || acaraRef.current?.value === "" || tglRef.current?.value === "" || waktuRef.current?.value === ""  || deskripsiRef.current?.value === "" || keteranganRef.current?.value === "" || jenisBantuan === "") {
            if(jenisBantuan === "Jasa" && (jumlahRef.current?.value === 0 || jumlahRef.current?.value === null)) {
                setNullToast(true);
            } else if(jenisBantuan === "Peralatan" && (tglPengembalianRef.current?.value === null || tglPengembalianRef.current?.value === "")) {
                setNullToast(true);
            }
        } else {
            addData();
        }
    }
    const addData = async () => {
        try {
            const docRef = await addDoc(collection(db, "requesthelp"), {
                created_by: nimAccount,
                nama: namaRef.current?.value,
                nim: nimRef.current?.value,
                line: lineRef.current?.value,
                nama_organisasi: orgRef.current?.value,
                jabatan: jabatanRef.current?.value,
                nama_acara: acaraRef.current?.value,
                tanggal_pelaksanaan: tglRef.current?.value,
                waktu_tempat_pelaksanaan: waktuRef.current?.value,
                jenis_bantuan: jenisBantuan,
                jumlah_medis: jumlahRef.current?.value,
                tanggal_pengembalian_peralatan: tglPengembalianRef.current?.value,
                deskripsi: deskripsiRef.current?.value,
                keterangan: keteranganRef.current?.value,
                status: 'waiting'
            });
            // console.log('Document written with ID:', docRef.id);
            history.replace("/checkUser");
        } catch (e) {
            console.error("Error adding document : ", e);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Request Help</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <form className="ion-padding">
                        <IonItem>
                            <IonLabel position="floating">Nama </IonLabel>
                            <IonInput ref={namaRef} placeholder="Masukkan Nama" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">NIM</IonLabel>
                            <IonInput ref={nimRef} placeholder="Masukkan NIM (ex: 00000012345)" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">ID LINE</IonLabel>
                            <IonInput ref={lineRef} placeholder="Masukkan ID LINE" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Nama Organisasi</IonLabel>
                            <IonInput ref={orgRef} placeholder="Masukkan Nama Organisasi" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Jabatan</IonLabel>
                            <IonInput ref={jabatanRef} placeholder="Masukkan Jabatan Anda Dalam Organisasi" />
                        </IonItem>
                        <IonList>
                            <IonItem>
                                <IonLabel position="floating">Jenis Bantuan</IonLabel>
                                <IonSelect onIonChange={(e) => setJenisBantuan(e.detail.value)} placeholder="">
                                    <IonSelectOption value="Jasa">Jasa</IonSelectOption>
                                    <IonSelectOption value="Peralatan">Peralatan</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        </IonList>
                        <IonItem>
                            <IonLabel position="floating">Nama Acara</IonLabel>
                            <IonInput ref={acaraRef} placeholder="Masukkan Nama Acara" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Tanggal Pelaksanaan</IonLabel>
                            <br></br>
                            <IonInput ref={tglRef} type="date" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Waktu dan Tempat Pelaksanaan</IonLabel>
                            <IonInput ref={waktuRef} placeholder="ex : Ruang C0320, 2 jam 30 menit" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Jumlah Medis</IonLabel>
                            <IonInput ref={jumlahRef} type="number" placeholder="Hanya isi bila memilih jasa, apabila memilih peralatan isi sajah dengan 0" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Tanggal Pengembalian Peralatan</IonLabel>
                            <br></br>
                            <IonInput ref={tglPengembalianRef} type="date"  />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Deskripsi</IonLabel>
                            <IonInput ref={deskripsiRef} placeholder="Masukkan Deskripsi singkat kegiatan" />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Keterangan</IonLabel>
                            <IonInput ref={keteranganRef} placeholder="Masukkan Keterangan tambahan saat pelaksanaan kegiatan" />
                        </IonItem>
                        <br></br>
                        <IonRow className="ion-justify-content-between">
                            <IonButton color="danger" routerLink="/home">Cancel</IonButton>
                            <IonButton color="primary" onClick={submitHandler}>Request</IonButton>
                        </IonRow>
                    </form>
                    <IonToast
                        isOpen={nullToast}
                        onDidDismiss={() => setNullToast(false)}
                        message="Mohon masukkan seluruh input yang diperlukan!"
                        duration={1500}
                    />
                </IonCard>
            </IonContent>

        </IonPage>
    );
}

export default RequestHelp;