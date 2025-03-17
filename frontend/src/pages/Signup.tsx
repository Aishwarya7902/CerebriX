import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()



    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        // basic validation
        if (!username || !password) {
            setError("Both username and password are required")
            // Clear error and reset inputs after 5 seconds
            setTimeout(() => {
                setError("");
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = "";
            }, 2000);
            return;
        }

        try {
            setLoading(true)
            setError("")
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            })

            // storing token in local storage
            localStorage.setItem("token", response.data.token)
            setLoading(false)
            alert("You have signed up successfully!");
            //navigate to the dashboard
            navigate("/dashboard")
        }
        catch (err: any) {
            setLoading(false);
            console.log("signup error:", err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError("Signup failed. Please try again.");
            }
            // Clear error and reset inputs after 5 seconds
            setTimeout(() => {
                setError("");
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = "";
            }, 2000);
        }

    }
    return <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white rounded-xl  w-full max-w-sm p-8">
            <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
            {error && (
                <div className="mb-4 text-red-500 text-center">
                    {Array.isArray(error)
                        ? error.map((err: any, index: number) => (
                            <div key={index}>{err.message}</div>
                        ))
                        : error}
                </div>
            )}


            {/* A single container to hold inputs and button with consistent spacing */}
            
                    <Input reference={usernameRef} placeholder="username" />
               

               
                    <Input reference={passwordRef} placeholder="password" type="password" />
                

                
                <div className="flex justify-center items-center pt-2 ml-2">
                    <Button
                        onClick={signup}
                        loading={loading}
                        variant="primary"
                        text="Signup"
                        fullWidth={true}
                    />
                </div>
            </div>
        </div>
}