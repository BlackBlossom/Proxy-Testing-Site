import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parseProxyInput } from "../utils/validators";

export default function ProxyForm({ onSubmit }) {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setErrors(["Please enter at least one proxy."]);
      return;
    }

    const { validProxies, errors: validationErrors } = parseProxyInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    onSubmit(validProxies);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/90 dark:bg-[#1A1A2E]/90 backdrop-blur-sm rounded-xl p-6 space-y-6 w-full max-w-3xl mx-auto border border-[#D0D2E5]/30 dark:border-[#4b4583]/30 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <h2 className="text-2xl font-semibold text-[#1C1641] dark:text-[#D0D2E5] mb-2">
        Enter Your Proxies
      </h2>

      {/* Error Display */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 p-4 rounded overflow-hidden"
          >
            <div className="list-disc list-inside text-sm">
              {errors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your proxies here (one per line)"
        rows={6}
        whileFocus={{ borderColor: "#4B39EF", boxShadow: "0 0 0 2px rgba(75, 57, 239, 0.2)" }}
        className="w-full p-4 rounded-lg border border-[#D0D2E5] dark:border-[#4b4583] bg-[#F7F5FF] dark:bg-[#1B1340] text-[#1C1641] dark:text-[#D0D2E5] resize-none focus:outline-none focus:ring-1 focus:ring-[#4B39EF] transition"
      />
      <button
        type="submit"
        className="w-full relative bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] dark:from-[#3730a3]/80 dark:to-[#4f46e5]/80 text-[#312e81] dark:text-[#e9d5ff] font-medium py-3 rounded-lg transition overflow-hidden group"
      >
        <span className="relative z-10">Test Proxies</span>
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </button>
    </motion.form>
  );
}
