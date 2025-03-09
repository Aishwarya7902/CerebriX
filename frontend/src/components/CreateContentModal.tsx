import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

enum contentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({ open, onClose }) {
    const titleRef = useRef<HTMLInputElement>()
    const linkRef = useRef<HTMLInputElement>()
    const [type, setType] = useState(contentType.Youtube)


    function addContent() {
        const title = titleRef.current?.value
        const link = linkRef.current?.value
    }
    return <div>
        {open && <div>

            <div className="w-screen h-screen bg-slate-700 fixed top-0 left-0 opacity-60 flex justify-center">

            </div>

            <div className="w-screen h-screen bg-slate-700 fixed top-0 left-0  flex justify-center">
                <div className="flex flex-col justify-center ">
                    <span className="bg-white opacity-100 p-4 rounded ">
                        <div className="flex justify-end" >
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>

                        </div>

                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />

                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>
                        <div>
                            <h1>Type</h1>
                            <div className="flex gap-1 p-4 justify-center">
                                <Button onClick={() => {
                                    setType(contentType.Youtube)
                                }} text="Youtube" variant={type === contentType.Youtube ? "primary" : "secondary"}></Button>

                                <Button onClick={() => {
                                    setType(contentType.Twitter)
                                }} text="Twitter" variant={type === contentType.Twitter ? "primary" : "secondary"}></Button>
                            </div>

                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>



        </div>}
    </div>

}






