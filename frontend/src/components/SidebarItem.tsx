import { ReactElement } from "react";

interface SidebarItemProps {
    title: string;
    linkIcon: ReactElement;
    onClick?: () => void;
}


export function SidebarItem(props: SidebarItemProps) {
    return <div>
        <div
            onClick={props.onClick}
            className="flex gap-4 text-gray-600 font-medium m-10 cursor-pointer rounded hover:bg-gray-200 max-w-48 pl-4 transition-all duration-200"
        >

            {props.linkIcon}
            {props.title}
        </div>
    </div>
}