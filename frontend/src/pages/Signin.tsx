import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            setError("Both username and password are required")
            setTimeout(() => {
                setError("")
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = ""
            }, 2000)

            return;
        }

        try {
            setError("")
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {

                username,
                password

            })
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            setLoading(false)
            navigate("/dashboard");
        }

        catch (err: any) {
            setLoading(false);
            console.log("signin error:", err)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message)
            }
            else {
                setError("Signin failed. Please try again.");
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
        <div className="bg-white rounded-xl w-full max-w-sm p-8">
            <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
            {error && (
                <div className="mb-4 text-red-500 text-center">
                    {Array.isArray(error)
                        ? error.map((err: any, index: number) => (
                            <div key={index}>{err.message}</div>
                        ))
                        : error}
                </div>
            )}
            <Input reference={usernameRef} placeholder="username" />
            <Input reference={passwordRef} placeholder="password" type="password"/>

            <div className="flex justify-center pt-2">
                <Button onClick={signin} loading={false} variant="primary" text="Signin" fullWidth={true} />
            </div>
        </div>
    </div>
}