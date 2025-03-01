import { ReactElement } from "react";


interface ButtonInterface {
    title: string;
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    variant: "primary" | "secondary"
}


const sizeStyles = {
    "lg": "px-6 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-3 py-1 text-sm rounded"
};

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600",
    
}


export function Button(props: ButtonInterface) {
    return <button className={`${sizeStyles[props.size]} ${variantStyles[props.variant]}`}>
        <div className="flex gap-x-2 items-center">
            {props.startIcon}
            {props.title}
            {props.endIcon}
        </div>
    </button>
}