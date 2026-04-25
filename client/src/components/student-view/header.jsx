import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center space-x-6">
        <Link to="/home" className="flex items-center group">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-1.5 rounded-lg mr-3 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-extrabold md:text-xl text-[16px] tracking-tight text-gray-900">
            Nexora
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[15px] font-medium text-gray-600 hover:text-gray-900"
          >
            Explore Courses
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <TvMinimalPlay className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-indigo-600" />
            <span className="font-semibold md:text-[15px] text-[14px]">
              My Courses
            </span>
          </div>
          <Button onClick={handleLogout} variant="outline" className="hidden sm:inline-flex rounded-xl font-semibold">Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
