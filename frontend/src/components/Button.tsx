import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary"
    text: string;
    startIcon?: ReactElement;
    onClick?:()=>void;

}

const variantClasses = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"


export function Button(props: ButtonProps) {
    return <button onClick={props.onClick} className={`${variantClasses[props.variant]} ${defaultStyles}`}>
            
            {props.startIcon}
            {props.text}
       
    </button>
}