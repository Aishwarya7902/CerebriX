import { useParams } from "react-router-dom"
import { useSharedContent } from "../hooks/useSharedContent"
import { Card } from "../components/Card";

export function SharedBrain() {
    const { shareId } = useParams<{ shareId: string }>();
    const { sharedContents, username, error } = useSharedContent(shareId || "");

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 border border-red-300 rounded-md shadow text-center">
            
                <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }
    if (sharedContents.length === 0) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-50 border border-yellow-300 rounded-md shadow text-center">
                <h2 className="text-xl font-semibold text-yellow-600 mb-2">No Content Found</h2>
                <p className="text-yellow-500">We couldn't find any shared content for this link.</p>
            </div>
        );
    }

    return <>

        <div className="max-w-7xl mx-auto p-4 bg-gray-200">
            <h1 className="text-3xl font-bold text-center mb-4">
                {username ? `Shared by ${username}` : "Shared Contents"}
            </h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sharedContents.map(({ _id, type, link, title }, index) => (
                    <Card contentId={_id} key={index} title={title} type={type} link={link} />
                ))}
            </div>
        </div>
    </>
}