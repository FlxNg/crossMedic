import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Storage} from '@ionic/storage';
import UsersContext from "../data/user-context";

const CheckUser: React.FC = () => {
    const history = useHistory();
    const usersCtx = useContext(UsersContext);

    useEffect(() => {
        const getUser = async() => {
            const store = new Storage();
            await store.create();
            const emailStore = await store.get("email");

            if(emailStore !== null) {
                history.replace("/home");
            } else {
                history.replace("/login");
            }
        }

        getUser();
    })


    
    return(
        <></>
    )
}

export default CheckUser;