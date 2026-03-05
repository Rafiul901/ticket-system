import { useState } from "react";
import tickets from "./data/tickets.json";


const priorityColors = {
  HIGH: "text-red-500",
  MEDIUM: "text-yellow-500",
  LOW: "text-blue-400",
};

const statusConfig = {
  Open: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  "In-Progress": { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-400" },
  Resolved: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
};

function Alert({ message, onClose }) {
  return (
    <div className="fixed top-5 right-5 z-50 bg-white border border-gray-200 shadow-xl rounded-xl px-5 py-4 flex items-start gap-3 max-w-xs animate-pulse">
      <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
    </div>
  );
}

export default function App() {
  const [taskStatus, setTaskStatus] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [alert, setAlert] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const showAlert = (msg) => {
    setAlert(msg);
    setTimeout(() => setAlert(null), 3000);
  };

  const handleCardClick = (ticket) => {
    if (taskStatus.find((t) => t.id === ticket.id) || resolved.find((t) => t.id === ticket.id)) {
      showAlert(`"${ticket.title}" is already tracked.`);
      return;
    }
    setTaskStatus((prev) => [...prev, ticket]);
    showAlert(`"${ticket.title}" added to Task Status!`);
  };

  const handleComplete = (ticket) => {
    setTaskStatus((prev) => prev.filter((t) => t.id !== ticket.id));
    setResolved((prev) => [...prev, ticket]);
    showAlert(`"${ticket.title}" marked as complete!`);
  };

  const inProgressCount = taskStatus.length;
  const resolvedCount = resolved.length;

  const navLinks = ["Home", "FAQ", "Changelog", "Blog", "Download", "Contact"];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .banner-gradient { background: linear-gradient(135deg, #6c3aff 0%, #4f28cc 50%, #1a8f6c 100%); }
        .card-hover { transition: all 0.2s ease; cursor: pointer; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
        .pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
      `}</style>

      {alert && <Alert message={alert} onClose={() => setAlert(null)} />}

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">CS — Ticket System</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm text-gray-500 hover:text-gray-900 font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">{link}</a>
            ))}
            <button className="ml-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5">
              <span>+</span> New Ticket
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700 mb-1" />
            <div className="w-5 h-0.5 bg-gray-700" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
            {navLinks.map((link) => (
              <a key={link} href="#" className="block py-2 text-sm text-gray-600 font-medium hover:text-violet-600">{link}</a>
            ))}
            <button className="mt-2 w-full bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">+ New Ticket</button>
          </div>
        )}
      </nav>

      {/* Banner */}
      <section className="banner-gradient py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          {[
            { label: "In-Progress", count: inProgressCount, accent: "from-violet-500/30 to-transparent" },
            { label: "Resolved", count: resolvedCount, accent: "from-emerald-500/30 to-transparent" },
          ].map(({ label, count, accent }) => (
            <div key={label} className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm px-8 py-8 text-center">
              <div className={`absolute inset-0 bg-gradient-to-br ${accent} pointer-events-none`} />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/10" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border border-white/10" />
              <p className="text-white/80 text-sm font-semibold tracking-wide uppercase mb-2">{label}</p>
              <p className="text-white text-6xl font-extrabold leading-none">{count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Tickets */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Customer Tickets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tickets.map((ticket) => {
                const sc = statusConfig[ticket.status] || statusConfig["Open"];
                const inTask = taskStatus.find((t) => t.id === ticket.id);
                const isResolved = resolved.find((t) => t.id === ticket.id);
                return (
                  <div
                    key={ticket.id}
                    onClick={() => handleCardClick(ticket)}
                    className={`card-hover bg-white rounded-xl border p-4 ${isResolved ? "opacity-50 border-gray-200" : inTask ? "border-violet-300 ring-1 ring-violet-200" : "border-gray-200 hover:border-violet-300"}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-gray-900 leading-tight">{ticket.title}</h3>
                      <span className={`pill ${sc.bg} ${sc.text} flex-shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{ticket.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">#{ticket.id}</span>
                        <span className={`font-bold ${priorityColors[ticket.priority]}`}>{ticket.priority} PRIORITY</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>{ticket.customer}</span>
                        <span>📅 {ticket.createdAt}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Task Status */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Task Status</h2>

              {taskStatus.length === 0 && (
                <div className="bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center text-sm text-gray-400">
                  Click a ticket card to add it here
                </div>
              )}

              <div className="space-y-3">
                {taskStatus.map((ticket) => (
                  <div key={ticket.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-800 mb-3 leading-tight">{ticket.title}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleComplete(ticket); }}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold py-2 rounded-lg transition-colors"
                    >
                      Complete
                    </button>
                  </div>
                ))}
              </div>

              {/* Resolved Tasks */}
              <div className="mt-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Resolved Task</h3>
                {resolved.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">No resolved tasks yet.</p>
                ) : (
                  <div className="space-y-2">
                    {resolved.map((ticket) => (
                      <div key={ticket.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <p className="text-xs font-medium text-gray-500 line-clamp-1">{ticket.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CS</span>
                </div>
                <span className="font-bold text-white text-sm">CS — Ticket System</span>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Company</h4>
              {["About Us", "Our Mission", "Contact Sales"].map((l) => (
                <a key={l} href="#" className="block text-xs text-gray-500 hover:text-gray-300 mb-2 transition-colors">{l}</a>
              ))}
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Services</h4>
              {["Products & Services", "Customer Stories", "Download Apps"].map((l) => (
                <a key={l} href="#" className="block text-xs text-gray-500 hover:text-gray-300 mb-2 transition-colors">{l}</a>
              ))}
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Information</h4>
              {["Privacy Policy", "Terms & Conditions", "Join Us"].map((l) => (
                <a key={l} href="#" className="block text-xs text-gray-500 hover:text-gray-300 mb-2 transition-colors">{l}</a>
              ))}
            </div>

            {/* Social */}
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Social Links</h4>
              {[
                { icon: "𝕏", label: "@CS — Ticket System" },
                { icon: "f", label: "@CS — Ticket System" },
                { icon: "in", label: "@CS — Ticket System" },
                { icon: "✉", label: "support@cst.com" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 bg-gray-700 rounded text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{icon}</span>
                  <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{label}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} CS — Ticket System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}