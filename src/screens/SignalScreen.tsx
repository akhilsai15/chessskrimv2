import React, { useState } from "react";
import { mockChats, mockMessages } from "../lib/mock/mockData";
import { Search, Edit, MoreVertical, Phone, Video, Info } from "lucide-react";
import { motion } from "motion/react";

const SignalScreen = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);

  if (selectedChat) {
    return (
      <div className="w-full h-full bg-[#0a0a0a] flex flex-col relative z-20">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#141414]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
            >
              ←
            </button>
            <img src={selectedChat.avatar} className="w-10 h-10 rounded-full" alt="" />
            <div>
              <h3 className="font-bold">{selectedChat.name}</h3>
              <p className="text-xs text-neon-blue">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Phone size={20} className="hover:text-white cursor-pointer" />
            <Video size={20} className="hover:text-white cursor-pointer" />
            <Info size={20} className="hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => {
            const isMe = msg.senderId === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[70%] rounded-2xl p-3 ${
                    isMe 
                      ? "bg-neon-purple text-white rounded-tr-sm" 
                      : "bg-[#1f1f1f] text-gray-100 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-[10px] opacity-70 mt-1 text-right">{msg.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#141414] border-t border-white/10">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-neon-purple"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0a0a] flex flex-col p-4 md:p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">Signal</h1>
        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <Edit size={20} className="text-white" />
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search signals..." 
          className="w-full bg-[#141414] border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-neon-purple text-white"
        />
      </div>

      <div className="space-y-2">
        {mockChats.map((chat, idx) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedChat(chat)}
            className="flex items-center p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
          >
            <div className="relative shrink-0">
              <img src={chat.avatar} className="w-14 h-14 rounded-full border border-white/10" alt="" />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-purple rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold">
                  {chat.unread}
                </div>
              )}
            </div>
            
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-white truncate">{chat.name}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap">{chat.time}</span>
              </div>
              <p className={`text-sm truncate ${chat.unread > 0 ? "text-white font-medium" : "text-gray-400"}`}>
                {chat.msg}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SignalScreen;
