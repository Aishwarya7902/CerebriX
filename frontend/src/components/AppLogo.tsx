import { ReactElement } from "react";

interface AppLogoProps{
    appIcon:ReactElement;
    title:string;
}
export function AppLogo(props:AppLogoProps){
       return <div className="flex gap-4 mt-5 ml-2 text-2xl items-center">
            {props.appIcon}
           <div className="font-bold"> {props.title}</div>
       </div>
}