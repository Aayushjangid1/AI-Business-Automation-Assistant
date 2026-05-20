import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaChartLine,
  FaUsers,
  FaRobot,
  FaSignOutAlt,
  FaEnvelope
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";

export default function Dashboard() {

  const navigate = useNavigate();

  const API = "https://ai-business-automation-assistant-vow8.onrender.com";
  
  const [leads, setLeads] = useState([]);

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {

      navigate("/admin");

      return;
    }

    fetchLeads();

  }, []);

  // =========================
  // FETCH LEADS
  // =========================

  const fetchLeads = async () => {

    try {

      const res = await axios.get(`${API}/leads`);

      setLeads(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {

    localStorage.removeItem("admin");

    navigate("/");
  };

  // =========================
  // CHART DATA
  // =========================

  const chartData = [
    {
      name: "Leads",
      value: leads.length
    },
    {
      name: "Emails",
      value: leads.length
    },
    {
      name: "AI Chats",
      value: leads.length + 5
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex">

      {/* SIDEBAR */}

      <div className="w-[260px] bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">

        <h1 className="text-3xl font-black mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          AI Admin
        </h1>

        <div className="space-y-4">

          <div className="bg-blue-600/20 border border-blue-500/20 p-4 rounded-2xl flex items-center gap-3">

            <FaChartLine />

            Dashboard

          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">

            <FaUsers />

            Leads

          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">

            <FaRobot />

            AI Analytics

          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">

            <FaEnvelope />

            Notifications

          </div>

        </div>

        <button
          onClick={logout}
          className="mt-10 w-full bg-red-600 hover:bg-red-700 transition-all py-3 rounded-2xl flex items-center justify-center gap-2"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-6">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >

          <h1 className="text-5xl font-black mb-2">
            Admin Dashboard
          </h1>

          <p className="text-gray-400">
            Monitor AI interactions, leads and automation workflows
          </p>

        </motion.div>

        {/* ANALYTICS CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* TOTAL LEADS */}

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400 mb-2">
                  Total Leads
                </p>

                <h2 className="text-5xl font-black text-blue-400">
                  {leads.length}
                </h2>

              </div>

              <div className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30">

                <FaUsers className="text-2xl" />

              </div>

            </div>

          </motion.div>

          {/* AI REQUESTS */}

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400 mb-2">
                  AI Requests
                </p>

                <h2 className="text-5xl font-black text-cyan-400">
                  {leads.length + 12}
                </h2>

              </div>

              <div className="bg-cyan-600 p-4 rounded-2xl shadow-lg shadow-cyan-500/30">

                <FaRobot className="text-2xl" />

              </div>

            </div>

          </motion.div>

          {/* AUTOMATIONS */}

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400 mb-2">
                  Automations
                </p>

                <h2 className="text-5xl font-black text-purple-400">
                  {leads.length}
                </h2>

              </div>

              <div className="bg-purple-600 p-4 rounded-2xl shadow-lg shadow-purple-500/30">

                <FaChartLine className="text-2xl" />

              </div>

            </div>

          </motion.div>

        </div>

        {/* CHART SECTION */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Analytics Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" radius={[10, 10, 0, 0]} />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* LEADS TABLE */}

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-6">
            Recent Leads
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b border-white/10 text-gray-400">

                <th className="text-left py-4">Name</th>

                <th className="text-left py-4">Email</th>

                <th className="text-left py-4">Phone</th>

                <th className="text-left py-4">Interest</th>

                <th className="text-left py-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {leads.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-400"
                  >
                    No leads available
                  </td>

                </tr>

              ) : (

                leads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >

                    <td className="py-4">
                      {lead.name}
                    </td>

                    <td className="py-4">
                      {lead.email}
                    </td>

                    <td className="py-4">
                      {lead.phone}
                    </td>

                    <td className="py-4">
                      {lead.interest}
                    </td>

                    <td className="py-4">

                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">

                        Active

                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}