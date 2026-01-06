export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-6">
        <div className="text-2xl font-bold text-slate-900">
          VTC <span className="text-pink-600">Academy</span>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-[360px] rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-sm text-slate-700">
          <span>🇬🇧</span>
          <span>English</span>
        </button>
        <button className="text-sm text-slate-700">USD</button>

        {/* Icons */}
        <button className="text-xl text-slate-700 hover:text-pink-600">
          🛒
        </button>
        <button className="text-xl text-slate-700 hover:text-pink-600">
          👤
        </button>
        <button className="text-xl text-slate-700 hover:text-pink-600">
          
        </button>
      </div>
    </header>
  );
}
