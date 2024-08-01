'use client';
import { useState} from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress]=useState(false);

    async function handleFormSubmit(ev){

        ev.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, callbackUrl:'/'});
        
        setLoginInProgress(false);
    }
 
    return(
    
    <section className=" mt-8">
         <h1 className="text-center text-nav-text text-4xl mb-4">
            Login
         </h1>

         <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
         <input
            className="focus:outline-none focus:ring-0 focus:border-gray-500 mb-4"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            disabled={loginInProgress}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            className="focus:outline-none focus:ring-0 focus:border-gray-500 mb-4"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            disabled={loginInProgress}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button disabled={loginInProgress}  type="submit">Login</button>

          <div className="or-divider text-gray-500 my-4">
            <span className="or-text">Or</span>
          </div>
          <button type="button" onClick={()=> signIn('google', {callbackUrl:'/'})}
          
             className="flex gap-4 justify-center">
            <Image
              src={'/google-icon.png'}
              alt={'google icon'}
              width={24}
              height={24}
            />
            Login with Google
          </button>
         </form>
         
      
    </section>








    );

}