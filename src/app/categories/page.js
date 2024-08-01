'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from  "@/components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";
export default function CategoriesPage(){
   
    const [categoryName, setCategoryName]=useState('');
    const [categories,setCategories]=useState([]);
    const {loading:profileLoading, data:profileData}= useProfile();
    const [editedCategory, setEditedCategory]=useState(null);

    useEffect(()=>{
        fetchCategories();

    },[]);

    function fetchCategories(){
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            });
        });
    }

     async function handleCategorySubmit(ev){
        ev.preventDefault();

        const creationPromise=new Promise(async (resolve,reject)=>{
            const data={name:categoryName};
            if(editedCategory){
                data._id=editedCategory._id;
            }
            const response=await fetch('/api/categories',{
            method: editedCategory ? 'PUT' : 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data),
        });
        setCategoryName('');
        fetchCategories();
        setEditedCategory(null);

        if(response.ok)
            resolve();
        else
            reject();
        
        });
        await toast.promise(creationPromise,{
            loading: editedCategory ? 'Updating category...' : 'Creating new category...',
            success: editedCategory ? 'Category update complete!' : 'New category created.',
            error:'Something went wrong! Try again.',
        });
        

    }

    async function handleDeleteClick(_id){
        const promise =new Promise (async(resolve,reject)=>{
           const response= await fetch('/api/categories?_id=' + _id, {
            method: 'DELETE',
        });
        if(response.ok){
            resolve();
        }else{
            reject();
        }

        

        });
         await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted!',
            error: 'Something went wrong! Try again.',
        });

        fetchCategories();


    }



    if(profileLoading){
        return 'User info loading...';
    }
    if(!profileData.admin){
        return 'Access Denied!';
    }
    
    return(
      <section className="mt-8 max-w-xl mx-auto">
        <UserTabs isAdmin={true} />
        <form className="mt-8"
        onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
                <div className="grow">
                <label>
                {editedCategory ?'Update category' : 'New Category Name'}
                {editedCategory && (
                    <>: <b>{editedCategory.name}</b></>
                )}
                </label>
                 <input className="focus:outline-none focus:ring-0 focus:border-gray-500"
                  type="text"
                  value={categoryName}
                  onChange={ev =>setCategoryName (ev.target.value)}/>
                </div>
                   <div className="flex gap-2 pb-2">
                    <button type="submit">
                        {editedCategory ? 'Update': 'Create'}
                    </button>

                    <button 
                    type="button"
                    onClick={()=> 
                    {setEditedCategory(null);
                        setCategoryName('');
                    }}>
                    Cancel
                    </button>
                   </div>
            </div>
            
        </form>
        <div>
            <h2 className="mt-4 text-sm text-gray-500">Category List:</h2>
            {categories?.length>0 && categories.map(c=>(
            <div 
            key={c._id}
            className="flex gap-1 bg-light-olive-green-light rounded-xl p-2 px-4 mb-2 items-center">
                   
            <div 
                className="grow">{c.name}</div>
                <div className="flex gap-2">
                    <button type="button"
                    onClick={()=> {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                        }} 
                    >
                        Edit
                        </button>
                 <DeleteButton 
                 label="Delete"
                 onDelete={()=> handleDeleteClick(c._id)} />
                </div>
                    
            </div>

            ))}
        </div>
      </section>
    );
}