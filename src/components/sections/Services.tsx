import { Plus } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
export function Services() {
  return (
    <section id="servicios" className="section-shell services-section">
      <div className="services-layout">
        <div className="services-heading">
          <p className="section-index">
            <span>04</span>
            <span className="index-line" />
            En qué puedo ayudarte
          </p>
          <h2>
            Una idea tuya.
            <br />
            Un producto nuestro.
          </h2>
          <p>
            Desde una interfaz hasta una plataforma completa. La misma atención
            a cada detalle.
          </p>
        </div>
        <Reveal variant="slide">
          <div>
            {services.map((service, index) => (
              <details
                key={service.title}
                className="service-item"
                open={index === 0}
              >
                <summary>
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <Plus size={17} />
                </summary>
                <div>
                  <p>{service.description}</p>
                  <span className="eyebrow">{service.tag}</span>
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
