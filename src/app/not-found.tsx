import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="container not-found">
      <span className="eyebrow">404 / Fuera del recorrido</span>
      <h1>Esta página no está aquí.</h1>
      <p>Pero hay proyectos que vale la pena explorar.</p>
      <Link href="/#proyectos" className="btn btn-primary">
        Ver proyectos ↗
      </Link>
    </main>
  );
}
