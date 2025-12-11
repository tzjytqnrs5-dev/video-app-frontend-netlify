import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import './index.css'

// --- General Pages ---
import Home from '@/pages/Home.jsx' // <-- Use Alias
import NotFound from '@/pages/NotFound.jsx' // <-- Use Alias

// --- Workshop Pages ---
import Workshop from '@/pages/Workshop.jsx' // <-- Use Alias
import Templates from '@/pages/Templates.jsx' // <-- Use Alias
import Template2 from '@/pages/Template2.jsx' // <-- Use Alias
import MyVideos from '@/pages/MyVideos.jsx' // <-- Use Alias (and new import)

// --- Main Router Definition ---
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
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
