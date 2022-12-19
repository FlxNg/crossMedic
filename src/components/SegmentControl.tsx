import { IonSegment, IonSegmentButton, IonLabel, IonCard } from "@ionic/react";

const SegmentControl: React.FC<{
    selectedValue: 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat';
    onSelectValue: (value: 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat') => void
}> = props => {
    
    const segmentChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value);
    }
    
    return(
        <IonCard>
        <IonSegment scrollable={true} value={props.selectedValue} onIonChange={segmentChangeHandler}>
            <IonSegmentButton value="Mon">
                <IonLabel>Mon</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Tue">
                <IonLabel>Tue</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Wed">
                <IonLabel>Wed</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Thu">
                <IonLabel>Thu</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Fri">
                <IonLabel>Fri</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Sat">
                <IonLabel>Sat</IonLabel>
            </IonSegmentButton>
        </IonSegment>
        </IonCard>
    )
}

export default SegmentControl;