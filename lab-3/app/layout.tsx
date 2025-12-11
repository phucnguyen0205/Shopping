import Link from 'next/link';


export const metadata = {
  title: 'Lab-3 App Router',
  description: 'To-Do List and Products',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-zinc-50">
          <nav className="bg-white shadow-md p-4 mb-8 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-blue-500 font-semibold transition-colors">
                To-Do List
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-500 font-semibold transition-colors">
                Trang Sản phẩm
              </Link>
            </div>
          </nav>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}