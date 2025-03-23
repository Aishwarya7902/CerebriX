import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    async function signin(username?: string, password?: string) {
        const user = username || usernameRef.current?.value || "";
        const pass = password || passwordRef.current?.value || "";

        if (!user || !pass) {
            setError("Both username and password are required");
            setTimeout(() => {
                setError("");
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = "";
            }, 2000);
            return;
        }

        try {
            setError("");
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
               user,
               pass,
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            setLoading(false);
            navigate("/dashboard");
        } catch (err: any) {
            setLoading(false);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Signin failed. Please try again.");
            }
            setTimeout(() => {
                setError("");
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = "";
            }, 2000);
        }
    }

    return (
        <div
            className="h-screen w-screen flex justify-center items-center relative bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('/background_anime.avif')",
            }}
        >
            {/* Soft gradient overlay for an anime vibe */}
            <div className="absolute inset-0 bg-purple-500 bg-gradient-to-b from-transparent to-white opacity-60"></div>

            {/* Anime-inspired Card with Pastel Gradient Border */}
            <div className="relative  ">
                <div className="p-1 rounded-3xl bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                    <div className="bg-pink-200 bg-opacity-70 backdrop-blur-md rounded-3xl shadow-2xl max-w-sm w-full p-10">
                        <h2 className="text-3xl font-extrabold text-center mb-6 text-pink-600">Welcome!!</h2>
                        <div
                            style={{
                                maxHeight: error ? "100px" : "0px",
                                opacity: error ? 1 : 0,
                                transition: "max-height 0.5s ease, opacity 0.5s ease",
                                overflow: "hidden",
                            }}
                            className="mb-4 text-center text-red-500"
                        >
                            {error}
                        </div>
                        <div className="space-y-4">
                            <Input reference={usernameRef} placeholder="Username" type="text" />
                            <Input reference={passwordRef} placeholder="Password" type="password" />
                        </div>
                        <div className="mt-6 space-y-2">
                            <Button
                                onClick={signin}
                                loading={loading}
                                variant="primary"
                                text="Sign In"
                                fullWidth={true}
                            />
                            <Button onClick={() => signin("test2", "test21234")} loading={loading} variant="secondary" text="Test Login" fullWidth={true} />
                        </div>
                        <p className='text-center mt-2'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
