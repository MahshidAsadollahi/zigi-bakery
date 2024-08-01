'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function UsersPage(){

    const [users, setUsers]=useState([]);
    const {loading,data}= useProfile();

    useEffect(()=> {
        fetch ('/api/users').then(response => {
            response.json().then (users => {

                setUsers(users);
            });

        })

    },[]);

    if(loading){
        return 'Loading user info';
    }
    if(!data.admin){
        return 'Access denied!';
    }

    return(
        <section className="max-w-xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users?.length > 0 && users.map(user => (
                    <div 
                    key={user._id}
                    className="flex gap-4 bg-light-olive-green-light rounded-xl p-1 px-4 mb-2 items-center">
                        <div className="grid grid-cols-2 md:grid-cols-3 grow gap-4">
                            <div className="text-gray-500">
                            {!!user.name && (<span>{user.name}</span>)}
                            {!user.name && (<span className="italic">No name</span>)}
                           
                            </div>
                      
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <Link className="button" href={'/users/' + user._id}>Edit</Link>
                        </div>
                        
                        
                    </div>
                ))}
            </div>
        </section>
    );
}