"use client";

import { ArrowLeft, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export const Sidebar = () => {
  const router=useNavigate()
  return (
    <div className="w-[100px] bg-gray-200 h-[100vh] pt-[50px]">
      <div className="flex flex-col  items-center space-y-4">
        <ArrowLeft size={18} onClick={()=>router('/home')}/>
        <div>
          <Link to="">
            <UsersRound size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
