import toast from 'react-hot-toast';
import Image from 'next/image';

export default function EditableImage({link, setLink}){
    async function handleFileChange(ev){
        const files=ev.target.files;
        if (files?.length === 1){
            const data=new FormData;
            data.set('file', files[0]);


     const uploadPromise= fetch('/api/upload',{
     method: 'POST',
     body:data,
     }).then(response=>{
     if (response.ok){
     return response.json().then(link =>{
     setLink(link);
           })
                    
         }
     throw new Error('Something went wrong! Try again.');
     });  
     await toast.promise(uploadPromise,{
    loading:'Uploading...',
    success:'Uploaded Successful!',
    error:'Something went wrong! Try again.',

        });
           
        }

    }
    return(
        <>
         {link &&(
         <Image className="rounded-lg w-full h-full mb-1"
         src={link} 
         width={256}
         height={256}
         alt={'Profile Pic'}/>

         )}

         {!link && (
            <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                Add a picture

            </div>
         )}             

        <label>
        <input type="file" className="hidden"
        onChange={handleFileChange}/>
        <span className="block border rounded-lg border-light-olive-green
        text-center p-2 cursor-pointer">Edit</span>
         </label>
        
        </>

    );

}