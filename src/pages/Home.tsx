import { Main } from "@/allcomponents/homecomponents/main";
import { Notifications } from "@/allcomponents/homecomponents/notifications";
import { SideBar } from "@/allcomponents/homecomponents/sidebar";

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-row">
        <SideBar />
        <div className="flex-1">
          <Main />
        </div>
        <Notifications />
      </div>
    </div>
  );
}
