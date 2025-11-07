import {Link, useParams, useNavigate} from "react-router-dom"
import {FaArrowLeft, FaMapMarkerAlt, FaRegEdit} from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast} from 'react-toastify';


async function getJobDetail(id) {

    const res = await fetch(`http://localhost:5000/jobs/${id}`);
    if (!res.ok) throw new Error("");
    return res.json();
}  

async function deleteJob(id) {
    const res = await fetch(`http://localhost:5000/jobs/${id}`, {method: "DELETE"});
    if (!res.ok) throw new Error("");
    return id;
}

function ViewJobPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["single", id],
        queryFn: () => getJobDetail(id)
    });

    const {mutate: removeJob, isPending} = useMutation({
        mutationFn: deleteJob,
        onSuccess: (id) => {
            navigate("/jobs");
            toast.success(`Sucessfully deleted id=${id}`);
        },
        onError: (error, failedId) => {
            toast.error(`Failed to delete id=${failedId}`);
        }
    })

    function DeleteConfirmation(id) {
        const confirm = window.confirm("Are you sure you want to delete this job post")
        if (!confirm)
            return;
        removeJob(id);
    }

    return (
        <>
            <Link to="/jobs" className="inline-flex pt-4 pb-2 ml-12 items-center hover:text-blue-500 transition">
                <FaArrowLeft className="mr-2"/>
                <span>Back to Job Listings</span>
            </Link>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            
            {data &&
                <div className="flex flex-col lg:flex-row py-4 px-12 gap-6">
                
                    <div className="lg:flex-[0.7]">

                        {/* Job Title ----------------------------------------------------------------------*/}
                        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                            <div>    
                                <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    {data.type}
                                </span>

                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.role}</h1>
                                
                                <div className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="mr-2" />
                                    <span>{data.state}</span>
                                </div>
                            </div>


                            <div className="mt-4 md:mt-0">
                                <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                                    Apply Now
                                </button>
                            </div>
                        </div>

                        {/* Job Description -------------------------------------------------------------------------------*/}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                            <p className="text-gray-700 mb-4">
                                {data.jobdetail}
                            </p>
                        </div>

                        <iframe
                            src={data.googlemap}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-1/2 border-0 rounded-lg"
                        />

                    </div>

                    <div className="lg:flex-[0.3]">

                        {/* Salary -------------------------------------------------------------------------------*/}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Salary</h3>
                            <p className="text-2xl font-bold text-indigo-500">{data.salary}</p>
                        </div>

                        {/* Company Detail -------------------------------------------------------------------------------*/}
                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Company Info</h2>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{data.companyname}</h3>
                            <p className="text-gray-700 mb-4">
                                {data.companydetail}
                            </p>

                            <h3 className="text-xl">Contact Email:</h3>
                            <p className="my-2 bg-indigo-100 p-2 font-bold">
                                {data.companyemail}
                            </p>

                            <h3 className="text-xl">Contact Phone:</h3>
                            <p className="my-2 bg-indigo-100 p-2 font-bold">{data.companyphone}</p>
                        </div>

                        {/* Other Action -------------------------------------------------------------------------------*/}

                        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <h3 className="text-xl font-bold mb-4">More Actions</h3>
                            <div className="flex flex-col gap-4">
                                <Link to={`/jobs-edit/${data.id}`}
                                    className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center">
                                    <FaRegEdit className="mr-2"/>
                                    Edit Job
                                </Link>
                                <button onClick={() => DeleteConfirmation(id)} 
                                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center">
                                    <MdOutlineCancel className="mr-1"/>
                                    Delete Job
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            }
            
        </>
  )
}

export default ViewJobPage