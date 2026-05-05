import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/FutureFeatures.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    tag: 'GPU · NVIDIA RTX',
    title: 'Aceleración por GPU con núcleos CUDA',
    desc: 'Integración con los núcleos CUDA de las tarjetas NVIDIA RTX para trasladar la codificación de video de la CPU a la GPU usando NVENC, el motor de codificación por hardware de NVIDIA.',
    benefits: [
      'Velocidad de codificación 5–10× mayor que libx264 en hardware compatible',
      'Menor carga en la CPU — codificación pasa a GPU, CPU queda libre',
      'Especialmente relevante en resoluciones 1440p y 4K',
      'Detección automática: si no hay GPU compatible, usa libx264 como respaldo',
    ],
    reqs: 'GTX 1000 o superior (RTX recomendada) · Drivers NVIDIA actualizados · FFmpeg con --enable-nvenc',
  },
  {
    tag: 'Super-Resolution · DLSS',
    title: 'Escalado de resolución inteligente',
    desc: 'Capacidad de escalar la resolución del video de salida más allá de la resolución de captura, usando algoritmos de super-resolución acelerados por GPU con tecnologías DLSS y NVVFX.',
    benefits: [
      'Exportar a 4K sin necesidad de un monitor 4K para previsualizar',
      'Salidas en 1440p o 4K aunque la animación original sea 1080p',
      'Capturar a menor resolución (más rápido) y escalar en GPU (muy rápido)',
      'Mayor nitidez y detalle en bordes, texto y elementos gráficos finos',
    ],
    table: [
      { from: '1080p (1920 × 1080)', to: '1440p (2560 × 1440)' },
      { from: '1080p (1920 × 1080)', to: '4K (3840 × 2160)' },
      { from: '1440p (2560 × 1440)', to: '4K (3840 × 2160)' },
    ],
    reqs: 'NVIDIA RTX serie 2000 o superior · Tensor Cores para inferencia neuronal · Drivers con soporte NVVFX SDK',
  },
];

export default function FutureFeatures() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 60, opacity: 0, duration: 0.9, delay: i * 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="future-section">
      <div className="future__separator" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="future__header">
          <div className="section-label future__label">Roadmap</div>
          <h2 className="future__title">
            <span className="future__title-line">CARACTERÍSTICAS</span>
            <span className="future__title-line future__title-line--accent">FUTURAS</span>
          </h2>
        </div>

        <div className="future__grid">
          {features.map((feat, i) => (
            <div
              key={feat.tag}
              ref={(el) => (cardsRef.current[i] = el)}
              className="future-card"
            >
              <span className="future-card__tag">{feat.tag}</span>
              <h3 className="future-card__title">{feat.title}</h3>
              <p className="future-card__desc">{feat.desc}</p>

              <div className="future-card__divider" aria-hidden="true" />

              <ul className="future-card__benefits">
                {feat.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {feat.table && (
                <div className="future-card__table-wrap">
                  <table className="future-card__table">
                    <thead>
                      <tr>
                        <th>Captura base</th>
                        <th>Salida posible</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feat.table.map((row) => (
                        <tr key={row.from + row.to}>
                          <td>{row.from}</td>
                          <td className="future-card__td--accent">{row.to}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="future-card__reqs">
                <span className="future-card__reqs-label">Requisitos estimados</span>
                <span className="future-card__reqs-val">{feat.reqs}</span>
              </div>

              <div className="future-card__line" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
