import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom'
import './index.css'

// --- General Pages ---
import Home from './pages/Home.jsx' // <-- Reverted path
import NotFound from './pages/NotFound.jsx' // <-- Reverted path

// --- Workshop Pages ---
import Workshop from './pages/Workshop.jsx' // <-- Reverted path
import Templates from './pages/Templates.jsx' // <-- Reverted path
import Template2 from './pages/Template2.jsx' // <-- Reverted path
import MyVideos from './pages/MyVideos.jsx' // <-- Reverted path (and new import)

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
