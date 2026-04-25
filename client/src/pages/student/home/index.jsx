import { courseCategories } from "@/config";
import banner from "../../../../public/banner-img.png";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );

    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative flex flex-col lg:flex-row items-center justify-between py-20 px-4 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Vibrant Asymmetrical Background Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <div className="lg:w-5/12 lg:pr-8 relative z-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 leading-tight">
            Learning that <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500">empowers you</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
            Master new skills for your present and your future. Join our premium learning platform today.
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/student-courses")}
              className="rounded-full px-8 h-12 bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Start Learning
            </Button>
            <Button 
              onClick={() => navigate("/courses")}
              variant="outline" 
              className="rounded-full px-8 h-12 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all duration-300">
              Browse Paths
            </Button>
          </div>
        </div>
        <div className="lg:w-7/12 mt-12 lg:mt-0 relative z-10 flex justify-end">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-amber-400 rounded-[2.5rem] blur opacity-20"></div>
            <img
              src={banner}
              width={600}
              height={400}
              className="relative w-full h-auto rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] object-cover border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Explore Categories</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {courseCategories.map((categoryItem, index) => {
            const colors = [
              "bg-pink-50 text-pink-700 hover:bg-pink-100 border-pink-100 hover:border-pink-300",
              "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100 hover:border-purple-300",
              "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100 hover:border-amber-300",
              "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100 hover:border-emerald-300",
              "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 hover:border-blue-300"
            ];
            const colorClass = colors[index % colors.length];
            return (
              <Button
                className={`rounded-full border transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5 h-12 px-6 text-sm font-semibold ${colorClass}`}
                variant="outline"
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            );
          })}
        </div>
      </section>
      
      <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 tracking-tight">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem, index) => {
              const borderColors = [
                "border-t-pink-400",
                "border-t-purple-400",
                "border-t-amber-400",
                "border-t-emerald-400"
              ];
              const borderColorClass = borderColors[index % borderColors.length];
              
              return (
                <div
                  key={courseItem?._id}
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className={`border-t-4 border-gray-100 ${borderColorClass} border-x border-b rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer bg-white group flex flex-col`}
                >
                  <div className="overflow-hidden p-2">
                    <img
                      src={courseItem?.image}
                      width={300}
                      height={150}
                      className="w-full h-44 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-1 text-gray-900 line-clamp-2 leading-tight">{courseItem?.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 font-medium">
                      {courseItem?.instructorName}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <p className="font-extrabold text-xl text-gray-900">
                        ${courseItem?.pricing}
                      </p>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-amber-50 p-6 rounded-full mb-4">
                <svg className="w-12 h-12 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-500">Check back later for new and exciting content.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
