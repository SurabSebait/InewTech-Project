import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import * as XLSX from 'xlsx';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
                await axios.delete(`http://localhost:5000/customers/${id}`);
                fetchCustomers();
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    const exportToExcel = async () => {
        try {
            setIsExporting(true);
            
            // Prepare the data for export
            const exportData = customers.map(customer => ({
                'ID': customer.id,
                'Name': customer.name,
                'Contact Person': customer.contact_person,
                'Contact': customer.contact,
                'WhatsApp': customer.whatsapp,
                'Email': customer.email,
                'Address': customer.address,
                'City': customer.city,
                'State': customer.state,
                'Pin Code': customer.pin_code,
                'GST No': customer.gst_no,
                'PAN No': customer.pan_no
            }));

            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(exportData);

            // Create workbook
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');

            // Style the worksheet
            const columnWidths = [
                { wch: 5 },  // ID
                { wch: 30 }, // Name
                { wch: 20 }, // Contact Person
                { wch: 15 }, // Contact
                { wch: 15 }, // WhatsApp
                { wch: 30 }, // Email
                { wch: 40 }, // Address
                { wch: 15 }, // City
                { wch: 15 }, // State
                { wch: 10 }, // Pin Code
                { wch: 20 }, // GST No
                { wch: 15 }  // PAN No
            ];

            worksheet['!cols'] = columnWidths;

            // Add header style
            const range = XLSX.utils.decode_range(worksheet['!ref']);
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const address = XLSX.utils.encode_col(C) + "1";
                if (!worksheet[address]) continue;
                worksheet[address].s = {
                    font: { bold: true },
                    fill: { fgColor: { rgb: "EFEFEF" } },
                    alignment: { horizontal: "center" }
                };
            }

            // Generate filename with current date
            const currentDate = new Date().toISOString().split('T')[0];
            const fileName = `customers_${currentDate}.xlsx`;

            // Save file
            XLSX.writeFile(workbook, fileName);
        } catch (error) {
            console.error("Error exporting to Excel:", error);
        } finally {
            setIsExporting(false);
        }
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to determine if Actions column should be shown
    const showActions = windowWidth >= 1024; // Hide actions column below 1024px

    return (
        <div className="flex-1 h-screen overflow-hidden">
            <div className="h-full px-4 lg:px-8 max-w-full mx-auto bg-white flex flex-col">
                {/* Header Section */}
                <div className="flex-none px-4 py-4 border-b border-gray-200">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Customers
                </h2>
                </div>

                {/* Search and Buttons */}
                <div className="flex-none px-4 py-4 space-y-4 lg:space-y-0 lg:flex lg:justify-between lg:items-center border-b border-gray-200">
                    <div className="relative w-full lg:w-1/2">
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <span className="absolute right-4 top-2.5 text-gray-400">🔍</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate("/add")}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm lg:text-base rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            Add Customer
                        </button>
                        <button
                            onClick={exportToExcel}
                            disabled={isExporting}
                            className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm lg:text-base rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                isExporting ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isExporting ? 'Exporting...' : 'Export Excel'}
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="flex-1 overflow-hidden">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block h-full overflow-y-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Contact Person</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Contact</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">City</th>
                                    {showActions && (
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer"
                                        onClick={() => navigate(`/customer/${customer.id}`)}
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-900">{customer.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{customer.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{customer.contact_person}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{customer.contact}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{customer.email}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{customer.city}</td>
                                        {showActions && (
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/edit/${customer.id}`);
                                                        }}
                                                        className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                                                    >
                                                        <FiEdit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(customer.id);
                                                        }}
                                                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="block lg:hidden h-full overflow-y-auto px-4 py-2 space-y-4">
                        {filteredCustomers.map((customer) => (
                            <div
                                key={customer.id}
                                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102"
                                onClick={() => navigate(`/customer/${customer.id}`)}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/edit/${customer.id}`);
                                            }}
                                            className="p-1.5 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(customer.id);
                                            }}
                                            className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">ID:</span> {customer.id}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Contact Person:</span> {customer.contact_person}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Contact:</span> {customer.contact}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Email:</span> {customer.email}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">City:</span> {customer.city}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;