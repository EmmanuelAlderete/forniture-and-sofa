// components/Layout.jsx
import { Header, Footer } from "../index";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 scroll-smooth">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
