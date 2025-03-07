import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary"
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;

}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center "


export function Button(props: ButtonProps) {
    
    return <button
        onClick={!props.loading ? props.onClick : undefined}
        disabled={props.loading}
        className={`${variantClasses[props.variant]} ${defaultStyles} ${props.fullWidth ? "w-full flex justify-center items-center" :""} ${props.loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} `}
        
    >

        {props.startIcon}
        {props.text}

    </button>
}