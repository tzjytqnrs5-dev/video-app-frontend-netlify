import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import './index.css'

// --- General Pages ---
import Home from '@/pages/Home.jsx' 
import NotFound from '@/pages/NotFound.jsx' // <-- RE-ADDED: Import the new component

// --- Workshop Pages ---
import Workshop from '@/pages/Workshop.jsx' 
import Templates from '@/pages/Templates.jsx' 
import Template2 from '@/pages/Template2.jsx' 
import MyVideos from '@/pages/MyVideos.jsx' 

// --- Main Router Definition ---
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />, // <-- RE-ADDED: Use the component for errors
  },
  {
    path: '/workshop',
    element: <Workshop />,
  },
  {
    path: '/workshop/templates',
    element: <Templates />,
  },
  {
    path: '/workshop/templates/:templateId',
    element: <Template2 />,
  },
  {
    path: '/workshop/my-videos', 
    element: <MyVideos />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />, 
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
