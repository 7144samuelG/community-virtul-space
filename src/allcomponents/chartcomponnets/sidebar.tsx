"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@junobuild/core";
import { ArrowLeft, CalendarCheck2, Home, LogOut, SquareDashedKanban, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export const Sidebar = () => {
  const router=useNavigate()
  return (
    <div className="w-[100px] border-r h-[100vh] pt-[50px]">
      <div className="flex flex-col  items-center space-y-4">
        <ArrowLeft size={18} onClick={()=>router('/home')} className="cursor-pointer"/>
        <div className="flex flex-col space-y-6 pt-[70px]">
          <Link to="/">
            <Home size={18} />
          </Link>
          <Link to="/communities">
            <UsersRound size={18} />
          </Link>
          <Link to="/events">
            <CalendarCheck2 size={18} />
          </Link>
          <Link to="">
            <SquareDashedKanban size={18} />
          </Link>
          <Button variant="outline" onClick={()=>signOut()}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
