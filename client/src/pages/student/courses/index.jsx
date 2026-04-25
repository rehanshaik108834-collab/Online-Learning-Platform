import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSeection, getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(cpyFilters);
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
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
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log(loadingState, "loadingState");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#FAFAFA] py-8">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-gray-900">All Courses</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-4">
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-2">
              {Object.keys(filterOptions).map((ketItem, index) => (
                <div className={`p-4 ${index !== Object.keys(filterOptions).length - 1 ? "border-b border-gray-100" : ""}`} key={ketItem}>
                  <h3 className="font-bold mb-4 text-gray-900 tracking-tight">{ketItem.toUpperCase()}</h3>
                  <div className="grid gap-3 mt-2">
                    {filterOptions[ketItem].map((option) => (
                      <Label className="flex font-medium items-center gap-3 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" key={option.id}>
                        <Checkbox
                          checked={
                            filters &&
                            Object.keys(filters).length > 0 &&
                            filters[ketItem] &&
                            filters[ketItem].indexOf(option.id) > -1
                          }
                          onCheckedChange={() =>
                            handleFilterOnChange(ketItem, option)
                          }
                        />
                        {option.label}
                      </Label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <main className="flex-1">
            <div className="flex justify-end items-center mb-6 gap-5">
              <span className="text-sm text-gray-500 font-medium">
                Showing <span className="font-bold text-gray-900">{studentViewCoursesList.length}</span> results
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 p-5 rounded-xl border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300"
                  >
                    <ArrowUpDownIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-[15px] font-semibold text-gray-700">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-gray-100 shadow-lg">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => setSort(value)}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                        className="cursor-pointer font-medium"
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="space-y-6">
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
                    <Card
                      onClick={() => handleCourseNavigate(courseItem?._id)}
                      className={`cursor-pointer group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border-gray-100 border-t-4 ${borderColorClass}`}
                      key={courseItem?._id}
                    >
                      <CardContent className="flex flex-col sm:flex-row gap-6 p-4">
                        <div className="w-full sm:w-64 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100">
                          <img
                            src={courseItem?.image}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <CardTitle className="text-2xl mb-2 tracking-tight text-gray-900 line-clamp-2 leading-tight">
                            {courseItem?.title}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mb-2 font-medium">
                            Created By{" "}
                            <span className="font-bold text-gray-900">
                              {courseItem?.instructorName}
                            </span>
                          </p>
                          <p className="text-[14px] text-gray-600 mb-4 bg-gray-50 inline-block px-3 py-1 rounded-full w-max border border-gray-100 font-medium">
                            {`${courseItem?.curriculum?.length} ${
                              courseItem?.curriculum?.length <= 1
                                ? "Lecture"
                                : "Lectures"
                            } • ${courseItem?.level.toUpperCase()} Level`}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <p className="font-extrabold text-2xl text-gray-900">
                              ${courseItem?.pricing}
                            </p>
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-100 group-hover:border-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : loadingState ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-2xl bg-gray-100" />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-center">
                  <div className="bg-amber-50 p-6 rounded-full mb-6">
                    <svg className="w-16 h-16 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Found</h3>
                  <p className="text-gray-500 max-w-md">Try adjusting your filters or search criteria to find what you're looking for.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
