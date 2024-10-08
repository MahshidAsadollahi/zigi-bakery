    'use client';
    import {useSession } from 'next-auth/react';
    import { redirect } from 'next/navigation';
    import { useEffect, useState } from 'react';
    import toast from 'react-hot-toast';
    import UserTabs from '@/components/layout/UserTabs';
    import UserForm from "@/components/layout/UserForm";
    


  


    
    export default function ProfilePage(){
        const[user, setUser]= useState(null);
        const session= useSession();
        const {status}=session;
        const [isAdmin,setIsAdmin]=useState(false);
        const [profileFetched, setProfileFetched]=useState(false);


        useEffect(()=>{
            if(status === 'authenticated'){
                fetch('/api/profile').then (response =>{
                    response.json().then (data => {
                        setUser(data);
                        setIsAdmin(data.admin);
                        setProfileFetched(true);
                    })
                });

            }
        },[session, status]);
        
            async function handleProfileInfoUpdate(ev,data){
            ev.preventDefault();

            const savingPromise= new Promise(async(resolve, reject)=>{
                const response=await fetch ('/api/profile',{
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if(response.ok)
                resolve()
            else
                reject();        
            });
           await toast.promise(savingPromise,{
                loading:'Saving...',
                success: 'Saved successfully!',
                error:'Something went wrong! Try again.',
            });

        }


        if(status === 'loading' || !profileFetched){
            return 'Loading...';
        }
        if(status === 'unauthenticated'){
            return redirect('/login');
        }


    return(
        <section className=" mt-8">
            <UserTabs isAdmin={isAdmin} />
         <div className='max-w-xl mx-auto mt-8'>
            <UserForm user={user} onSave={handleProfileInfoUpdate} />

           
         </div>
         </section>










    );

}