import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function JobCard({job}) {
  return (
    <div className="bg-white p-6 rounded-xl border-black border-2 shadow-blue-300 hover:shadow-xl transition">

        <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            {job.type}
        </div>

        <h3 className="text-xl font-bold mb-2">
            {job.role}
        </h3>

        <div className="flex items-center text-gray-600 mb-3 gap-2">
            <FaBuilding />
            <span>{job.companyname}</span>
        </div>

        <p className="text-gray-600 mb-4">
            {(job.jobdetail).substring(0, 90) + "..."}
        </p>

        <div className="flex justify-between items-center mb-4">
            <div className="font-semibold">{job.salary}</div>
            <div className="flex items-center text-gray-600 gap-2">
                <FaMapMarkerAlt />
                <span>{job.state}</span>
            </div>
        </div>

        <Link to={`/jobs/${job.id}`} 
            className="block bg-blue-700 text-white py-2 rounded-lg text-center font-medium hover:bg-blue-500 transition">
            Read More
        </Link>

    </div>
  )
}

export default JobCard
