import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ToastContainer, Slide} from 'react-toastify';

import App from './App.jsx'
import HomePage from "./page/HomePage";
import AddJobPage from "./page/AddJobPage.jsx";
import ViewJobPage from "./page/ViewJobPage";
import ShowJobPage from "./page/ShowJobPage.jsx";
import EditJobPage from './page/EditJobPage.jsx';
import NotFoundPage from './page/NotFoundPage.jsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,   // Layout component with <Outlet />
        children: [
            {index: true, element: <HomePage/>},
            {path: "jobs", element: <ShowJobPage />},
            {path: "jobs/:id", element: <ViewJobPage />},
            {path: "jobs-add", element: <AddJobPage />},
            {path: "jobs-edit/:id", element: <EditJobPage />},
            {path: "*", element: <NotFoundPage />,}
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
                transition={Slide}
            />
        </QueryClientProvider>
    </StrictMode>,
)
