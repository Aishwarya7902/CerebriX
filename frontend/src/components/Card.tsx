import { useEffect } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
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

export function Card({ title, link, type }: CardProps) {
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
    return <div>
        <div className="bg-white rounded-md   p-4 max-w-72  border border-gray-200 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="pr-2 text-gray-500"><ShareIcon /></div>
                    {title}
                </div>

                <div className="flex items-center">

                    <div className="text-gray-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>

                    <div className="pr-2 text-gray-500"><DeleteIcon /></div>
                </div>

            </div>

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

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}

            </div>
        </div>
    </div>
}