import { IonApp, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonIcon, IonContent, IonBackButton, IonCol, IonFab, IonFabButton, IonGrid, IonPage, IonRow, IonItem, IonLabel, IonList } from "@ionic/react";
import { addOutline, personCircleOutline } from "ionicons/icons";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import MemberItem from "../components/MemberItem";
import SegmentControl from "../components/SegmentControl";
import ToolbarAdmin from "../components/ToolbarAdmin";
import { RequestContext } from "../data/RequestContext";
import { Storage } from "@ionic/storage";
import './RequestManager.css'
import { Member } from "../data/MemberContext";

const RequestManager:React.FC = () => {    
    const history = useHistory();
    const requestCtx = useContext(RequestContext);
    const requests = requestCtx.requests;
    const mapping = ['waiting', 'rejected', 'accepted'];

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
        }

        getUser();
    }, [])
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
    if(requests.length <= 0){
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
                                    <IonItem key={request.id} lines='full' onClick={() => openDetail(request.id, request.nama, request.waktu, request.tempat, request.kontak, request.acara, request.deskripsi, request.keterangan, request.status, request.members)}>
                                        <IonLabel>
                                            <h1>{request.acara}</h1>                                            
                                            <h3>Request Type : {request.jenis}</h3>
                                        </IonLabel>
                                        <IonLabel slot="end">
                                            <h3 className={mapping[request.status]}>{mapping[request.status]}</h3>
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