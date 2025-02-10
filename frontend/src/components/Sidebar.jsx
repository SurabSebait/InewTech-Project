import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsHouseDoor, BsBarChart, BsBoxSeam, BsGrid, BsPeople, BsFileText, BsBuildings } from "react-icons/bs";

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: "Home", path: "/", icon: <BsHouseDoor className="w-5 h-5" /> },
        { name: "Reports", path: "/reports", icon: <BsBarChart className="w-5 h-5" /> },
        { name: "Inventory & Stock", path: "/inventory", icon: <BsBoxSeam className="w-5 h-5" /> },
    ];

    const dashboards = [
        { name: "Item Master", icon: <BsGrid className="w-5 h-5" /> },
        { name: "Customer Order", icon: <BsPeople className="w-5 h-5" /> },
        { name: "Production Plan", icon: <BsFileText className="w-5 h-5" /> },
        { name: "Packaging Plan", icon: <BsBoxSeam className="w-5 h-5" /> },
        { name: "Purchase Order", icon: <BsFileText className="w-5 h-5" /> },
        { name: "Analytical Reports", icon: <BsBarChart className="w-5 h-5" /> },
        { name: "Invoices", icon: <BsFileText className="w-5 h-5" /> },
        { name: "Records", icon: <BsGrid className="w-5 h-5" /> },
        { name: "Sample Stock Transfer", icon: <BsBoxSeam className="w-5 h-5" /> },
        { name: "Customers", icon: <BsPeople className="w-5 h-5" /> },
        { name: "Supplier", icon: <BsBuildings className="w-5 h-5" /> },
        { name: "My Organization", icon: <BsBuildings className="w-5 h-5" /> },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <div className="flex flex-col h-screen w-72 bg-white border-r border-gray-200 shadow-lg">
            {/* Fixed Header */}
            <div className="flex-none p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                    <div className="transition-all duration-300 ease-in-out transform hover:scale-105">
                        <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Inventech
                        </h2>
                        <a 
                            href="https://www.inewtech.in/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        >
                            Inew Technologies
                        </a>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Scrollable Navigation */}
            <nav className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {/* Main Menu */}
                <div className="p-4 space-y-1">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-all duration-300 ease-in-out ${
                                location.pathname === item.path
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                                    : "text-gray-700 hover:bg-blue-50"
                            }`}
                        >
                            <span className="mr-2.5">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Dashboards */}
                <div className="p-4">
                    <h6 className="px-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Dashboards
                    </h6>
                    <div className="space-y-1">
                        {dashboards.map((item, index) => {
                            const path = `/${item.name.toLowerCase().replace(/\s+/g, "-")}`;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleNavigation(path)}
                                    className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-all duration-300 ease-in-out ${
                                        location.pathname === path
                                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                                            : "text-gray-700 hover:bg-blue-50"
                                    }`}
                                >
                                    <span className="mr-2.5">{item.icon}</span>
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;