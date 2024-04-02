
import { Button } from "@/components/ui/button";
import image from "../../assets/com.jpeg"
import { useAuthContext } from "@/stores/authcontext";
import { NFIDProvider, signIn } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
export const About = () => {

  const { user } = useAuthContext();
  const navigate=useNavigate()
  const handleAuth = async() => {
    if (!user) {
      await signIn({
        provider: new NFIDProvider({
          appName: "virtual community space",
          logoUrl: "",
        }),
      });
    } 
    else{
      navigate("/home")
    }
  };
  
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="p-8 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-start space-x-[50px]">
          <div className="w-[60%]">
            <h1 className="font-semibold text-[26px] mb-5">
              Empower your community with our innovative platform
            </h1>
            <p>
              Experience a new way of connecting with your community members in a
              virtual space that promots inclusivity and creativity
            </p>
            <p>
              Our platform is built on the foundation of accessibility,ensuring
              that all community members can participate and contribute to
              building a stronger community together
            </p>
            <div className="mt-[80px]">
              <Button onClick={handleAuth}>Discover more</Button>
            </div>
          </div>

          <div>
            <img
              src={image}
              width={300}
              height={300}
              alt=""
              className="h-[400px] w-[350px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
