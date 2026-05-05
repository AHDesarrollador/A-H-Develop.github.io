import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/WhatIs.css';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    label: 'Navegador invisible',
    desc: 'Controla Chromium en modo headless — ninguna ventana visible durante el proceso.',
  },
  {
    label: 'Frame-exact',
    desc: 'Avanza el tiempo virtual del DOM cuadro a cuadro con precisión de milisegundos.',
  },
  {
    label: 'Captura PNG',
    desc: 'Cada fotograma se exporta como imagen PNG antes de ensamblar el video final.',
  },
  {
    label: 'FFmpeg integrado',
    desc: 'Codifica el resultado en H.264 directamente — sin instalaciones adicionales.',
  },
];

export default function WhatIs() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const bodyRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.from(bodyRef.current.children, {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="whatis-section">
      <div className="whatis__separator" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="whatis__header">
          <div className="section-label whatis__label">Descripción</div>
          <h2 className="whatis__title">
            <span className="whatis__title-line">¿QUÉ ES</span>
            <span className="whatis__title-line whatis__title-line--accent">RENDERCAST?</span>
          </h2>
        </div>

        <div ref={bodyRef} className="whatis__body">
          <p className="whatis__desc">
            RenderCast es una <strong>aplicación de escritorio</strong> (y herramienta de línea
            de comandos) que convierte proyectos web —animaciones en React, páginas HTML
            estáticas, proyectos Next.js y composiciones Remotion— en archivos de video{' '}
            <strong className="whatis__accent">MP4</strong> de alta calidad, sin necesidad de
            grabar la pantalla manualmente.
          </p>
          <p className="whatis__desc">
            El programa controla un navegador en modo invisible, avanza el tiempo de la
            animación cuadro a cuadro con precisión de milisegundos, captura cada fotograma
            como imagen PNG y los ensambla en un video usando FFmpeg. El resultado es un MP4
            perfectamente sincronizado, <strong>frame-exact</strong> y reproducible.
          </p>

          <div className="whatis__highlights">
            {highlights.map(({ label, desc }) => (
              <div key={label} className="whatis__card">
                <div className="whatis__card-label">{label}</div>
                <div className="whatis__card-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
