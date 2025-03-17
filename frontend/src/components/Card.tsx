import { useEffect, useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { DarkYoutubeIcon } from "../icons/DarkYoutubeIcon";
import { DarkTwitterIcon } from "../icons/DarkTwitterIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ShareURL } from "./ShareUrl";
import { LinkIcon } from "../icons/LinkIcon";

interface CardProps {
    contentId: string; // New prop for deletion
    title: string;
    link: string;
    type: "twitter" | "youtube" | "link";
}


declare global {
    interface Window {
        twttr?: any;
    }
}
function extractYouTubeID(url: string): string | null {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/|.*[?&]v=))([^"&?/ ]{11})/);
    return match ? match[1] : null;
}



export function Card({ contentId, title, link, type }: CardProps) {
    const [isDeleted, setIsDeleted] = useState(false)
    const [showCard, setShowCard] = useState(true);
    const [showShareUrl, setShowShareUrl] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);
    useEffect(() => {
        if (type === "twitter") {
            if (!window.twttr) {
                const script = document.createElement("script");
                script.src = "https://platform.twitter.com/widgets.js";
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    window.twttr?.widgets.load();
                };
            } else {
                window.twttr.widgets.load();
            }
        }
    }, [type, link]); // Only run when the type is 'twitter' or the link changes

    const handleDelete = async () => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                },
                data: { contentId }
            });
            setIsDeleted(true)
        } catch (error: any) {
            // If the API returns 403, it means the user is not authorized
            if (error.response && error.response.status === 403) {
                setUnauthorized(true);
                setTimeout(() => setUnauthorized(false), 2000);
            } else {
                console.error("Error deleting content:", error);
            }
        }
    };


    useEffect(() => {
        if (isDeleted) {
            const timer = setTimeout(() => {
                setShowCard(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [isDeleted])


    useEffect(() => {
        if (showShareUrl) {
            const timer = setTimeout(() => {
                setShowShareUrl(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [showShareUrl])


    if (!showCard) {
        return null
    }

    if (isDeleted) {
        return (
            <div className="bg-white rounded-md p-4 border border-gray-200 shadow-md w-full max-w-sm mx-auto text-center text-gray-500 opacity-50 transition-opacity duration-500">
                Content Deleted

            </div>
        );
    }

    return <div className="transition-opacity duration-500">
        <div className="bg-white rounded-md   p-4   border border-gray-200 shadow-md w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center justify-center text-md font-medium">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            {type === "youtube" ? (<DarkYoutubeIcon />) :
                                type === "twitter" ? (<DarkTwitterIcon />) :
                                    type === "link" ? (<LinkIcon />) :
                                        null}
                        </a>
                    </div>
                    {title}
                </div>

                <div className="flex items-center">

                    <div className="text-gray-500" onClick={() => {
                        setShowShareUrl(prev => !prev)
                    }}>

                        <ShareIcon />

                    </div>

                    <div className="pr-2 text-gray-500" onClick={handleDelete}><DeleteIcon /></div>
                </div>

            </div>

            {/* Render unauthorized feedback if deletion is not permitted */}
            {unauthorized && (
                <div className="mb-2 text-red-500 text-center">
                    Unauthorized to delete this content
                </div>
            )}

            {/* Render the ShareURL component if showShareUrl is true */}
            {showShareUrl && (
                <div className="mb-4">
                    <ShareURL url={link} />
                </div>
            )}

            <div className="pt-4">

                {type === "youtube" &&
                    <iframe
                        className="w-full"
                        src={`https://www.youtube.com/embed/${extractYouTubeID(link)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen>
                    </iframe>}

                {type === "twitter" && (
                    <div className="w-full overflow-hidden">
                        <blockquote className="twitter-tweet w-full">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}

                {type === "link" && (
                    <div className="w-full">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-extrabold py-2 px-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl truncate"
                        >
                            {link}
                        </a>
                    </div>
                )}
            </div>
        </div>
    </div>
}