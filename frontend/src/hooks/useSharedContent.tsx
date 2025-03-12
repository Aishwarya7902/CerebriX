import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useSharedContent(shareLink: string){
    const [sharedContents,setSharedContents]=useState([])
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
          })
          .then((response)=>{
            setSharedContents(response.data.content)
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

    },[shareLink])

    return {sharedContents,refresh};
}