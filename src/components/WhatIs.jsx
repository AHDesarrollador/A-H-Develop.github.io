import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/WhatIs.css';

gsap.registerPlugin(ScrollTrigger);

<<<<<<< HEAD
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
=======
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
>>>>>>> 64ff79959b02ead10a1751ac8f2c0d6be30d67c6
  },
];

export default function WhatIs() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const bodyRef    = useRef(null);
<<<<<<< HEAD
  const cardsRef   = useRef([]);
=======
>>>>>>> 64ff79959b02ead10a1751ac8f2c0d6be30d67c6

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.from(bodyRef.current.children, {
<<<<<<< HEAD
        y: 30, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'expo.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
      });
      cardsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 0.9, delay: i * 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });
=======
        y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
      });
>>>>>>> 64ff79959b02ead10a1751ac8f2c0d6be30d67c6
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
<<<<<<< HEAD
    <section id="que-es" ref={sectionRef} className="whatis-section">
      <div className="whatis__sep" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="whatis__header">
          <div className="section-label">Introducción</div>
          <h2 className="whatis__title">
            <span className="whatis__title-line">¿QUÉ ES</span>
            <span className="whatis__title-line whatis__title-accent">RENDERCAST?</span>
=======
    <section ref={sectionRef} className="whatis-section">
      <div className="whatis__separator" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="whatis__header">
          <div className="section-label whatis__label">Descripción</div>
          <h2 className="whatis__title">
            <span className="whatis__title-line">¿QUÉ ES</span>
            <span className="whatis__title-line whatis__title-line--accent">RENDERCAST?</span>
>>>>>>> 64ff79959b02ead10a1751ac8f2c0d6be30d67c6
          </h2>
        </div>

        <div ref={bodyRef} className="whatis__body">
<<<<<<< HEAD
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
=======
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
>>>>>>> 64ff79959b02ead10a1751ac8f2c0d6be30d67c6
        </div>
      </div>
    </section>
  );
}
