import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="4" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9h22" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="6.5" r="1" fill="currentColor"/>
        <circle cx="11" cy="6.5" r="1" fill="currentColor"/>
        <rect x="7" y="13" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M16 14h5M16 17h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Abre la aplicación',
    desc: 'Instala HTML to MP4 desde GitHub y ábrela desde tu escritorio. La interfaz gráfica te recibe con un diseño limpio y sin configuraciones previas.',
    tag: 'Interfaz visual',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 4h10l6 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 14l2 2-2 2M13 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Carga tu animación',
    desc: 'Arrastra tu archivo HTML o JSX directo al panel de la app, o usa el botón "Abrir archivo". La previsualización de tu animación se carga al instante.',
    tag: 'HTML / JSX / React',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="7" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 11h4M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 10l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Configura los parámetros',
    desc: 'Ajusta resolución, FPS y duración directamente desde la interfaz. Sin tocar ningún archivo de configuración ni abrir la terminal.',
    tag: 'Sin terminal',
  },
  {
    num: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4v12M9 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M4 24h6M18 24h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Exporta tu .mp4',
    desc: 'Haz clic en "Exportar MP4". La app renderiza cada fotograma con un navegador headless y codifica el resultado en H.264. Listo en segundos.',
    tag: 'MP4 / H.264',
  },
];

const phases = [
  {
    num: '01',
    name: 'BUILD',
    desc: 'Detecta el tipo de proyecto → instala dependencias → compila → levanta servidor HTTP local',
  },
  {
    num: '02',
    name: 'CAPTURE',
    desc: 'Abre el navegador en modo headless → congela el reloj virtual del DOM → avanza el tiempo cuadro a cuadro → captura cada frame como PNG',
  },
  {
    num: '03',
    name: 'ENCODE',
    desc: 'Toma todos los PNG de la carpeta temporal → codifica con FFmpeg (H.264, CRF 18) → guarda el MP4 final → limpia los archivos temporales',
  },
];

const detectionRows = [
  {
    type: 'Remotion',
    condition: 'package.json contiene remotion o @remotion/*',
    strategy: 'Delega el render a npx remotion render. No usa captura de frames.',
  },
  {
    type: 'React / Vite',
    condition: 'package.json tiene un script build',
    strategy: 'npm install → npm run build → sirve dist/ con Express → captura frames',
  },
  {
    type: 'HTML estático',
    condition: 'Sin package.json o sin script build',
    strategy: 'Sirve directamente la carpeta → captura frames',
  },
  {
    type: 'Next.js',
    condition: 'package.json contiene next en dependencias',
    strategy: 'Parcha next.config.js para output: export → construye → sirve out/',
  },
];

export default function HowItWorks() {
  const sectionRef   = useRef(null);
  const titleRef     = useRef(null);
  const cardsRef     = useRef([]);
  const internalsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      });

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 0.9,
          delay: i * 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });

      if (internalsRef.current) {
        gsap.from(internalsRef.current.children, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: internalsRef.current,
            start: 'top 85%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="how-section">
      <div className="how__separator" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="how__header">
          <div className="section-label how__label">Proceso</div>
          <h2 className="how__title">
            <span className="how__title-line">¿CÓMO</span>
            <span className="how__title-line how__title-line--accent">FUNCIONA?</span>
          </h2>
        </div>

        <div className="how__grid">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="step-card"
            >
              <div className="step-num">{step.num}</div>
              <div className="step__icon">{step.icon}</div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.desc}</p>
              <span className="step__tag">{step.tag}</span>
              <div className="step-line" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* ─── Funcionamiento interno ─────────────────────── */}
        <div ref={internalsRef} className="how__internals">
          <div className="how__internals-header">
            <div className="section-label how__label">Técnico</div>
            <h3 className="how__internals-title">FUNCIONAMIENTO INTERNO</h3>
          </div>

          {/* Phases */}
          <div className="how__phases">
            {phases.map((phase) => (
              <div key={phase.num} className="how__phase-card">
                <div className="how__phase-badge">
                  <span className="how__phase-num">{phase.num}</span>
                  <span className="how__phase-name">{phase.name}</span>
                </div>
                <p className="how__phase-desc">{phase.desc}</p>
                <div className="how__phase-line" aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* Detection table */}
          <div className="how__detect-block">
            <div className="how__detect-title">Detección automática del tipo de proyecto</div>
            <div className="how__table-wrap">
              <table className="how__table">
                <thead>
                  <tr>
                    <th>Tipo de proyecto</th>
                    <th>Condición de detección</th>
                    <th>Estrategia</th>
                  </tr>
                </thead>
                <tbody>
                  {detectionRows.map((row) => (
                    <tr key={row.type}>
                      <td className="how__table-type">{row.type}</td>
                      <td>{row.condition}</td>
                      <td>{row.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tech details */}
          <div className="how__tech-grid">
            <div className="how__tech-card">
              <div className="how__tech-card-title">Captura de frames</div>
              <ul className="how__tech-list">
                <li>En la <strong>app de escritorio</strong>, se usa la API nativa de Electron (<code>capturePage()</code>).</li>
                <li>En la <strong>CLI</strong>, se usa Puppeteer (Chromium embebido).</li>
                <li>Se usa Chrome DevTools Protocol (<code>Emulation.setVirtualTimePolicy</code>) para congelar y avanzar el tiempo virtual del DOM, garantizando que CSS animations, <code>requestAnimationFrame</code>, <code>setTimeout</code> y <code>Date.now()</code> se mueven exactamente un intervalo de frame por captura.</li>
                <li>Los canvas WebGL son compatibles gracias a un parche de <code>getContext()</code> que fuerza <code>preserveDrawingBuffer: true</code>.</li>
              </ul>
            </div>
            <div className="how__tech-card">
              <div className="how__tech-card-title">Codificación de video</div>
              <ul className="how__tech-list">
                <li>Codec: <strong>H.264</strong> (<code>libx264</code>)</li>
                <li>Espacio de color: <code>yuv420p</code> — máxima compatibilidad con reproductores</li>
                <li>Calidad: <strong>CRF 18</strong> — alta calidad visual, tamaño razonable</li>
                <li>Preset: <code>fast</code></li>
                <li>FFmpeg está incluido en la aplicación (<code>ffmpeg-static</code>). No se necesita instalación separada.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
