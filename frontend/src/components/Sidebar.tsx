import { AppIcon } from "../icons/AppIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { HashIcon } from "../icons/HashIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { AppLogo } from "./AppLogo";
import { SidebarItem } from "./SidebarItem";



interface sidebarProps{
    onFilterChange:(filter:"all" | "twitter" | "youtube")=>void
}
export function Sidebar({onFilterChange} :sidebarProps) {
    return <div className="h-screen bg-white  border-r  border-gray-200 w-72 pl-6 fixed left-0 top-0">

        <div >
              <AppLogo title="CerebriX" appIcon={<AppIcon/>}/>
        </div>
        <div className="mt-15 ">

            <SidebarItem title="Tweets" linkIcon={<TwitterIcon />} onClick={()=>onFilterChange("twitter")}/>
            <SidebarItem title="Videos" linkIcon={<YoutubeIcon />} onClick={()=>onFilterChange("youtube")}/>
            <SidebarItem title="Documents" linkIcon={<DocumentIcon />} onClick={()=>onFilterChange("all")}/>
            <SidebarItem title="Links" linkIcon={<LinkIcon />} onClick={()=>onFilterChange("all")}/>
            <SidebarItem title="Tags" linkIcon={<HashIcon />} onClick={()=>onFilterChange("all")}/>
        </div>


    </div>
}