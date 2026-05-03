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

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

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
      </div>
    </section>
  );
}
