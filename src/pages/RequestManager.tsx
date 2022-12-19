import { IonApp, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonContent, IonBackButton, IonCol, IonFab, IonFabButton, IonGrid, IonPage, IonRow, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline, personCircleOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MemberItem from "../components/MemberItem";
import SegmentControl from "../components/SegmentControl";
import ToolbarAdmin from "../components/ToolbarAdmin";
import { RequestContext } from "../data/RequestContext";
import { Storage } from "@ionic/storage";
import './RequestManager.css'
import { Member } from "../data/MemberContext";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";

const RequestManager:React.FC = () => {    
    const history = useHistory();
    // const requestCtx = useContext(RequestContext);
    const [requests, setRequests] = useState<Array<any>>([]);
    // const mapping = {1:'waiting', false:'rejected',  true:'accepted'};
    const openDetail = async(id:number, name:string, waktu:string, tempat:string, kontak:string, acara:string, deskripsi:string, keterangan:string,status:number,members:Member[]) => {
        const store = new Storage();
        await store.create();
        await store.set("id", id);
        await store.set("name", name);
        await store.set("waktu", waktu);
        await store.set("tempat", tempat);
        await store.set("kontak", kontak);
        await store.set("acara", acara);
        await store.set("deskripsi", deskripsi);
        await store.set("keterangan", keterangan);
        await store.set("status", status);
        await store.set("members", members);

        history.push('/admin/reqmanage/detail');
    }

    const db = getFirestore();    
    
    useEffect(() => {
        async function getData() {
            try {
                const querySnapshot = await getDocs(collection(db, "requesthelp"));
                setRequests(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
            } catch (error) {
                
            }
            console.log("reqmanager");
        }
        getData();
    }, []);

    if(requests==null){
        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton/>
                        </IonButtons>
                        <IonTitle>Request Manager</IonTitle>
                        <ToolbarAdmin/>
                    </IonToolbar>
                </IonHeader>
                <IonContent>        
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h1 className="titleReq">There is no request</h1>
                            </IonCol>
                        </IonRow>             
                    </IonGrid>
                </IonContent>           
            </IonPage>
        )
    }
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Request Manager</IonTitle>
                    <ToolbarAdmin/>
                </IonToolbar>
            </IonHeader>
            <IonContent>        
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <h1 className="titleReq">Request List</h1>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                           <IonList>
                                {requests.map((request: any)=>(
                                    <IonItem key={request.id} lines='full' onClick={() => openDetail(request.id, request.nama, request.tanggal_pelaksanaan, request.tempat, request.kontak, request.nama_acara, request.deskripsi, request.keterangan, request.status, request.members)}>
                                        <IonLabel>
                                            <h1>{request.nama_acara}</h1>                                            
                                            <h3>Request Type : {request.jenis_bantuan}</h3>
                                        </IonLabel>
                                        <IonLabel slot="end">
                                            <h3 className={request.status}>{request.status}</h3>
                                        </IonLabel>
                                    </IonItem>
                                ))}
                           </IonList>
                        </IonCol>
                    </IonRow>                
                </IonGrid>
            </IonContent>           
        </IonPage>
    )
}
export default RequestManager;