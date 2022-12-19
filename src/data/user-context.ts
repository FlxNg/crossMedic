import React from 'react';

// export interface User {
//     name: string,
//     nim: string,
//     prodi: string,
//     email: string
// }

interface Context {
    // user: User[],
    // getUser: () => void,
    logIn: (name: string, nim: string, prodi: string, email: string) => void,
    logOut: () => void
}

const UsersContext = React.createContext<Context>({
    // user: [],
    // getUser: () => {},
    logIn: () => {},
    logOut: () => {}
}) 

export default UsersContext;