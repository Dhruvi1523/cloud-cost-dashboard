import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-white shadow-xl border-r border-gray-200 h-screen fixed top-0 left-0 transition-all duration-300 
      ${open ? "w-64" : "w-20"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className={`text-xl font-bold text-blue-600 transition-all duration-300 ${!open && "hidden"}`}>
          CloudDash
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Nav Items */}
      <nav className="mt-6 space-y-2 px-3">
        {[ "Dashboard", "Analytics", "Billing", "Settings" ].map((item) => (
          <div key={item}>
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {open && <span className="font-medium">{item}</span>}
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
}
