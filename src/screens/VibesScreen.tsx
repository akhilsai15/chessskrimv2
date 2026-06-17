import React, { useState, useRef } from "react";
import { mockReels } from "../lib/mock/mockData";
import { Heart, MessageCircle, Share2, Music } from "lucide-react";

const VibesScreen = () => {
  const [currentVibeIndex, setCurrentVibeIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const index = Math.round(el.scrollTop / el.clientHeight);
    if (index !== currentVibeIndex) {
      setCurrentVibeIndex(index);
    }
  };

  return (
    <div className="w-full h-full bg-black relative">
      <div 
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        onScroll={handleScroll}
      >
        {mockReels.map((reel, idx) => (
          <div 
            key={reel.id} 
            className="w-full h-full snap-start relative flex items-center justify-center bg-[#0a0a0a]"
          >
            <img 
              src={reel.videoImageHover} 
              alt={reel.caption} 
              className="absolute inset-0 w-full h-full object-cover opacity-80" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent" />
            
            {/* Main Content */}
            <div className="absolute bottom-20 lg:bottom-10 left-4 right-16 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img src={reel.avatar} alt={reel.handle} className="w-12 h-12 rounded-full border-2 border-white/20" />
                <div>
                  <h3 className="text-white font-bold text-lg">{reel.user}</h3>
                  <p className="text-white/80 text-sm">{reel.handle}</p>
                </div>
              </div>
              <p className="text-white text-base max-w-sm whitespace-pre-wrap">{reel.caption}</p>
              <div className="flex items-center gap-2 text-white/70 bg-black/40 px-3 py-1.5 rounded-full w-max backdrop-blur-md">
                <Music size={14} className="animate-spin-slow" />
                <span className="text-xs font-medium">{reel.audio}</span>
              </div>
            </div>

            {/* Right sidebar actions */}
            <div className="absolute bottom-20 lg:bottom-10 right-4 flex flex-col gap-6 items-center">
              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:text-neon-purple transition-colors">
                  <Heart size={24} />
                </div>
                <span className="text-white font-medium text-xs">{reel.pulseCount}</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:text-neon-blue transition-colors">
                  <MessageCircle size={24} />
                </div>
                <span className="text-white font-medium text-xs">{reel.comments}</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white group-hover:text-green-400 transition-colors">
                  <Share2 size={24} />
                </div>
                <span className="text-white font-medium text-xs">{reel.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VibesScreen;
