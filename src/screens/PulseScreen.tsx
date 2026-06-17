import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { motion, AnimatePresence } from "motion/react";
import { mockPosts, mockSparks, SKRIM_REACTIONS } from "../lib/mock/mockData";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { SparkRow } from "../components/SparkRow";
import { SparkCreator } from "../components/SparkCreator";
import { SparkViewer } from "../components/SparkViewer";

export default function PulseScreen() {
  const [posts, setPosts] = useState<any[]>(mockPosts);
  const { user } = useAuthStore();
  const [isSparkCreatorOpen, setIsSparkCreatorOpen] = useState(false);
  const [activeHighlightGroup, setActiveHighlightGroup] = useState<any | null>(null);

  const toggleLike = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            isLiked: !p.isLiked,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar bg-[#0A0A0A] pb-24 lg:pb-0 relative">
      <div className="sticky top-0 z-10 p-4 pt-6 md:pt-8 bg-gradient-to-b from-[#0a0a0a] to-transparent backdrop-blur-sm pointer-events-none">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent flex items-center gap-2">
          Pulse
          <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse mt-1" />
        </h1>
        <p className="text-gray-400 text-sm opacity-80 mt-1">
          Feel the energy of the world.
        </p>
      </div>

      <div className="w-full">
        <SparkRow
          sparks={mockSparks}
          currentUser={user}
          onAddSpark={() => setIsSparkCreatorOpen(true)}
          onSparkClick={(spark) => setActiveHighlightGroup({ user: spark.user, sparks: [spark] })}
        />
      </div>

      <div className="px-4 md:px-8 max-w-2xl mx-auto space-y-6 mt-4 pb-20">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#141414] rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.avatar}
                  alt={post.handle}
                  className="w-10 h-10 rounded-full border border-white/10"
                />
                <div>
                  <h3 className="font-semibold text-[15px]">{post.user}</h3>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    <span>{post.handle}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="px-4 pb-3 text-[15px] whitespace-pre-wrap leading-relaxed">
              {post.caption}
            </div>

            {post.image && (
              <div className="px-4 pb-2">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-xl max-h-[400px] object-cover border border-white/5"
                />
              </div>
            )}

            <div className="p-4 pt-2 flex items-center gap-6">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-2 transition-colors ${post.isLiked ? "text-neon-purple" : "text-gray-400 hover:text-white"}`}
              >
                <Heart size={20} className={post.isLiked ? "fill-current" : ""} />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <MessageCircle size={20} />
                <span className="text-sm font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Share2 size={20} />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
            </div>
            {Object.keys(post.reactions || {}).length > 0 && (
              <div className="px-4 pb-4 flex flex-wrap gap-2 text-xs">
                {Object.entries(post.reactions).slice(0, 4).map(([k, v]) => {
                  const reactionDef = SKRIM_REACTIONS.find((r) => r.id === k);
                  if (!reactionDef || !v) return null;
                  return (
                    <div
                      key={k}
                      className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-1"
                    >
                      <span>{reactionDef.emoji}</span>
                      <span className="text-gray-300 font-medium">{String(v)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isSparkCreatorOpen && (
          <SparkCreator
            isOpen={isSparkCreatorOpen}
            onClose={() => setIsSparkCreatorOpen(false)}
            onPost={(spark) => {
              console.log("Posted spark", spark);
              setIsSparkCreatorOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeHighlightGroup && (
          <SparkViewer
            groupedSparks={[activeHighlightGroup]}
            initialUserIndex={0}
            currentUser={user}
            onClose={() => setActiveHighlightGroup(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
