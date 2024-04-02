
import { FolderKanban, GanttChart, Home, Users } from "lucide-react";
import { Link } from "react-router-dom";


export const SideBar = () => {
  return (
    <div className=" h-[100vh] border-r w-[150px]">
      <div className="flex flex-col space-y-6 items-center mt-[100px]">
        <Link to="/home" className="text-center">
          <Home />
        </Link>
        <Link to="/events" className="text-center">
          <GanttChart/>
        </Link>
        <Link to="/communities" className="text-center">
          <Users/>
        </Link>
        <Link to="/projects" className="text-center">
          <FolderKanban/>
        </Link>
      </div>
    </div>
  );
};
