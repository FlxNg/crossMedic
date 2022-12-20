import { IonButton, IonButtons, IonIcon, IonTitle } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { Storage } from '@ionic/storage';

const ToolbarAdmin: React.FC = () => {
    const logoutHandler = async() => {
        const store = new Storage();
        await store.create();
        await store.clear();
      }

      
    return(
        <>            
            <IonButtons slot="end">
                <IonButton routerLink='/login' className='ion-text-center' onClick={logoutHandler}>
                    <IonIcon icon={logOutOutline}/>
                </IonButton>
            </IonButtons>
        </>
    )
}

export default ToolbarAdmin;