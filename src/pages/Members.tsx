import { StringLike } from "@firebase/util";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle, IonCol, IonGrid, IonRow, IonRouterOutlet, IonFab, IonFabButton, IonIcon, IonDatetime, IonButton } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router";
import { addOutline } from "ionicons/icons";
import { useContext, useRef, useState } from "react";
import { Route, useHistory } from "react-router";
import MemberItem from "../components/MemberItem";
import SegmentControl from "../components/SegmentControl"
import ToolbarAdmin from "../components/ToolbarAdmin"
import { MemberContext, MemberContextProvider } from "../data/MemberContext";
import RequestManager from "./RequestManager";
import {format, parseISO} from 'date-fns';
import { parse } from "path";
import {Storage} from '@ionic/storage';


const Members: React.FC = () => {
    const [dayUnits, setDayUnits] = useState<'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'>('Mon');

    const membersCtx = useContext(MemberContext);
    
    let members = membersCtx.members;

    const history = useHistory();

    const addHandler = async() => {
        const store = new Storage();
        await store.create();
        await store.set('id', 0);
        history.push('/admin/members/form')
    }

    const selectDayUnitHandler = (selectedValue: 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat') => {
        setDayUnits(selectedValue);
    }    

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton/>
                    </IonButtons>
                    <IonTitle>Schedule</IonTitle>
                    <ToolbarAdmin/>
                </IonToolbar>
            </IonHeader>
            <IonContent>        
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <SegmentControl selectedValue={dayUnits} onSelectValue = {selectDayUnitHandler}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <MemberItem members={members} day={dayUnits}/>
                        </IonCol>
                    </IonRow>                
                </IonGrid>
            </IonContent>   
            <IonFab horizontal="end" vertical="bottom" slot="fixed" className="ion-padding">
                <IonFabButton color="secondary" onClick={addHandler}>
                    <IonIcon icon={addOutline}/>
                </IonFabButton>
            </IonFab>         
        </IonPage>
    )
}

export default Members