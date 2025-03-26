
import { useEffect, useRef, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { ContentItem, useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL, FRONTEND_URL } from "../config"
import { ShareURL } from "../components/ShareUrl"
import { Menu, LogOut } from "lucide-react"; // Hamburger icon
import { useNavigate } from "react-router-dom"


export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false)
    const [shareUrl, setShareUrl] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [filter, setFilter] = useState<"all" | "youtube" | "twitter" | "link">("all");
    const { contents, refresh } = useContent()
    const navigate = useNavigate()
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [showShareUrl, setShowShareUrl] = useState(false)


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

    useEffect(() => {
        if (showShareUrl) {
            const timer = setTimeout(() => {
                setShowShareUrl(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [showShareUrl])

    // Filter the contents based on the current filter selection
    const filteredContents = contents.filter(
        (item: ContentItem) => filter === "all" || item.type === filter
    )


    return <div >
        {/* Hamburger Icon */}
        <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 focus:outline-none">
                <Menu className="w-8 h-8" />
            </button>
            <h1 className="ml-4 text-2xl font-bold">Dashboard</h1>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin") // Redirect after logout
                }}
                className="bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold px-4 py-2 rounded-full shadow-md hover:scale-105 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>


        </div>

        {/* Conditionally render Sidebar */}
        <div ref={sidebarRef} className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 
    transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <Sidebar onFilterChange={setFilter} />
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
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            }
                        })

                        const url = `${FRONTEND_URL}/share/${response.data.hash}`
                        setShareUrl(url);
                        setShowShareUrl(true)
                    }}
                />

            </div>
            {/* Conditionally render the ShareURL component if shareUrl is set */}
            {shareUrl && (
                <div className="mt-4">
                    {showShareUrl && <ShareURL url={shareUrl} />}
                </div>
            )}
            <div className="mt-4">
                {filteredContents.length === 0 ? (
                    <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-md shadow">
                        <p className="text-lg text-blue-700">
                            No content available. Please add some content to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 transition-all">
                        {filteredContents.map(({ _id, type, link, title }: ContentItem) => (
                            <Card key={_id} contentId={_id} title={title} type={type} link={link} />
                        ))}
                    </div>
                )}
            </div>
        </div>



    </div>
}


