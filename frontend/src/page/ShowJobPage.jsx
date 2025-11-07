import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

import JobCard from "../components/JobCard";

async function getAllJob() {
    const res = await fetch("http://localhost:5000/jobs");
    if (!res.ok) throw new Error("😞 Network Issue");
    return res.json();
}  

function ShowJobPage() {

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["all"], //data
        queryFn: getAllJob,
    });

    return (
        <section className="py-16 mx-auto px-12">

            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">All Job Postings</h2>
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

            {console.log("array shape", data)}

            {isError &&
                <div className="text-center center py-12 text-gray-400 text-2xl font-bold">
                    😞 Network Issue
                </div>
            }
            
        </section>
    )
    }

export default ShowJobPage