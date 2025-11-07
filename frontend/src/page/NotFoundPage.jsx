import {Link} from "react-router-dom"
import { FaExclamationTriangle } from 'react-icons/fa';

function NotFoundPage() {
  return (
     <section className='text-center flex flex-col justify-center items-center h-96'>
        
        <FaExclamationTriangle className='text-yellow-400 text-6xl mb-4' />
        
        <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
        <p className='text-xl mb-5'>This page does not exist</p>
        
        <Link to="/" 
            className="block bg-blue-700 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-500 transition">
            Go Back
        </Link>
    </section>
  )
}

export default NotFoundPage