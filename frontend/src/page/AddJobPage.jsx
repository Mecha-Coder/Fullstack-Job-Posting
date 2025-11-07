import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function addJob(newJob) {
  const res = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });

  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}

function AddJobPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const [role, setRole] = useState("");
    const [type, setType] = useState("Full-Time");
    const [state, setState] = useState("");
    const [jobDetail, setJobDetail] = useState("");
    const [salary, setSalary] = useState("Under $50K");
    const [companyName, setCompanyName] = useState("");
    const [companyDetail, setCompanyDetail] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [googleMap, setGoogleMap] = useState("");
    

    const { mutate:  addJobMutation } = useMutation({
        mutationFn: (newJob) => addJob(newJob),
        onSuccess: (createdJob) => {
            toast.success("Job created successfully!");
            queryClient.invalidateQueries(["home","all"]);
            navigate(`/jobs/${createdJob.id}`);
        },
        onError: () => {
            toast.error("Failed to create job");
        },
    });

    function handleSubmit(e) {
        e.preventDefault();

        const confirm = window.confirm("Press YES to proceed")
        if (!confirm)
            return;

        addJobMutation({
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
        <section className="py-16">
            
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
                
                <h2 className="text-2xl font-bold mb-6 text-center">Add a new Job Post</h2>
                
                <form onSubmit={e=> handleSubmit(e)} className="grid grid-cols-2 gap-6">
                    
                    {/* Job Type -------------------------------------- */}
                    <div className="md:col-span-2">
                        <label className="block text-gray-700 mb-2">Job Type</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg" 
                            required
                            value={type}
                            onChange={e=> setType(e.target.value)}
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
                        onChange={e=> setJobDetail(e.target.value)}
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
                        onChange={e=> setCompanyName(e.target.value)}
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
                        onChange={e=> setState(e.target.value)}
                        />
                    </div>
                    
                    {/* Company Phone -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Company Phone</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" 
                            placeholder="555-555-555"
                            required
                            value={companyPhone}
                            onChange={e=> setCompanyPhone(e.target.value)}
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
                        onChange={e=> setCompanyEmail(e.target.value)}
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
                        onChange={e=> setCompanyDetail(e.target.value)}
                    ></textarea>
                    </div>

                    {/* Company Google Map -------------------------------------------------- */}
                    <div>
                        <label className="block text-gray-700 mb-2">Google Map Link</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32"
                        placeholder="Paste Google Maps URL"
                        required
                        value={googleMap}
                        onChange={e=> setGoogleMap(e.target.value)}
                    ></textarea>
                    </div>
                
                    <div className="md:col-span-2">
                        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                            Add Job
                        </button>
                    </div>
                </form>
            </div>

        </section>
  )
}

export default AddJobPage