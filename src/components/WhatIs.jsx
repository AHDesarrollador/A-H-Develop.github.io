import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/WhatIs.css';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    num: '01',
    label: 'BUILD',
    colorClass: 'whatis-phase--blue',
    desc: 'Detecta el tipo de proyecto → instala dependencias → compila el bundle → levanta servidor HTTP local',
  },
  {
    num: '02',
    label: 'CAPTURE',
    colorClass: 'whatis-phase--lime',
    desc: 'Abre el navegador headless → congela el reloj virtual del DOM → avanza cuadro a cuadro → captura cada frame como PNG',
  },
  {
    num: '03',
    label: 'ENCODE',
    colorClass: 'whatis-phase--red',
    desc: 'Toma todos los PNG → codifica con FFmpeg (H.264, CRF 18) → guarda el MP4 final → limpia archivos temporales',
  },
];

export default function WhatIs() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const bodyRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.from(bodyRef.current.children, {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
      });
      cardsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 0.9, delay: i * 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="que-es" ref={sectionRef} className="whatis-section">
      <div className="whatis__sep" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="whatis__header">
          <div className="section-label">Introducción</div>
          <h2 className="whatis__title">
            <span className="whatis__title-line">¿QUÉ ES</span>
            <span className="whatis__title-line whatis__title-accent">RENDERCAST?</span>
          </h2>
        </div>

        <div ref={bodyRef} className="whatis__body">
          <p className="whatis__lead">
            RenderCast es una aplicación de escritorio (y herramienta de línea de comandos) que convierte
            proyectos web —animaciones en React, páginas HTML estáticas, proyectos Next.js y composiciones
            Remotion— en archivos de video <strong>MP4</strong> de alta calidad, sin necesidad de grabar
            la pantalla manualmente.
          </p>
          <p className="whatis__text">
            El programa controla un navegador en modo invisible, avanza el tiempo de la animación cuadro a
            cuadro con precisión de milisegundos, captura cada fotograma como imagen PNG y los ensambla en
            un video usando FFmpeg. El resultado es un MP4 perfectamente sincronizado,{' '}
            <em>frame-exact</em> y reproducible.
          </p>
        </div>

        <div className="whatis__pipeline">
          {phases.map((phase, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`whatis-phase ${phase.colorClass}`}
            >
              <div className="whatis-phase__num">{phase.num}</div>
              <div className="whatis-phase__label">Fase {phase.num} — {phase.label}</div>
              <p className="whatis-phase__desc">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
