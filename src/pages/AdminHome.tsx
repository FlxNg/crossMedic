import { IonApp, IonBackButton, IonButtons, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { Route, useHistory } from 'react-router';
import ToolbarAdmin from '../components/ToolbarAdmin';
import { MemberContextProvider } from '../data/MemberContext';
import './AdminHome.css';
import Members from './Members';
import RequestManager from './RequestManager';

const AdminHome: React.FC = () => {
  const history = useHistory();
  
  const requestManager = () => {
    history.push('admin/reqmanage');
  }

  const memberSchedule = () => {
    history.push('admin/members');
  }

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

  return (
    <IonApp>
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome, Admin</IonTitle>
          <ToolbarAdmin/>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCard className="cardAdmin">
              <IonCol onClick={requestManager} className="ion-padding">
                <div className="ion-padding">
                  <IonRow className='ion-justify-content-center'>
                    <img src="assets/image/request_manager.png" height="100px" width="100px"/>
                  </IonRow>
                  <h5 className='ion-text-center'>Request Manager</h5>
                </div>
              </IonCol>
            </IonCard>
            <IonCard className="cardAdmin">
              <IonCol onClick={memberSchedule} className="ion-padding">
                <div className="ion-padding">
                  <IonRow className='ion-justify-content-center'>
                    <img src="assets/image/member_schedule.png" height="100px" width="100px"/>
                  </IonRow>
                  <h5 className='ion-text-center'>Member Schedule</h5>
                </div>
              </IonCol>
            </IonCard>
          </IonRow>
        </IonGrid>
        <div className="logomedic">
          <IonGrid>
            <IonRow>
              <IonCol>
                <img src="assets/image/umnlogo.png" height="70px"/>
              </IonCol>
              <IonCol>
                <img src="assets/image/umnmedicalcenter.png" height="70px" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
    <IonReactRouter>
        <IonRouterOutlet id="admin">
            <MemberContextProvider>
                <Route path="/admin/reqmanage" component={RequestManager}/>
                <Route path="/admin/members" component={Members}/>
            </MemberContextProvider>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

export default AdminHome;
