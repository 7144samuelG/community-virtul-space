import { About } from "@/allcomponents/welcomecomponents/about";
import { Description } from "@/allcomponents/welcomecomponents/description";
import { NavBar } from "@/allcomponents/welcomecomponents/navbar";

export default function Welcome() {

  
  return (
    <main className="">
      <NavBar />
      <Description />
      <About/>
    </main>
  );
}
