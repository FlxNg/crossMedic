import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {Storage} from '@ionic/storage';
import { IonApp, IonAvatar, IonCard, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonRow, IonText, IonToggle, setupIonicReact, useIonAlert } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import UsersContextProvider from './data/UsersContextProvider';
import CheckUser from './pages/CheckUser';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import { useContext, useEffect } from 'react';
import UsersContext from './data/user-context';
import SyaratKetentuan from './pages/SyaratKetentuan';
import { document, helpCircle, home, informationCircle, logOut, newspaper } from "ionicons/icons";
import AboutUs from './pages/AboutUs';
import AdminHome from './pages/AdminHome';
import Profile from './pages/Profile';
import RequestHelp from './pages/RequestHelp';
import ViewRequest from './pages/ViewRequest';
import Members from './pages/Members';
import RequestManager from './pages/RequestManager';
import { MemberContextProvider } from './data/MemberContext';
import FormMember from './pages/FormMember';
import { RequestContextProvider } from './data/RequestContext';
import DetailRequest from './pages/DetailRequest';
import ViewDetailRequest from './pages/ViewDetailRequest';


setupIonicReact();

const App: React.FC = () => {
  const usersCtx = useContext(UsersContext);
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const logoutHandler = async() => {
    const store = new Storage();
    await store.create();
    await store.clear();
  }
  // const goToProfile = () =>{
  //   history.replace("/profile");
  // }

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main">
          <IonRow className="ion-justify-content-center">
          <Link to="/profile">
            <IonAvatar className="avatarSidebar"><img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="Profile Pic"></img></IonAvatar>
          </Link>
          </IonRow>
          <IonRow className="ion-justify-content-center">
          </IonRow>
          <IonContent>
              <IonList>
                  <IonMenuToggle>
                      <IonItem routerLink='/home' color="light">
                        <IonIcon slot="start" icon={home}/>
                        <IonLabel>Home</IonLabel>
                      </IonItem>
                      <IonItem routerLink="/requesthelp" color="light">
                        <IonIcon slot="start" icon={helpCircle}/>
                        <IonLabel>Request Help</IonLabel>
                      </IonItem>
                      <IonItem routerLink="/viewrequest" color="light">
                        <IonIcon slot="start" icon={document}/>
                        <IonLabel>View Request</IonLabel>
                      </IonItem>
                      <IonItem routerLink="/syaratdanketentuan" color="light">
                        <IonIcon slot="start" icon={newspaper}/>
                        <IonLabel>Syarat & Ketentuan</IonLabel>
                      </IonItem>
                      <IonItem color="light" routerLink="/aboutus">
                        <IonIcon slot="start" icon={informationCircle}/>
                        <IonLabel>About Us</IonLabel>
                      </IonItem>
                      <IonItem onClick={logoutHandler} routerLink="/login" color="danger">
                        <IonIcon slot="start" icon={logOut}/>
                        <IonLabel>Log Out</IonLabel>
                      </IonItem>
                  </IonMenuToggle>
              </IonList>
          </IonContent>
        </IonMenu>
        <UsersContextProvider>
          <MemberContextProvider>
            <RequestContextProvider>
              <IonRouterOutlet id="main">
                <Switch>
                  <Route exact path="/viewdetailrequest/:id" component={ViewDetailRequest}/>
                  <Route exact path="/viewrequest" component={ViewRequest} />
                  <Route exact path ="/requesthelp" component={RequestHelp}/>
                  <Route exact path="/login" component={LogInPage}/>
                  <Route exact path="/register" component={RegisterPage}/>
                  <Route exact path="/home" component={Home}/>
                  <Route exact path="/aboutus" component={AboutUs}/>
                  <Route exact path="/checkUser" component={CheckUser}/>
                  <Route exact path="/syaratdanketentuan" component={SyaratKetentuan}/>
                  <Route exact path="/admin" component={AdminHome}/>
                  <Route exact path="/profile" component={Profile}/>           
                  <Route exact path="/admin/reqmanage" component={RequestManager}/>
                  <Route exact path="/admin/reqmanage/detail" component={DetailRequest}/>
                  <Route exact path="/admin/members" component={Members}/>  
                  <Route exact path="/admin/members/form" component={FormMember}/>
                  <Redirect exact from='/' to="/checkUser"/>
                </Switch>
              </IonRouterOutlet>
            </RequestContextProvider>
          </MemberContextProvider>
        </UsersContextProvider>        
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
