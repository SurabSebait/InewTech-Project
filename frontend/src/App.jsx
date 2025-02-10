import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CustomerTable from "./components/CustomerTable";
import CustomerForm from "./components/CustomerForm";
import CustomerDetails from "./components/CustomerDetails";
import Home from "./components/Home";

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <Router>
            <div className="min-h-screen flex bg-gray-50">
                {/* Mobile Overlay */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 md:hidden z-20"
                        onClick={toggleSidebar}
                    />
                )}

                {/* Fixed Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
                >
                    <Sidebar onClose={() => setIsSidebarOpen(false)} />
                </div>

                {/* Main Content */}
                <div className={`flex-1 ${isSidebarOpen ? "md:ml-72" : "ml-0"}`}>
                    {/* Top Bar - Reduced height */}
                    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                        <div className="h-12 px-4 flex items-center"> {/* Reduced from h-16 to h-12 */}
                            <button
                                onClick={toggleSidebar}
                                className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content Area - Reduced padding */}
                    <div className="p-3 md:p-4"> {/* Reduced from p-4 md:p-6 to p-3 md:p-4 */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/customers" element={<CustomerTable />} />
                            <Route path="/add" element={<CustomerForm />} />
                            <Route path="/edit/:id" element={<CustomerForm />} />
                            <Route path="/customer/:id" element={<CustomerDetails />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
