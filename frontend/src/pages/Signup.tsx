import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup() {
    return <div className="h-screen w-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white rounded-xl  min-w-48 p-8">
            <Input placeholder="username" />
            <Input placeholder="password" />

            <div className="flex justify-center pt-2">
                <Button loading={true}  variant="primary" text="Signup" fullWidth={true}/>
            </div>
        </div>
    </div>
}