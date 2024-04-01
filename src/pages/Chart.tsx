"use client"

import { ChartPage } from "@/allcomponents/chartcomponnets/charpage";
import { CommunityCharts } from "@/allcomponents/chartcomponnets/communitycharts";
import { Notifications } from "@/allcomponents/chartcomponnets/notifications";
import { Sidebar } from "@/allcomponents/chartcomponnets/sidebar";
import { useAuthContext } from "@/stores/authcontext";
import { initJuno } from "@junobuild/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function MainChartPage() {
  const { user } = useAuthContext();
  const router = useNavigate()
  if(!user){
    router("/")
  }
  useEffect(() => {

    (async () =>
      await initJuno({
        satelliteId: "2aqvj-kiaaa-aaaal-ai4ga-cai",
      }))();
  }, []);
  
 
  return (
    <div className="flex space-x-2 h-[100%]">
      <Sidebar />
      
      <div className="flex-1 h-full p-4">
        <ChartPage />
      </div>
      <Notifications />
    </div>
  );
}
