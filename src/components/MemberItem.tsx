import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { pencilOutline, trashBin } from "ionicons/icons";
import { useContext, useRef, useState } from "react";
import { Storage } from "@ionic/storage";
import { useHistory } from "react-router";
import { MemberContext } from "../data/MemberContext";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

const MemberItem: React.FC<{members:any[], day:string}> = props => {
    const history = useHistory();
    const db = getFirestore();

    const members = props.members.filter((member) => {
        return member.day === props.day;
    })

    const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);

    const edit = async(id: number, name:string, phone:string, day:string, hours:string) => {
        const store = new Storage();
        await store.create();
        await store.set("id", id);
        await store.set("name", name);
        await store.set("day", day);
        await store.set("phone", phone);
        await store.set("hours", hours);
        await store.set("FormFor", "edit_member");

        history.push('members/form');
    }

    const [showAlert, setShowAlert] = useState(false);
    const [presentAlert] = useIonAlert();

    const [present] = useIonToast();
    const remove = async (id: string) => {
        console.log('delete');
        await deleteDoc(doc(db, "members", id)).then((value) => {
            present({
                message: 'Member Deleted!',
                duration: 1500,
                position: 'bottom'
            });
        }).catch((error) => {
            console.log(error);
        });
        
        history.replace("/admin/members");
        window.location.reload();
    }

    if(members.length === 0){
        return(
            <h2> There is no members assigned at this day</h2>
        )
    }else{
        return(
            <>
            <IonList>
                {members.map((member: any)=>(
                    <IonItemSliding key={member.id} ref={slidingOptionRef}>
                        <IonItemOptions side="end">
                            <IonItemOption color="warning" onClick={() => edit(member.id, member.name, member.phone, member.day, member.hours)}>
                                <IonIcon icon={pencilOutline}/>
                            </IonItemOption>
                            <IonItemOption color="danger" onClick={() =>{ 
                                const alertText = 'Are you sure to delete ' + member.name + ' from member list?'
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
                                                    remove(member.id);
                                                }
                                            }
                                        ]
                                    })
                                }
                            }>
                                <IonIcon icon={trashBin}/>
                            </IonItemOption>
                        </IonItemOptions>
                        <IonItem key={member.id} lines="full">
                            <IonLabel>
                                <h2>{member.name}</h2>
                                <h2>{member.phone}</h2>                                
                            </IonLabel>
                            <IonLabel slot="end">
                                <h2>{member.hours}</h2>
                            </IonLabel>
                        </IonItem>
                    </IonItemSliding>
                ))}
            </IonList>
            </>
        )
    }
}
export default MemberItem;