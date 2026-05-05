import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/FutureFeatures.css';

gsap.registerPlugin(ScrollTrigger);

const srTable = [
  { from: '1080p (1920 × 1080)', to: '1440p (2560 × 1440)' },
  { from: '1080p (1920 × 1080)', to: '4K (3840 × 2160)' },
  { from: '1440p (2560 × 1440)', to: '4K (3840 × 2160)' },
];

export default function FutureFeatures() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const card1Ref   = useRef(null);
  const card2Ref   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.from(card1Ref.current, {
        y: 60, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: card1Ref.current, start: 'top 88%' },
      });
      gsap.from(card2Ref.current, {
        y: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'expo.out',
        scrollTrigger: { trigger: card2Ref.current, start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="futuro" ref={sectionRef} className="ff-section">
      <div className="ff__sep" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="ff__header">
          <div className="section-label">Roadmap</div>
          <h2 className="ff__title">
            <span className="ff__title-line">CARACTERÍSTICAS</span>
            <span className="ff__title-line ff__title-accent">FUTURAS</span>
          </h2>
        </div>

        <div className="ff__grid">
          {/* Card 1 — GPU CUDA */}
          <div ref={card1Ref} className="ff-card">
            <div className="ff-card__badge ff-card__badge--green">Próximamente</div>
            <div className="ff-card__header">
              <div className="ff-card__icon ff-card__icon--green">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 10h2M8 14h2M8 18h2M13 10h8M13 14h6M13 18h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M20 3v3M24 7h-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="ff-card__title">Aceleración por GPU (CUDA / NVENC)</h3>
            </div>

            <p className="ff-card__lead">
              Integración con los <strong>núcleos CUDA</strong> de tarjetas NVIDIA RTX para trasladar
              la codificación de video de la CPU a la GPU.
            </p>

            <ul className="ff-card__list">
              <li>
                <strong>5–10× más rápido</strong> — NVENC puede codificar video entre 5 y 10 veces más
                rápido que libx264 en hardware compatible.
              </li>
              <li>
                <strong>Menor carga en la CPU</strong> — el proceso de codificación pasa a la GPU,
                liberando la CPU para otras tareas.
              </li>
              <li>
                <strong>Resoluciones altas</strong> — especialmente relevante en 1440p y 4K donde la
                codificación por software es el cuello de botella.
              </li>
              <li>
                <strong>Detección automática</strong> — RenderCast detectará la GPU compatible y
                activará NVENC automáticamente. En sistemas sin GPU, seguirá usando libx264.
              </li>
            </ul>

            <div className="ff-card__reqs">
              <div className="ff-card__reqs-title">Requisitos estimados</div>
              <p>
                Tarjeta NVIDIA serie GTX 1000 o superior (RTX recomendada), drivers NVIDIA actualizados
                y FFmpeg compilado con soporte <code>--enable-nvenc</code>.
              </p>
            </div>
          </div>

          {/* Card 2 — Super-Resolution */}
          <div ref={card2Ref} className="ff-card">
            <div className="ff-card__badge ff-card__badge--blue">Planificado</div>
            <div className="ff-card__header">
              <div className="ff-card__icon ff-card__icon--blue">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="3" y="3" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="16" y="3" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="3" y="16" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 16l10 10M21 16h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="ff-card__title">Super-Resolución (AI Upscaling)</h3>
            </div>

            <p className="ff-card__lead">
              Escalado inteligente del video de salida usando algoritmos de super-resolución acelerados
              por GPU (<strong>DLSS / NVVFX</strong>), con mayor calidad que interpolación tradicional.
            </p>

            <ul className="ff-card__list">
              <li>Exportar contenido en 4K sin necesidad de monitor 4K para previsualizar</li>
              <li>Obtener salidas en 1440p o 4K aunque la animación esté diseñada para 1080p</li>
              <li>Capturar a menor resolución (más rápido) y escalar en GPU (muy rápido)</li>
              <li>Mejora de nitidez en bordes, texto y elementos gráficos finos</li>
            </ul>

            <div className="ff-card__table-wrap">
              <div className="ff-card__table-title">Escalado posible</div>
              <table className="ff-card__table">
                <thead>
                  <tr>
                    <th>Captura base</th>
                    <th>Salida posible</th>
                  </tr>
                </thead>
                <tbody>
                  {srTable.map((r, i) => (
                    <tr key={i}>
                      <td>{r.from}</td>
                      <td><strong>{r.to}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ff-card__reqs">
              <div className="ff-card__reqs-title">Requisitos estimados</div>
              <p>
                Tarjeta NVIDIA RTX (serie 2000 o superior con Tensor Cores), drivers con soporte para
                NVVFX SDK.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
