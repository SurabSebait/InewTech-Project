// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { BsPersonCircle, BsSearch, BsArrowLeft } from "react-icons/bs";
// import axios from "axios";

// const CustomerDetails = () => {
//   const [customer, setCustomer] = useState({
//     name: "", contact: "", email: "", contact_person: "", whatsapp: "",
//     address: "", city: "", state: "", pin_code: "", gst_no: "", pan_no: ""
//   });
//   const [purchases, setPurchase] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     fetchCustomer();
//     fetchPurchase();
//   }, []);

//   const fetchCustomer = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/customers/${id}`);
//       setCustomer(response.data);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//     }
//   };

//   const fetchPurchase = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/purchases/${id}`);
//       setPurchase(response.data);
//     } catch (error) {
//       console.error("Error fetching purchases:", error);
//     }
//   };

//   const handleDelete = async (customerId) => {
//     if (window.confirm("Are you sure you want to delete this customer?")) {
//       try {
//         await axios.delete(`http://localhost:5000/customers/${customerId}`);
//         navigate("/customers");
//       } catch (error) {
//         console.error("Error deleting customer:", error);
//       }
//     }
//   };

//   const purchaseDelete = async (purchaseId) => {
//     if (window.confirm("Are you sure you want to delete this purchase?")) {
//       try {
//         await axios.delete(`http://localhost:5000/purchases/${purchaseId}`);
//         // Refresh purchase list after deletion
//         fetchPurchase();
//       } catch (error) {
//         console.error("Error deleting purchase:", error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
//       {/* Back Button - Mobile Only */}
//       <button
//         onClick={() => navigate("/customers")}
//         className="md:hidden flex items-center text-gray-600 mb-4 hover:text-gray-800 transition-colors"
//       >
//         <BsArrowLeft className="w-5 h-5 mr-2" />
//         Back to Customers
//       </button>

//       {/* Main Content */}
//       <div className="space-y-6">
//         {/* Customer Header Card */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="flex items-center gap-4">
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <BsPersonCircle className="w-8 h-8 text-blue-600" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">{customer.name || 'Customer Details'}</h1>
//                 <p className="text-gray-500">ID: {id}</p>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//               <button
//                 onClick={() => navigate(`/edit/${id}`)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto"
//               >
//                 Edit Details
//               </button>
//               <button
//                 onClick={() => handleDelete(id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 w-full sm:w-auto"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Customer Information Grid */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {Object.entries(customer).map(([key, value]) => (
//               key !== 'name' && (
//                 <div key={key} className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600 capitalize">
//                     {key.replace(/_/g, ' ')}
//                   </label>
//                   <input
//                     type="text"
//                     value={value}
//                     readOnly
//                     className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
//                   />
//                 </div>
//               )
//             ))}
//           </div>
//         </div>

//         {/* Purchase History Section */}
//         <div className="bg-white rounded-xl shadow-sm p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Purchase History</h2>
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 placeholder="Search purchases..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//               <BsSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product Name</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
//                   <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium text-gray-600">Purchase Date</th>
//                   <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {purchases
//                   .filter((p) => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
//                   .map((p) => (
//                     <tr key={p.id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3 text-sm text-gray-700">{p.id}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{p.product_name}</td>
//                       <td className="px-4 py-3 text-sm text-gray-700">{p.amount}</td>
//                       <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">{p.purchase_date}</td>
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => purchaseDelete(p.id)}
//                           className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Back Button - Desktop Only */}
//         <button
//           onClick={() => navigate("/customers")}
//           className="hidden md:flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//         >
//           <BsArrowLeft className="w-5 h-5 mr-2" />
//           Back to Customers
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails; 

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPersonCircle, BsSearch, BsArrowLeft, BsDownload } from "react-icons/bs";
import axios from "axios";
import * as XLSX from 'xlsx';

const CustomerDetails = () => {
  const [customer, setCustomer] = useState({
    name: "", contact: "", email: "", contact_person: "", whatsapp: "",
    address: "", city: "", state: "", pin_code: "", gst_no: "", pan_no: ""
  });
  const [purchases, setPurchase] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCustomer();
    fetchPurchase();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchPurchase = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/purchases/${id}`);
      setPurchase(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:5000/customers/${customerId}`);
        navigate("/customers");
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const purchaseDelete = async (purchaseId) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      try {
        await axios.delete(`http://localhost:5000/purchases/${purchaseId}`);
        fetchPurchase();
      } catch (error) {
        console.error("Error deleting purchase:", error);
      }
    }
  };

  const exportToExcel = () => {
    // Filter purchases based on search term
    const filteredPurchases = purchases.filter((p) => 
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Prepare the data for export
    const exportData = filteredPurchases.map(purchase => ({
      'Purchase ID': purchase.id,
      'Product Name': purchase.product_name,
      'Price': purchase.amount,
      'Purchase Date': purchase.purchase_date
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Purchases');

    // Generate filename with customer name and current date
    const fileName = `${customer.name}_purchases_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Back Button - Mobile Only */}
      <button
        onClick={() => navigate("/customers")}
        className="md:hidden flex items-center text-gray-600 mb-4 hover:text-gray-800 transition-colors"
      >
        <BsArrowLeft className="w-5 h-5 mr-2" />
        Back to Customers
      </button>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Customer Header Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BsPersonCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{customer.name || 'Customer Details'}</h1>
                <p className="text-gray-500">ID: {id}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={() => navigate(`/edit/${id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto"
              >
                Edit Details
              </button>
              <button
                onClick={() => handleDelete(id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Customer Information Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(customer).map(([key, value]) => (
              key !== 'name' && (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600 capitalize">
                    {key.replace(/_/g, ' ')}
                  </label>
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
                  />
                </div>
              )
            ))}
          </div>
        </div>

        {/* Purchase History Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Purchase History</h2>
              <button
                onClick={exportToExcel}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <BsDownload className="w-4 h-4 mr-2" />
                Export Excel
              </button>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search purchases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <BsSearch className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium text-gray-600">Purchase Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {purchases
                  .filter((p) => p.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-700">{p.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.product_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{p.amount}</td>
                      <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-700">{p.purchase_date}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => purchaseDelete(p.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button - Desktop Only */}
        <button
          onClick={() => navigate("/customers")}
          className="hidden md:flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <BsArrowLeft className="w-5 h-5 mr-2" />
          Back to Customers
        </button>
      </div>
    </div>
  );
};

export default CustomerDetails;