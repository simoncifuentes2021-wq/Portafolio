import {
  ArrowUpRight,
  CalendarDays,
  LayoutDashboard,
  Search,
  SlidersHorizontal,
  Users,
  MapPin,
  ChevronRight,
} from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectPreview({
  visual,
  name,
}: {
  visual: Project["visual"];
  name: string;
}) {
  return (
    <div
      className={"project-art project-art-" + visual}
      role="img"
      aria-label={
        "Representación visual de " + name + "; no es una captura del producto."
      }
    >
      <div className="mockup-orbit" aria-hidden="true" />
      <div className="browser-mockup" aria-hidden="true">
        <div className="browser-chrome">
          <span className="browser-dots">
            <i />
            <i />
            <i />
          </span>
          <span>
            {visual === "sports"
              ? "Reservas deportivas"
              : visual === "business"
                ? "Tu negocio, en línea"
                : "Panel de administración"}
          </span>
          <ArrowUpRight size={10} />
        </div>
        {visual === "sports" ? (
          <SportsPreview />
        ) : visual === "business" ? (
          <BusinessPreview />
        ) : (
          <DashboardPreview />
        )}
      </div>
      {visual === "sports" && (
        <div className="floating-ticket" aria-hidden="true">
          <span className="ticket-icon">
            <CalendarDays size={16} />
          </span>
          <div>
            <strong>Tu próximo partido</strong>
            <span>Todo comienza con una reserva.</span>
          </div>
          <ArrowUpRight size={14} />
        </div>
      )}
      {visual === "business" && (
        <div className="mobile-mockup" aria-hidden="true">
          <span className="phone-notch" />
          <span className="phone-brand">Tu negocio.</span>
          <p>
            Lo que haces.
            <br />
            <em>Bien contado.</em>
          </p>
          <div className="phone-art" />
          <span className="phone-cta">Conversemos ↗</span>
        </div>
      )}
      <span className="mockup-caption">
        Representación visual ·{" "}
        {visual === "business" ? "Desktop + Mobile" : "Web application"}
      </span>
    </div>
  );
}

function SportsPreview() {
  return (
    <div className="sports-screen">
      <div className="screen-nav">
        <strong>
          <span className="sports-brand-mark">↗</span> A jugar.
        </strong>
        <span>Encuentra tu cancha</span>
        <i>
          Explorar <ArrowUpRight size={9} />
        </i>
      </div>
      <div className="sports-content">
        <p className="screen-eyebrow">EL PARTIDO EMPIEZA AQUÍ</p>
        <h4>
          Tu cancha.
          <br />
          <em>Tu momento.</em>
        </h4>
        <div className="sports-search">
          <MapPin size={10} />
          <span>¿Dónde quieres jugar?</span>
          <Search size={11} />
        </div>
        <div className="court-scene">
          <div className="court">
            <span className="court-center" />
            <span className="court-net" />
            <i />
            <i />
          </div>
          <span className="court-tag">ENCUENTRA · RESERVA · JUEGA</span>
        </div>
      </div>
      <div className="screen-bottom">
        <span>
          <CalendarDays size={10} /> Elige tu horario
        </span>
        <span>
          Encuentra tu próximo partido <ChevronRight size={10} />
        </span>
      </div>
    </div>
  );
}

function BusinessPreview() {
  return (
    <div className="business-screen">
      <div className="screen-nav">
        <strong>
          Tu negocio<span>.</span>
        </strong>
        <span>Nosotros &nbsp; Servicios</span>
        <ArrowUpRight size={12} />
      </div>
      <div className="business-body">
        <p className="screen-eyebrow">HECHO PARA CONECTAR</p>
        <h4>
          Lo que haces.
          <br />
          <em>Bien contado.</em>
        </h4>
        <p>Una presencia digital con personalidad.</p>
        <span className="business-cta">
          Conversemos <ArrowUpRight size={10} />
        </span>
        <div className="business-sculpture">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="business-footer">
        <span>DISEÑO CON PROPÓSITO</span>
        <span>01 — 03</span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-screen">
      <aside>
        <b>
          panel<span> /</span>
        </b>
        <span className="dash-nav-active">
          <LayoutDashboard size={11} /> Resumen
        </span>
        <span>
          <Users size={11} /> Usuarios
        </span>
        <span>
          <CalendarDays size={11} /> Registros
        </span>
        <span>
          <SlidersHorizontal size={11} /> Ajustes
        </span>
        <i>Workspace</i>
      </aside>
      <div className="dashboard-content">
        <div className="dash-heading">
          <div>
            <p>WORKSPACE / RESUMEN</p>
            <h4>Todo, en perspectiva.</h4>
          </div>
          <span className="dash-avatar">SC</span>
        </div>
        <div className="dashboard-metrics">
          <div>
            <span>Usuarios</span>
            <b>—</b>
            <i>Gestión centralizada</i>
          </div>
          <div>
            <span>Operaciones</span>
            <b>—</b>
            <i>Control en un vistazo</i>
          </div>
          <div>
            <span>Estado</span>
            <b className="dash-status">
              Activo <i />
            </b>
            <i>Vista de ejemplo</i>
          </div>
        </div>
        <div className="dashboard-chart">
          <div>
            <strong>Actividad del sistema</strong>
            <span>Vista ilustrativa</span>
          </div>
          <div className="chart-bars">
            {[22, 38, 28, 48, 34, 62, 45, 72, 54, 83, 68, 92].map(
              (height, i) => (
                <i key={i} style={{ height: height + "%" }} />
              ),
            )}
          </div>
        </div>
        <div className="dashboard-table">
          <div>
            <span>Registro</span>
            <span>Rol</span>
            <span>Estado</span>
          </div>
          {["Administrador", "Editor", "Usuario"].map((role, i) => (
            <div key={role}>
              <span>
                <i /> Registro 0{i + 1}
              </span>
              <span>{role}</span>
              <span>
                <b /> Activo
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
