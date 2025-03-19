import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";


export interface ContentItem {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
  }

export function useContent(){
    const [contents,setContents]=useState<ContentItem[]>([])
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then((response)=>{
               setContents(response.data.content)
          })
          .catch((error) => {
            console.error('Error fetching content:', error);
            
          })
    }
    useEffect(()=>{
      
      refresh()

    let interval= setInterval(()=>{
         refresh()
      },5000)


      return ()=>{
         clearInterval(interval)
      }

    },[])

    return {contents,refresh};
}