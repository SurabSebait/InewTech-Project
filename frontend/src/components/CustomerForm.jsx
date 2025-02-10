import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        name: "", contact: "", email: "", contact_person: "", whatsapp: "",
        address: "", city: "", state: "", pin_code: "", gst_no: "", pan_no: ""
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/customers/${id}`)
                .then(response => setCustomer(response.data))
                .catch(error => console.error("Error fetching customer:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:5000/customers/${id}`, customer);
            } else {
                await axios.post("http://localhost:5000/customers", customer);
            }
            navigate("/customers");
        } catch (error) {
            console.error("Error saving customer:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-4 lg:mt-4 py-6 px-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{id ? "Edit" : "Add"} Customer</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700">Name</label>
                        <input type="text" name="name" value={customer.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Contact</label>
                        <input type="text" name="contact" value={customer.contact} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700">Email</label>
                        <input type="email" name="email" value={customer.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Contact Person</label>
                        <input type="text" name="contact_person" value={customer.contact_person} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700">WhatsApp</label>
                        <input type="text" name="whatsapp" value={customer.whatsapp} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Address</label>
                        <input type="text" name="address" value={customer.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700">City</label>
                        <input type="text" name="city" value={customer.city} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">State</label>
                        <input type="text" name="state" value={customer.state} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">Pin Code</label>
                        <input type="text" name="pin_code" value={customer.pin_code} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold text-gray-700">GST No</label>
                        <input type="text" name="gst_no" value={customer.gst_no} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                    <div>
                        <label className="block font-semibold text-gray-700">PAN No</label>
                        <input type="text" name="pan_no" value={customer.pan_no} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200" />
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button type="submit" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300">
                        Save
                    </button>
                    <button type="button" className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition duration-300" onClick={() => navigate("/customers")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
