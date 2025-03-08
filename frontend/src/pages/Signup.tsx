import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {
    
    const usernameRef=useRef<HTMLInputElement>();
    const passwordRef=useRef<HTMLInputElement>();

   async function signup(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;

     await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                
                    username,
                    password
                
        })
        alert('You have signed up')

         
    }
    return <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white rounded-xl  min-w-48 p-8">
            <Input reference={usernameRef} placeholder="username" />
            <Input reference={passwordRef} placeholder="password" />
            
            

            <div className="flex justify-center pt-2">
                <Button onClick={signup} loading={false}  variant="primary" text="Signup" fullWidth={true}/>
            </div>
        </div>
    </div>
}