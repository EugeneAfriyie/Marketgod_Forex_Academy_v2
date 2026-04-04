import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";

const ResourceDetail: React.FC = () => {
  const { state: resource } = useLocation();
  const navigate = useNavigate();

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Resource not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0f19] via-[#121826] to-[#0b0f19] text-white font-montserrat py-16 px-6 sm:px-10 md:px-24">
      <motion.button
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 text-[#00c896] mb-10 hover:underline"
      >
        <ArrowLeft size={18} /> Back to Resources
      </motion.button>

      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        src={resource.image}
        alt={resource.title}
        className="w-full max-h-[450px] object-cover rounded-2xl mb-10 shadow-lg"
      />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-[#00c896] mb-6"
      >
        {resource.title}
      </motion.h1>

      {/* ---- FIXED: ReactMarkdown does NOT accept className ---- */}
      <div className="prose prose-invert prose-p:text-white/80 prose-headings:text-[#00c896] max-w-none leading-relaxed">
        <ReactMarkdown>{resource.fullText}</ReactMarkdown>
      </div>
    </main>
  );
};

export default ResourceDetail;


