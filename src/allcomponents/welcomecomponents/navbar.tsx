import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/stores/authcontext";
import { NFIDProvider, signIn } from "@junobuild/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { user } = useAuthContext();
  const router = useNavigate();
  const[loading,setLoading]=useState(false)
  const handleAuth = async () => {
    if (!user) {
      setLoading(true)
    await signIn({
        provider: new NFIDProvider({
          appName: "virtual community space",
          logoUrl: "",
        }),
      });
      setLoading(false)
    }
    setLoading(false)
  };
  
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="flex justify-between items-center mt-8">
        <Link to="" className="text-semibold">
          ACME Community
        </Link>
        <div className="space-x-10">
          <Link to="/communities">Communities</Link>
          <Link to="/events">Events</Link>
          <Link to="">Activities</Link>
        </div>
        <div className="flex space-x-4">
          {user ? (
            <div>
              {" "}
              <Button onClick={() => router("/home")}>Join now</Button>
            </div>
          ) : (
            <div>
              <Button onClick={handleAuth}>
                
                  Sign-Up
               
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
