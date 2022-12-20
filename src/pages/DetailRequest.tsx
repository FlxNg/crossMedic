import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton, IonItem, IonList, IonModal, IonSelect, IonSelectOption, useIonToast, useIonAlert } from "@ionic/react";
import { Storage } from "@ionic/storage";
import { getDate, getDay } from "date-fns";
import { getDocs, collection, getFirestore, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { remove } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ToolbarAdmin from "../components/ToolbarAdmin";
import { Member, MemberContext } from "../data/MemberContext";
import { RequestContext } from "../data/RequestContext"
import './DetailRequest.css'

const DetailRequest: React.FC = () => {
    const history = useHistory();
    const dayName = ['Mon', 'Tue', 'Wed', 'Thu','Fri', 'Sat', 'Sun'];
    const mapping = ['waiting', 'rejected', 'accepted'];
    const [members, setMembers] = useState<Array<any>>([]);
    const [assignedName, setAssignedName] = useState<string>('');
    const [idStore, setIdStore] = useState<any>();
    const [nameStore, setNameStore] = useState();
    const [waktuStore, setWaktuStore] = useState("");
    const [tempatStore, setTempatStore] = useState();
    const [kontakStore, setKontakStore] = useState();
    const [acaraStore, setAcaraStore] = useState();
    const [deskripsiStore, setDeskripsiStore] = useState();
    const [keteranganStore, setKeteranganStore] = useState();
    const [statusStore, setStatusStore] = useState("");
    const [membersStore, setMembersStore] = useState<Member[]>();

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
        }

        getUser();
    })

    useEffect(() => {
        getDataFromStorage();
        
        getMembers();
        console.log("detailreq", waktuStore);
    }, []);

    async function getMembers() {
        try {
            const q = query(collection(db, "members"), where("available", "==", true));
            const querySnapshot = await getDocs(q);
            setMembers(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));
        } catch (error) {
            console.log(error);
        }
    }

    const getDataFromStorage = async () => {
        const store = new Storage();
        store.create();

        await store.get('id').then((value) => {
            setIdStore(value);
        });
        await store.get('name').then((value) => {
            setNameStore(value);
        });
        await store.get('waktu').then((value) => {
            setWaktuStore(value);
            console.log("value",value);
        });
        await store.get('tempat').then((value) => {
            setTempatStore(value);
        });
        await store.get('kontak').then((value) => {
            setKontakStore(value);
        });
        await store.get('acara').then((value) => {
            setAcaraStore(value);
        });
        await store.get('deskripsi').then((value) => {
            setDeskripsiStore(value);
        });
        await store.get('keterangan').then((value) => {
            setKeteranganStore(value);
        });
        await store.get('status').then((value) => {
            setStatusStore(value);
        });
        await store.get('members').then((value)=>{
            if(value!==null) {
                let tempName : string = '';
                for(var i = 0; i<value.length; i++){
                    tempName = tempName + value[i].name + ", ";
                }
                setAssignedName(tempName);
                setMembersStore(value);
            }
        });
    }
    const modal = useRef<HTMLIonModalElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<Array<any>>([]);

    const [present] = useIonToast();

    const updateMemberStatus = async (id:any, status:(true|false)) => {
        const memberRef = doc(db, "members", id);
        await updateDoc(memberRef,{"available": status}).then(memberRef => {
            console.log("data updated");
        }).catch(error => {
            console.log(error);
        });
    }

    const updateRequestStatus = async (id:any, status:("rejected"|"accepted"), members:any[]) => {
        const requestRef = doc(db, "requesthelp", id);
        await updateDoc(requestRef,{"status":status,"members":members}).then(requestRef => {
            console.log("request updated:" + status);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteRequest = async (id:string) => {
        await deleteDoc(doc(db, "requesthelp", id));
    }

    const confirmHandler = () => {
        console.log(selectedMembers);
        if(selectedMembers.length > 0){
            for(var i = 0; i<selectedMembers.length; i++){
                updateMemberStatus(selectedMembers[i].id, false);
            }
            setSelectedMembers([]);
            updateRequestStatus(idStore,"accepted",selectedMembers);

            present({
                message: 'Request Accepted!',
                duration: 1500,
                position: 'bottom'
            })
            modal.current?.dismiss()
            history.goBack();
        }else{
            present({
                message: 'Select at least one member!',
                duration: 1500,
                position: 'bottom'
            })
            modal.current?.dismiss()
        }
        
    }
    
    const rejectHandler = () => {
        updateRequestStatus(idStore,"rejected",[]);
        present({
            message: 'Request Rejected!',
            duration: 1500,
            position: 'bottom'
        })
        history.goBack();
    }

    const removeHandler = () => {
        console.log(membersStore)
        if(membersStore!.length >=0){
            for(var i = 0; i< membersStore!.length; i++){
                var id = membersStore![i].id;
                updateMemberStatus(id, true);
            }
            
        }
        deleteRequest(idStore);
        present({
            message: 'Request Removed!',
            duration: 1500,
            position: 'bottom'
        })
        history.push('../reqmanage');
    }

    const [presentAlert] = useIonAlert();

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>{acaraStore}</IonTitle>
                    <ToolbarAdmin/>
                </IonToolbar>
            </IonHeader>
            <IonContent>        
                <IonCard className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <h3>Nama : {nameStore}</h3>
                                <h3>Kontak : {kontakStore}</h3>
                                <h3>Tempat : {tempatStore}</h3>   
                                <h3>Waktu : {waktuStore}</h3>      
                            </IonCol>                                                    
                        </IonRow>
                        <IonCard>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <h2>Deskripsi : </h2>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <h4>{deskripsiStore}</h4>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <h2>Keterangan : </h2>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <h4>{keteranganStore}</h4>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    </IonGrid>
                </IonCard>
                <IonGrid>
                    {(statusStore === "waiting") &&(
                        <>
                        <IonRow >
                            <IonCol>
                                <IonButton onClick={() => setIsOpen(true)}>Accept</IonButton>
                            </IonCol>
                            <IonCol>
                            <IonButton className="ion-text-center" onClick={() =>{ 
                                const alertText = 'Are you sure to reject this request?'
                                    presentAlert({                                
                                        header: alertText,
                                        buttons:[
                                            {
                                                text:'Cancel',
                                                role:'cancel'
                                            },
                                            {
                                                text:'OK',
                                                role:'confirm',
                                                handler: () => {
                                                    rejectHandler();
                                                }
                                            }
                                        ]
                                    })
                                }
                            }>Reject</IonButton>
                            </IonCol>
                        </IonRow>
                        </>
                    )}
                    {(statusStore != "waiting") && (
                        <>
                        <IonRow>
                            <IonCol>
                                <h1 className="message">This request has been {statusStore}!</h1>
                            </IonCol>                            
                        </IonRow>
                        <IonRow>
                            {(statusStore === "accepted") && (<IonCol>
                                <h2 className="message" onClick={removeHandler}>Assigned Members : {assignedName}</h2>
                            </IonCol>)}
                        </IonRow>
                        <IonRow>
                            <IonCol>
                            <IonButton className="ion-text-center" onClick={() =>{ 
                                const alertText = 'Are you sure to delete this request?'
                                    presentAlert({                                
                                        header: alertText,
                                        buttons:[
                                            {
                                                text:'Cancel',
                                                role:'cancel'
                                            },
                                            {
                                                text:'OK',
                                                role:'confirm',
                                                handler: () => {
                                                    removeHandler();
                                                }
                                            }
                                        ]
                                    })
                                }
                            }>Remove Request</IonButton>
                            </IonCol>
                        </IonRow>
                        </>
                    )}
                </IonGrid>
                <IonModal ref={modal} isOpen={isOpen}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle className="ion-text-center">Choose Member</IonTitle>
                            <IonButtons slot="end">
                                <IonButton strong={true} onClick={() => {setIsOpen(false); confirmHandler()}}>Confirm</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">                        
                        <IonList>
                            <IonItem>
                                <IonSelect placeholder="Select members" multiple={true} onIonChange={(ev) => setSelectedMembers(ev.detail.value)}>
                                    {members.map((member:any) => (
                                        <IonSelectOption key={member.id} value={member}>{member.name}</IonSelectOption>
                                    ))}                        
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonContent>
                </IonModal>
            </IonContent>           
        </IonPage>
    )
}

export default DetailRequest