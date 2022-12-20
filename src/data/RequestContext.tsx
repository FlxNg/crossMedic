import React, {useState, createContext } from "react"
import internal from "stream"
import { Member } from "./MemberContext"

export type Request = {
    id: number,
    nama: string,
    nim: string,
    waktu: string,
    tempat: string,
    kontak: string,
    jenis: string,
    acara: string,
    deskripsi: string,
    keterangan: string,
    status: number,
    members: Member[]|null;
}


type RequestContextType = {
    requests: Request[];
    addRequest: () => void,
    updateRequest: (requestId:number, requestStatus:number, assignedMember:Member[]|null) => void;
    deleteRequest: (requestId:any) => void
}

type RequestContextProviderProps ={
    children: React.ReactNode
}

export const RequestContext = createContext<RequestContextType>({
    requests: [],
    addRequest: () => {},
    updateRequest: () => {},
    deleteRequest: () => {}
});

export const RequestContextProvider = ({children}: RequestContextProviderProps) => {
    const [requests, setRequests] = useState<Request[]>([
        {
            id: 1,
            nama: 'megalodon',
            nim: '123456789',
            waktu: '24/10/2022',
            tempat: 'Gedung A',
            kontak: '@line',
            jenis: 'Jasa',
            acara: 'Jaga Starlight',
            deskripsi: 'Pengajuan jasa medic pada acara kami yakni maksima',
            keterangan:'Dibutuhkan minimal 4 orang untuk penjagaan',
            status: 0,
            members: null
        },
        {
            id: 2,
            nama: 'megalodon',
            nim: '123456789',
            waktu: '24/10/2022',
            tempat: 'Gedung B',
            kontak: '@line',
            jenis: 'Peralatan',
            acara: 'Pinjam Kursi Roda',
            deskripsi: 'Pengajuan jasa medic pada acara kami yakni maksima',
            keterangan:'Dibutuhkan minimal 4 orang untuk penjagaan',
            status: 0,
            members: null
        }
    ]);

    const addRequest =()=>{
        
    };

    const updateRequest =(requestId:any, requestStatus:any, assignedMember:Member[]|null) => {
        setRequests((currRequests:Request[]) => {
            currRequests[requestId-1].status = requestStatus;
            currRequests[requestId-1].members = assignedMember;
            return currRequests;
        })
    };

    const deleteRequest =(requestId: any) => {
        setRequests((currRequests:Request[])=>{
            currRequests.splice(requestId-1, 1);
            for(var i = 0; i<currRequests.length; i++){
                currRequests[i].id = i+1;
            }
            return currRequests;
        });
    };

    return (
        <RequestContext.Provider value={{
            requests,
            addRequest,
            updateRequest,
            deleteRequest
        }}>
            {children}
        </RequestContext.Provider>

    )
}