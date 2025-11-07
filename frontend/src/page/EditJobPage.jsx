import {useState} from "react"
import {Link, useParams, useNavigate} from "react-router-dom"
import {FaArrowLeft} from "react-icons/fa"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function updateJob(id, newData) {
    const res = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newData),
    });

    if (!res.ok) throw new Error("");
    return (newData);
}

function EditJobPage() {
    const {id} = useParams();
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(["single", id]);
    const navigate = useNavigate();

    if (!data) return <p className="text-center mt-10">Loading job data...</p>;

    const [role, setRole] = useState(data.role);
    const [type, setType] = useState(data.type);
    const [state, setState] = useState(data.state);
    const [jobDetail, setJobDetail] = useState(data.jobdetail);
    const [salary, setSalary] = useState(data.salary);
    const [companyName, setCompanyName] = useState(data.companyname);
    const [companyDetail, setCompanyDetail] = useState(data.companydetail);
    const [companyEmail, setCompanyEmail] = useState(data.companyemail);
    const [companyPhone, setCompanyPhone] = useState(data.companyphone);
    const [googleMap, setGoogleMap] = useState(data.googlemap);

    const {mutate:  updateJobMutation, isPending} = useMutation({
        mutationFn: (updatedData) => updateJob(id, updatedData),
        onSuccess: (newData) => {
            toast.success("Job successfully updated");

            // Update local cache
            queryClient.setQueryData(["single", id], newData);
            // Optionally invalidate jobs list
            queryClient.invalidateQueries(["jobs"]);

            navigate(`/jobs/${id}`);
        },
        onError: ()=> {toast.error("Failed to update job");}
    });

    function handleSubmit(e) {
        e.preventDefault();

        const confirm = window.confirm("Are you sure you want to save changes")
        if (!confirm)
            return;

        updateJobMutation({
            role,
            type,
            state,
            jobDetail,
            salary,
            companyName,
            companyDetail,
            companyEmail,
            companyPhone,
            googleMap,
        });
    }

  return (
    <>
        <Link to={`/jobs/${id}`} className="inline-flex pt-4 pb-2 ml-12 items-center hover:text-blue-500 transition">
            <FaArrowLeft className="mr-2"/>
            <span>Back to Job Details</span>
        </Link>
    
        <section className="py-16">
        
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
                
                <h2 className="text-2xl font-bold mb-6 text-center">{`Edit Job Post id ${id}`}</h2>
                
                <form onSubmit={e=> handleSubmit(e)} className="grid grid-cols-2 gap-6">
                    
                    {/* Job Type -------------------------------------- */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Job Type</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg" 
                            required
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option>Full-Time</option>
                            <option>Part-Time</option>
                            <option>Contract</option>
                            <option>Internship</option>
                        </select>
                    </div>
                    
                    {/* Job Title -------------------------------------- */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Job Title</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" 
                        placeholder="e.g. Product Manager"
                        type="text" 
                        required
                        value={role}
                        onChange={e=> setRole(e.target.value)}
                    />
                    </div>
                    
                    {/* Job Salary -------------------------------------- */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Salary</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                            value={salary}
                            onChange={e=> setSalary(e.target.value)}
                        >
                            <option>Under $50K</option>
                            <option>$50K - $80K</option>
                            <option>$80K - $120K</option>
                            <option>Over $120K</option>
                        </select>
                    </div>

                    {/* Job Detail -------------------------------------- */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Job Description</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32"
                        placeholder="e.g. Duties, Responsibilities"  
                        required
                        value={jobDetail}
                        onChange={e => setJobDetail(e.target.value)}
                    ></textarea>
                    </div>
                    
                    {/* Company Name -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Company Name</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Company Name"
                        type="text"
                        required
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                    />
                    </div>

                    {/* Company Location -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Location</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" 
                        placeholder="Company Location" 
                        type="text"
                        required
                        value={state}
                        onChange={e => setState(e.target.value)}
                        />
                    </div>
                    
                    {/* Company Phone -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Company Phone</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" 
                            placeholder="555-555-555"
                            required
                            value={companyPhone}
                            onChange={e => setCompanyPhone(e.target.value)}
                            type="tel"
                        />
                    </div>

                    {/* Company Address -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Company Email</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="company@domain-name.com"
                        required
                        value={companyEmail}
                        onChange={e => setCompanyEmail(e.target.value)}
                        type="email"
                    />
                    </div>
            
                    {/* About Company -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">About Company</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32"
                        placeholder="What does your company do?"
                        required
                        value={companyDetail}
                        onChange={e => setCompanyDetail(e.target.value)}
                    ></textarea>
                    </div>

                    {/* Company Google Map -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Google Map Link</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32"
                        placeholder="What does your company do?"
                        required
                        value={googleMap}
                        onChange={e => setGoogleMap(e.target.value)}
                    ></textarea>
                    </div>
                
                    <div className="md:col-span-2">
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
   
    </section>
    </>
  )
}

export default EditJobPage