import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonCol, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams  } from "react-router-dom";
import { collection, addDoc, getDoc, query, where,doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { home } from 'ionicons/icons';
import '../theme/ViewDetailReq.css'

const ViewDetailRequest: React.FC = (props) => {
    const history = useHistory();

    const [request, setRequest] = useState<any>([]);
    const { id } = useParams<{ id: string }>();

    const db = getFirestore();

    useEffect(() => {
        const getRequest = async () => {
            const q = doc(db, "requesthelp", id);
            const querySnapshot = await getDoc(q);

            if (querySnapshot.exists()) {
                setRequest(querySnapshot.data());
              } else {
                console.log("No such document!");
              }
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
                    <IonTitle>View Detail Request</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="cardLuar">
                    <IonCardContent>
                                <IonCardHeader key={request.id}>
                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Nama</div>
                                        </IonCol>
                                        <IonCol>
                                            <h3>: {request.nama}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                NIM</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.nim}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                LINE ID</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.line}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Organisasi</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.nama_organisasi}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Jabatan</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.jabatan}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Tipe Request</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.jenis_bantuan}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Acara</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.nama_acara}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Tanggal Pelaksanaan</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.tanggal_pelaksanaan}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Waktu Tempat Pelaksanaan</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.waktu_tempat_pelaksanaan}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Jumlah Medis</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.jumlah_medis}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Deskripsi</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.deskripsi}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Keterangan</div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.keterangan}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow className="detailRow">
                                        <IonCol size="auto">
                                            <div style={{ width: "90px" }}>
                                                Status
                                            </div>
                                        </IonCol>
                                        <IonCol className="detailColRight">
                                            <h3>: {request.status}</h3>
                                        </IonCol>
                                    </IonRow>

                                    <IonRow>
                                        <IonCol >
                                            <IonButton expand="block" color="success" routerLink="/viewrequest">
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

export default ViewDetailRequest;