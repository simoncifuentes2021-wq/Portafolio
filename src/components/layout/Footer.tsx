import Link from "next/link";
import { ArrowUp } from "lucide-react";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <Link href="/#inicio" className="footer-signature">
          Simón Cifuentes<span> ↗</span>
        </Link>
        <p>INGENIERÍA CON INTENCIÓN.</p>
        <Link href="/#inicio">
          Volver al inicio <ArrowUp size={14} />
        </Link>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Simón Cifuentes</span>
        <span>Diseñado y construido en Temuco, Chile.</span>
      </div>
    </footer>
  );
}
