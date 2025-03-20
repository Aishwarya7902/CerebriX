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
                username,
                password,
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-60"></div>

            {/* Anime-inspired Card with Pastel Gradient Border */}
            <div className="relative  ">
                <div className="p-1 rounded-3xl bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
                    <div className="bg-pink-100 bg-opacity-70 backdrop-blur-md rounded-3xl shadow-2xl max-w-sm w-full p-10">
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
                        <div className="mt-6">
                            <Button
                                onClick={signin}
                                loading={loading}
                                variant="primary"
                                text="Sign In"
                                fullWidth={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
