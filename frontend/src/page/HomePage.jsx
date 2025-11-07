import { Typewriter } from 'react-simple-typewriter'
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

import JobCard from "../components/JobCard";

async function getRecentJob() {
    const res = await fetch(`http://localhost:5000/jobs/recent`);
    if (!res.ok) throw new Error("");
    return res.json();
}   

function HomePage() {
    
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["home"], //data
        queryFn: getRecentJob,
    });

  return (
    <>
        {console.log(data)}
        

        {/*Hero Section ----------------------------------------------------------------------------------------- */}
        <section className="bg-linear-to-r from-blue-500 to-purple-500 text-white text-center py-12">
            
            <h1 className="text-4xl font-bold mb-6">
                <Typewriter
                    words={['Find Your Dream Job', 'Join Top Companies', 'Get Hired Fast']}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={20}
                    deleteSpeed={20}
                    delaySpeed={5000}
                />
            </h1>
            
            <p className="text-xl max-w-2xl mx-auto opacity-90">
                Connect with leading companies that need your skills. Explore numerous opportunities and advance your career with SeekJobs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-10 mt-12">

                <div className="bg-blue-600 p-6 rounded-3xl w-full">
                    <h2 className="text-2xl font-bold">For Employees</h2>
                    <p className="mt-2 mb-4">
                        Browse our jobs and start your career today
                    </p>
                    <Link to="/jobs" className="inline-block font-bold bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse Jobs
                    </Link>
                </div>
                
                <div className="bg-purple-600 p-6 rounded-3xl w-full">
                    <h2 className="text-2xl font-bold">For Employers</h2>
                    <p className="mt-2 mb-4">
                        List your job to find the perfect candicate for the role
                    </p>
                    <Link to="/jobs-add" className="inline-block font-bold bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Add Job
                    </Link>
                </div>


            </div>
            
        </section>



        {/* Recent Job section ------------------------------------------------------------------------------------- */}
        <section className="py-16 mx-auto px-12 bg-blue-100">

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Recent Job Postings</h2>
                <p className="max-w-2xl mx-auto">
                    Discover the latest opportunities in our platform
                </p>
            </div>

            {isLoading && 
                <div className="text-center py-12">
                    <ScaleLoader
                        barCount={20}
                        color="#3B82F6"
                        height={60}
                        margin={4}
                        radius={20}
                        speedMultiplier={1}
                        width={10}
                    />
                </div>
            }

            {data && 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {data.map(job => <JobCard key={job.id} job={job}/>)}
                </div>
            } 

            {isError &&
                <div className="text-center center py-12 text-gray-400 text-2xl font-bold">
                    😞 Network Issue
                </div>
            }
            
                       
            <div className="text-center py-8">
                <Link to="/jobs" className="inline-block bg-black text-white text-xl py-3 px-9 rounded-xl font-bold hover:bg-gray-700 transition">
                    View More
                </Link>
            </div>
            
        </section>
    </>
  )
}

export default HomePage