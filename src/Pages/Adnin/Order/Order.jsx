import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaShoppingCart,
  FaCheckCircle,
  FaEdit,
} from 'react-icons/fa';
import OrderTable from './OrderTable';

const Order = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-orders`,
        );
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    getOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const status = order.status || 'pending';
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    const matchesSearch =
      (order._id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.userEmail || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Name, or Email..."
              className="w-full pl-10 pr-3 py-2 border rounded"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              className="border rounded px-3 py-2"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Update</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <OrderTable
                    key={order._id}
                    order={order}
                    setOrders={setOrders}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-600">
                    No orders found...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
