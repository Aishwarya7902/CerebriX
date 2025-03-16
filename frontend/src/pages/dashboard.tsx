import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { ShareURL } from "../components/ShareUrl"
import { Menu } from "lucide-react"; // Hamburger icon


export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false)
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { contents, refresh } = useContent()
    const sidebarRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        refresh()
    }, [modalOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If sidebar is open and click occurs outside sidebar, close it
            if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sidebarOpen]);

    return <div >
        {/* Hamburger Icon */}
        <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 focus:outline-none">
                <Menu className="w-8 h-8" />
            </button>
            <h1 className="ml-4 text-xl font-bold">Dashboard</h1>
        </div>

        {/* Conditionally render Sidebar */}
        <div ref={sidebarRef} className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 
    transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <Sidebar />
        </div>
        <div className={`p-4 min-h-screen bg-gray-100 border border-gray-200 transition-all ${sidebarOpen ? "ml-0 sm:ml-72" : "ml-4"}`}>
            <CreateContentModal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false)
                }}
            />


            <div className="flex justify-end gap-4">
                <Button
                    onClick={() => {
                        setModalOpen(true)
                    }}
                    variant="primary"
                    text="Add Content"
                    startIcon={<PlusIcon />}
                />

                <Button
                    variant="secondary"
                    text="Share brain"
                    startIcon={<ShareIcon />}
                    onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                            share: true
                        }, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        })

                        const url = `http://localhost:5173/share/${response.data.hash}`
                        setShareUrl(url);



                    }}
                />

            </div>
            {/* Conditionally render the ShareURL component if shareUrl is set */}
            {shareUrl && (
                <div className="mt-4">
                    <ShareURL url={shareUrl} />
                </div>
            )}
            <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all">
                {contents.map(({ _id,type, link, title }) =>
                    <Card
                        contentId={_id}
                        title={title}
                        type={type}
                        link={link}
                    />
                )}
            </div>
        </div>



    </div>
}


