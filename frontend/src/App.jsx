import {NavLink, Link, Outlet} from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  return (
    <>
        <ScrollToTop />

        {/* Header Section --------------------------------------------- */}
        <header className="flex flex-col items-center bg-white sticky top-0 z-50 px-8 py-4 gap-4 sm:flex-row sm:justify-between">

            <Link className="flex items-center text-blue-500 font-bold">
                <FaBriefcase className="text-3xl mr-2"/>
                <span className="text-2xl">SeekJobs</span>
            </Link>

            <nav className="flex gap-6 text-gray-500 font-bold text-lg items-center">
                <NavLink to="/"         className={({isActive}) => isActive? "text-blue-500" : "hover:text-black"}>Home</NavLink>
                <NavLink to="/jobs"     className={({isActive}) => isActive? "text-blue-500" : "hover:text-black"}>Browse</NavLink>
                <NavLink to="/jobs-add" className={({isActive}) => isActive? "text-blue-500" : "hover:text-black"}>Add</NavLink>
            </nav>

        </header>

        <main className="min-h-[90vh]">
            <Outlet />
        </main>
        
        
        {/* Footer Section --------------------------------------------- */}
        <footer className="bg-gray-800 text-white py-8 px-12 flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div className="">
                <div className="flex items-center mb-2">
                    <FaBriefcase className="text-2xl mr-2"/>
                    <span className="text-xl font-bold">SeekJobs</span>
                </div>
                
                <div>&copy; 2025 SeekJobs. All rights reserved.</div>
            </div>
                    
            <div className="">
                <h3 className="text-xl font-bold mb-2">
                    Contact Us
                </h3>
                <p>contact@seekjobs.com</p>
                <p>+60-1531232</p>
                <p>123 Tech Street, Kuala Lumpur</p>
            </div>
       
        </footer>
    </>
  )
}

export default App;