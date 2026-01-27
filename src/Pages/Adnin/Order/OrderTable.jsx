import axios from 'axios';
import React, { useState } from 'react';
import { FaShoppingCart, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const OrderTable = ({ order, setOrders }) => {
  const safeStatus = order.status || 'pending';
  const [newStatus, setNewStatus] = useState(safeStatus);

  const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-order/${order._id}`,
        {
          status: newStatus,
        },
      );

      setOrders(prev =>
        prev.map(o => (o._id === order._id ? { ...o, status: newStatus } : o)),
      );
      toast.success('Status Updated ✅');
    } catch (err) {
      toast.error('Update Failed ❌');
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3">
        <img src={order.productImage} className="w-14 h-14 rounded" alt="" />
      </td>

      <td className="p-3">{order.userName}</td>
      <td className="p-3">{order.userAddress}</td>
      <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
      <td className="p-3">৳{(Number(order.price) + 120).toLocaleString()}</td>
      <td className="p-3">{order.userPhone}</td>

      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-sm ${statusStyles[safeStatus]}`}
        >
          {safeStatus}
        </span>
      </td>

      <td className="p-3 flex gap-2">
        <select
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="delivered">Delivered</option>
        </select>

        <button
          onClick={handleUpdate}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default OrderTable;
