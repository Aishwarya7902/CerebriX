import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface inputProps {
    placeholder: string;
    reference?: any
    type?: string

}
export function Input({ reference, placeholder, type = "text" }: inputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return <div>
        <div className="relative w-full m-2">
            <input
                ref={reference}
                placeholder={placeholder}
                type={type === "password" && showPassword ? "text" : type}
                className="w-full px-4 py-2 border border-gray-300 rounded m-2 pr-10" />

            {type === "password" && (
                <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    </div>
}