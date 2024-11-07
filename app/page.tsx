import LandingNavbar from "@/components/ui/LandingNavbar";

const page = () => {
  return (
    <div className="h-screen w-screen pt-[100px] bg-gray-50 flex flex-col items-center justify-center">
      <LandingNavbar />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl font-bold text-gray-600 ">
          Landing Page in progress...
        </h1>
      </div>
    </div>
  );
};

export default page;
