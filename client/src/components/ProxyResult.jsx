import { motion } from "framer-motion";

function exportToTxt(results) {
  // Prepare headers and data
  const headers = ['Status', 'IP', 'Port', 'Latency', 'Location', 'Proxy-Type'].join('\t');
  const rows = results.map(r => [
    r.status,
    r.host,
    r.port,
    (r.latency ?? '-') + ' ms',
    r.location ?? 'unknown',
    r.proxyType
  ].join('\t')).join('\n');
  const table = `${headers}\n${rows}`;

  // Create and trigger download
  const blob = new Blob([table], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'proxy-results.txt';
  a.click();
  URL.revokeObjectURL(url);
}
export default function ProxyResult({ results }) {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[#D0D2E5]/30 dark:border-[#4b4583]/30 overflow-x-auto bg-white/90 dark:bg-[#1A1A2E]/90 backdrop-blur-sm"
      >
        <table className="table-auto min-w-full text-[0.9em] text-left rounded-2xl overflow-hidden">
          <thead className="bg-[#1B1340]/90 dark:bg-[#1B1340]/90 text-[#D0D2E5]">
            <tr>
              <th className="px-6 py-3 font-semibold">STATUS</th>
              <th className="px-6 py-3 font-semibold">IP</th>
              <th className="px-6 py-3 font-semibold">PORT</th>
              <th className="px-6 py-3 font-semibold">LATENCY</th>
              <th className="px-6 py-3 font-semibold">LOCATION</th>
              <th className="px-6 py-3 font-semibold">PROXY-TYPE</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="border-b border-[#D0D2E5]/30 dark:border-[#4B39EF]/30 hover:bg-[#F7F5FF]/60 dark:hover:bg-[#1B1340]/60"
              >
                <td
                  className={`px-6 py-4 font-semibold ${
                    result.status === "Working"
                      ? "text-green-600 dark:text-[#589ea7]"
                      : "text-red-600 dark:text-[#FF6B6B]"
                  }`}
                >
                  {result.status}
                </td>
                <td className="px-6 py-4 font-mono">{result.host}</td>
                <td className="px-6 py-4 font-mono">{result.port}</td>
                <td className="px-6 py-4 font-mono">{result.latency ?? '-'} ms</td>
                <td className="px-6 py-4 font-mono">{result.location}</td>
                <td className="px-6 py-4 font-mono">{result.proxyType}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-8 mb-8"
        >
          <button
            onClick={() => exportToTxt(results)}
            className="relative bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] dark:from-[#3730a3]/80 dark:to-[#4f46e5]/80 text-[#312e81] dark:text-[#e9d5ff] font-medium py-3 px-6 rounded-lg transition overflow-hidden group"
          >
            <span className="relative z-10">Export Results to TXT</span>
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
