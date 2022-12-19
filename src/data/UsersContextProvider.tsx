import React from "react";
import UsersContext from './user-context';
import {Storage} from '@ionic/storage';

type Props = {
    children: React.ReactNode;
}

const UsersContextProvider: React.FC<Props> = props => {
    // const [user, setUser] = useState<User[]>([{
    //     name: "undefined", nim: "undefined", prodi: "undefined", email: "undefined"
    // }]);

    // useEffect(() => {
    //     getUser();
    // }, [])

    // const getUser = async() => {
    //     const store = new Storage();
    //     await store.create();

    //     const nameStore = await store.get("namaLengkap");
    //     const nimStore = await store.get("nim");
    //     const prodiStore = await store.get("prodi");
    //     const emailStore = await store.get("email");

    //     var list = user;
    //     list.pop();
    //     list.push({name: nameStore,nim: nimStore,prodi: prodiStore, email: emailStore});
    //     setUser(list);
    // }

    const logIn = async(nameStore: string, nimStore: string, prodiStore: string, emailStore: string) => {
        const store = new Storage();
        await store.create();

        await store.set("namaLengkap", nameStore);
        await store.set("nim", nimStore);
        await store.set("prodi", prodiStore);
        await store.set("email", emailStore);

        // var list = user;
        // list.pop();
        // list.push({name: nameStore,nim: nimStore,prodi: prodiStore, email: emailStore});
        // setUser(list);
    }

    const logOut = async() => {
        const store = new Storage();
        await store.create();
        await store.clear();

        // var list = user;
        // list.pop();
        // list.push({name: "undefined",nim: "undefined",prodi: "undefined", email: "undefined"});
        // setUser(list);
    }

    return (
        <UsersContext.Provider value={{
            // user,
            // getUser,
            logIn,
            logOut
        }}>
            {props.children}
        </UsersContext.Provider>
    );
}

export default UsersContextProvider;