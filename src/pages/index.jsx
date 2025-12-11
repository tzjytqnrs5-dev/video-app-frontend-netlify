import Layout from "./Layout.jsx";

import Home from "./Home";

import Templates from "./Templates";

import Intro from "./Intro";

import Workshop from "./Workshop";

import Preview from "./Preview";

import Tools from "./Tools";

import Plans from "./Plans";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Templates: Templates,
    
    Intro: Intro,
    
    Workshop: Workshop,
    
    Preview: Preview,
    
    Tools: Tools,
    
    Plans: Plans,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Templates" element={<Templates />} />
                
                <Route path="/Intro" element={<Intro />} />
                
                <Route path="/Workshop" element={<Workshop />} />
                
                <Route path="/Preview" element={<Preview />} />
                
                <Route path="/Tools" element={<Tools />} />
                
                <Route path="/Plans" element={<Plans />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}