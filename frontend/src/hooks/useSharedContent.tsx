import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useSharedContent(shareLink: string) {
    const [sharedContents, setSharedContents] = useState([])
    const [username, setUsername] = useState("");
    const [error, setError] = useState<string | null>(null);

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setSharedContents(response.data.content)
                setUsername(response.data.username);
                setError(null);
            })
            .catch((error) => {
                console.error('Error fetching content:', error);
                setError("Error fetching shared content.");
            })
    }
    useEffect(() => {

        refresh()

        let interval = setInterval(() => {
            refresh()
        }, 5000)


        return () => {
            clearInterval(interval)
        }

    }, [shareLink])

    return {  sharedContents, username, error, refresh };
}