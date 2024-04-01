
import { useEffect } from "react";
import { Search } from "./search"
import { initJuno } from "@junobuild/core";
import { AvailbelCommunities } from "./availablecommunity";

export const CommunityCharts=()=>{
    useEffect(() => {

        (async () =>
          await initJuno({
            satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
          }))();
      }, []);
    return(
        <div className="w-[400px]">
            <h1 className="bold text-[42px]">Charts</h1>
            <Search/>
            <div className="border-b w-[90%] mx-auto mt-6"/>
            <AvailbelCommunities/>
        </div>
    )
}