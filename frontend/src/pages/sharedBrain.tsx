import { useParams } from "react-router-dom"
import { useSharedContent } from "../hooks/useSharedContent"
import { Card } from "../components/Card";

export function SharedBrain() {
    const { shareId } = useParams<{ shareId: string }>();
    const { sharedContents } = useSharedContent(shareId || "");

    if (!sharedContents) {
        return <div className="text-center p-4">No content found for this share link.</div>;
    }
    return <>

        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Shared Contents</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sharedContents.map(({ type, link, title }, index) => (
                    <Card key={index} title={title} type={type} link={link} />
                ))}
            </div>
        </div>
    </>
}