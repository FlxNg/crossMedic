import { OverlayEventDetail } from "@ionic/core";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonButton, IonItem, IonList, IonModal, IonSelect, IonSelectOption, useIonToast, useIonAlert } from "@ionic/react";
import { Storage } from "@ionic/storage";
import { remove } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ToolbarAdmin from "../components/ToolbarAdmin";
import { Member, MemberContext } from "../data/MemberContext";
import { RequestContext } from "../data/RequestContext"
import './DetailRequest.css'

const DetailRequest: React.FC = () => {
    const requestCtx = useContext(RequestContext);
    const memberCtx = useContext(MemberContext);
    const members = memberCtx.members.filter(member => member.available === true);
    const history = useHistory();
    const mapping = ['waiting', 'rejected', 'accepted'];

    const [assignedName, setAssignedName] = useState<string>('');
    const [idStore, setIdStore] = useState<any>();
    const [nameStore, setNameStore] = useState();
    const [waktuStore, setWaktuStore] = useState();
    const [tempatStore, setTempatStore] = useState();
    const [kontakStore, setKontakStore] = useState();
    const [acaraStore, setAcaraStore] = useState();
    const [deskripsiStore, setDeskripsiStore] = useState();
    const [keteranganStore, setKeteranganStore] = useState();
    const [statusStore, setStatusStore] = useState(0);
    const [membersStore, setMembersStore] = useState<Member[]>();

    const store = new Storage();
    store.create();

    store.get('id').then((value) => {
        setIdStore(value);
    });
    store.get('name').then((value) => {
        setNameStore(value);
    });
    store.get('waktu').then((value) => {
        setWaktuStore(value);
    });
    store.get('tempat').then((value) => {
        setTempatStore(value);
    });
    store.get('kontak').then((value) => {
        setKontakStore(value);
    });
    store.get('acara').then((value) => {
        setAcaraStore(value);
    });
    store.get('deskripsi').then((value) => {
        setDeskripsiStore(value);
    });
    store.get('keterangan').then((value) => {
        setKeteranganStore(value);
    });
    store.get('status').then((value) => {
        setStatusStore(value);
    });
    store.get('members').then((value)=>{
        let tempName : string = '';
        for(var i = 0; i<value.length; i++){
            tempName = tempName + value[i].name + ", ";
        }
        setAssignedName(tempName);
        setMembersStore(value);
    })

    const modal = useRef<HTMLIonModalElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<Member[]>();

    const [present] = useIonToast();

    const confirmHandler = () => {
        if(selectedMembers !== undefined){
            for(var i = 0; i<selectedMembers.length; i++){
                memberCtx.updateStatus(selectedMembers[i].id, false);
            }
            setSelectedMembers(undefined);
            requestCtx.updateRequest(idStore, 2, selectedMembers)
            present({
                message: 'Request Accepted!',
                duration: 1500,
                position: 'bottom'
            })
            modal.current?.dismiss()
            history.push('../reqmanage');
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
        requestCtx.updateRequest(idStore, 1, null)
        present({
            message: 'Request Rejected!',
            duration: 1500,
            position: 'bottom'
        })
        history.push('../reqmanage');
    }

    const removeHandler = () => {
        if(membersStore === undefined){
            requestCtx.deleteRequest(idStore);
        }else{
            for(var i = 0; i< membersStore.length; i++){
                var id = membersStore[i].id;
                memberCtx.updateStatus(id, true);
            }
            requestCtx.deleteRequest(idStore);
        }
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
                    {(statusStore === 0) &&(
                        <>
                        <IonRow>
                            <IonCol>
                                <IonButton onClick={()=> setIsOpen(true)}>Accept</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
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
                    {(statusStore === 1) &&(
                        <>
                        <IonRow>
                            <IonCol>
                                <h1 className="message">This request has been {mapping[statusStore]}!</h1>
                            </IonCol>                            
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
                    {(statusStore === 2) &&(
                        <>
                        <IonRow>
                            <IonCol>
                                <h1 className="message">This request has been {mapping[statusStore]}!</h1>
                            </IonCol>                            
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <h2 className="message" onClick={removeHandler}>Assigned Members : {assignedName}</h2>
                            </IonCol>
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
                                    {members.map((member) => (
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