import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// NEW IMPORTS: Required for TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

// NEW: Define a new QueryClient instance
const queryClient = new QueryClient(); 

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* NEW WRAPPER: Wrapping the App with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
)