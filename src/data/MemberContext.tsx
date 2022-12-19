import React, {useState, createContext } from "react"
import internal from "stream"

export type Member = {
    id: any;
    name: any;
    phone: any;
    day: any;
    hours: any;
    available: any;
}


type MemberContextType = {
    members: Member[];
    addMember: (memberName:any, memberPhone:any, memberDay:any, memberHours:any) => void,
    updateMember: (memberId:any,memberName:any, memberPhone:any, memberDay:any, memberHours:any) => void;
    updateStatus: (memberId:any, memberStatus:any) => void;
    deleteMember: (memberId:any) => void
}

type MemberContextProviderProps ={
    children: React.ReactNode
}

export const MemberContext = createContext<MemberContextType>({
    members: [],
    addMember: () => {},
    updateMember: () => {},
    updateStatus: () => {},
    deleteMember: () => {}
});

export const MemberContextProvider = ({children}: MemberContextProviderProps) => {
    const [members, setMembers] = useState<Member[]>([
        {
            id: 1,
            name: "Put",
            phone: "089876765",
            day: 'Mon',
            hours: '08:00 - 08:05',
            available: true
        },
        {
            id: 2,
            name: "Test",
            phone: "089876765",
            day: 'Tue',
            hours: '08:00 - 08:05',
            available: true          
        },
        {
            id: 3,
            name: "Test2",
            phone: "089876765",
            day: 'Wed',
            hours: '08:00 - 08:05',
            available: true   
        },
        {
            id: 4,
            name: "Test3",
            phone: "089876765",
            day: 'Thu',
            hours: '08:00 - 08:05',
            available: true   
        },
        {
            id: 5,
            name: "Test4",
            phone: "089876765",
            day: 'Fri',
            hours: '08:00 - 08:05',
            available: false   
        },
        {
            id: 6,
            name: "Test5",
            phone: "089876765",
            day: 'Sat',
            hours: '08:00 - 08:05',
            available: false   
        },
        {
            id: 7,
            name: "rilek",
            phone: "089876765",
            day: 'Mon',
            hours: '08:00 - 08:05',
            available: true   
        }
    ]);

    const addMember =(memberName:any, memberPhone:any, memberDay:any, memberHours:any)=>{
        const newMember: Member = {
            id: members.length+1,
            name: memberName,
            phone: memberPhone,
            day: memberDay,
            hours: memberHours,
            available: true
        }
        setMembers((currMembers:Member[]) => {
            return currMembers.concat(newMember)
        })
    };

    const updateMember =(memberId:any,memberName:any, memberPhone:any, memberDay:any, memberHours:any) => {
        setMembers((currMembers:Member[])=>{
            //currJomblos[jombloId].targeted = isTargeted;
            currMembers[memberId-1].name = memberName;
            currMembers[memberId-1].phone = memberPhone;
            currMembers[memberId-1].day = memberDay;
            currMembers[memberId-1].hours = memberHours;
            console.log(currMembers)
            return currMembers;
        });
    };

    const updateStatus=(memberId:any, memberStatus:any) => {
        setMembers((currMembers:Member[])=>{
            currMembers[memberId-1].available = memberStatus;
            return currMembers;
        })
    }

    const deleteMember =(memberId:any) => {
        setMembers((currMembers:Member[])=>{
            currMembers.splice(memberId-1, 1);
            for(var i = 0; i<currMembers.length; i++){
                currMembers[i].id = i+1;
            }
            return currMembers;
        });
    };

    return (
        <MemberContext.Provider value={{
            members,
            addMember,
            updateMember,
            updateStatus,
            deleteMember
        }}>
            {children}
        </MemberContext.Provider>

    )
}