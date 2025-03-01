interface PlusIconProps{
    size: "sm" | "md" | "lg"
}

const sizeVariants = {
    "sm": "w-3 h-3",  // Adjusted for better proportion
    "md": "w-5 h-5",
    "lg": "w-7 h-7"
};


export function PlusIcon(props:PlusIconProps){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={sizeVariants[props.size]}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
  

}