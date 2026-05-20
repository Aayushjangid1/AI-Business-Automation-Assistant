import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import {
  FaRobot,
  FaUserShield,
  FaPaperPlane,
  FaUserTie
} from "react-icons/fa";

export default function Home() {

  const navigate = useNavigate();

  const API = "https://ai-business-automation-assistant-vow8.onrender.com";

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    interest: ""
  });

  // =========================
  // CHATBOT
  // =========================

  const sendMessage = async () => {

    if (!message) return;

    const userMessage = {
      type: "user",
      text: message
    };

    setChat(prev => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await axios.post(`${API}/chat`, {
        message
      });

      const botMessage = {
        type: "bot",
        text: res.data.response
      };

      setChat(prev => [...prev, botMessage]);

    } catch (error) {

      console.log(error);

    }

    setMessage("");

    setLoading(false);
  };

  // =========================
  // LEAD FORM
  // =========================

  const handleChange = (e) => {

    setLead({
      ...lead,
      [e.target.name]: e.target.value
    });
  };

  const submitLead = async () => {

    try {

      await axios.post(`${API}/lead`, lead);

      alert("Lead Submitted Successfully");

      setLead({
        name: "",
        email: "",
        phone: "",
        interest: ""
      });

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }
  };

  return (

    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="glow glow1"></div>
        <div className="glow glow2"></div>
        <div className="glow glow3"></div>

      {/* NAVBAR */}

      <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

          <div>

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              AI Business Assistant
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Smart Automation & AI Lead Management Platform
            </p>

          </div>

          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/30"
          >

            <FaUserShield />

            ADMIN

          </button>

        </div>

      </div>

      {/* HERO SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <motion.div
             initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="text-center mb-16 relative z-10"
        >

          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">

            <span className="text-blue-300 text-sm">
              AI-Powered Automation System
            </span>

          </div>

          <h1 className="text-6xl font-black leading-tight mb-6">

            Transform Business
            <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
              With AI Automation
            </span>

          </h1>

          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">

            Intelligent chatbot, lead management,
            workflow automation and real-time admin dashboard
            in one modern AI platform.

          </p>

        </motion.div>

        {/* MAIN GRID */}

        <div className="space-y-10">

          {/* CHATBOT */}

          <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-blue-600 p-3 rounded-2xl">

                <FaRobot className="text-2xl" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  AI Assistant
                </h2>

                <p className="text-gray-400 text-sm">
                  Ask business or course-related questions
                </p>

              </div>

            </div>

            

            {/* CHAT AREA */}

            <div className="h-[450px] overflow-y-auto bg-black/20 rounded-2xl p-4 mb-4 border border-white/5">

              {chat.length === 0 && (

                <div className="h-full flex items-center justify-center text-center">

                  <div>

                    <FaRobot className="text-5xl text-blue-400 mx-auto mb-4" />

                    <p className="text-gray-400">
                      Start conversation with AI Assistant
                    </p>

                  </div>

                </div>

              )}

              {chat.map((msg, index) => (

                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-lg ${
                      msg.type === "user"
                        ? "bg-blue-600 rounded-br-sm"
                        : "bg-slate-700 rounded-bl-sm"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>

              ))}

              {loading && (

                <div className="flex justify-start">

                  <div className="bg-slate-700 px-5 py-3 rounded-2xl">

                    <div className="flex gap-1">

                        <span className="animate-bounce">•</span>
                         <span className="animate-bounce delay-100">•</span>
                        <span className="animate-bounce delay-200">•</span>

                    </div>

                  </div>

                </div>

              )}

            </div>

            {/* INPUT */}

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30"
              >

                <FaPaperPlane />

              </button>

            </div>

          </div>

          {/* LEAD FORM */}

          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex items-center gap-3 mb-6">

              <div className="bg-purple-600 p-3 rounded-2xl">

                <FaUserTie className="text-2xl" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Contact & Lead Form
                </h2>

                <p className="text-gray-400 text-sm">
                  Capture leads with automated workflow
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-blue-500"
                value={lead.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-blue-500"
                value={lead.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-blue-500"
                value={lead.phone}
                onChange={handleChange}
              />

              <input
                type="text"
                name="interest"
                placeholder="Interested In"
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:border-blue-500"
                value={lead.interest}
                onChange={handleChange}
              />

              <button
                onClick={submitLead}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl font-bold shadow-xl"
              >
                Submit Lead
              </button>

            </div>

            {/* FEATURES */}

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-black/20 rounded-2xl p-4 border border-white/5">

                <h3 className="font-bold text-blue-400">
                  AI Chatbot
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Smart AI responses using GROQ API
                </p>

              </div>

              <div className="bg-black/20 rounded-2xl p-4 border border-white/5">

                <h3 className="font-bold text-purple-400">
                  Automation
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  Automated lead notifications via Resend
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}