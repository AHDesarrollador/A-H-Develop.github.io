import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/Limitations.css';

gsap.registerPlugin(ScrollTrigger);

const limitations = [
  {
    icon: '🪟',
    title: 'Solo Windows x64',
    desc: 'El binario de FFmpeg incluido y el instalador son exclusivos de la plataforma Windows de 64 bits.',
  },
  {
    icon: '🔇',
    title: 'Sin audio',
    desc: 'El MP4 generado no contiene pista de audio. El video exportado es siempre silencioso.',
  },
  {
    icon: '⏱',
    title: 'Duración fija',
    desc: 'La app captura los primeros N segundos configurados. Si la animación es más corta, los últimos frames serán estáticos.',
  },
  {
    icon: '🎬',
    title: 'Remotion — solo primera composición',
    desc: 'Cuando hay varias composiciones, se renderiza únicamente la primera detectada en el proyecto.',
  },
  {
    icon: '📦',
    title: 'CLI requiere Puppeteer separado',
    desc: 'Es necesario ejecutar npm install puppeteer para usar la CLI. La app de escritorio no tiene esta dependencia.',
  },
];

export default function Limitations() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      cardsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="limitaciones" ref={sectionRef} className="lim-section">
      <div className="lim__sep" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="lim__header">
          <div className="section-label">Versión actual</div>
          <h2 className="lim__title">
            <span className="lim__title-line">LIMITACIONES</span>
            <span className="lim__title-line lim__title-accent">CONOCIDAS</span>
          </h2>
        </div>

        <div className="lim__grid">
          {limitations.map((lim, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="lim-card"
            >
              <div className="lim-card__icon">{lim.icon}</div>
              <h3 className="lim-card__title">{lim.title}</h3>
              <p className="lim-card__desc">{lim.desc}</p>
              <div className="lim-card__line" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
