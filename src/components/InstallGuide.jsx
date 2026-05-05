import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/InstallGuide.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Descargar el instalador',
    content: (
      <>
        <p>
          Ve a la página de <strong>Releases</strong> del repositorio oficial en GitHub y descarga el
          archivo:
        </p>
        <div className="ig-file-badge">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="1" width="8" height="11" rx="1" stroke="currentColor" strokeWidth="1"/>
            <path d="M8 1v3h3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
          </svg>
          <span className="ig-file-badge__name">React to MP4 Setup 1.0.0.exe</span>
        </div>
        <a
          href="https://github.com/AHDesarrollador/HTML-TO-MP4/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="ig-link"
        >
          ↗ github.com/AHDesarrollador/HTML-TO-MP4/releases
        </a>
        <p className="ig-note">
          El archivo <code>.blockmap</code> que aparece junto al instalador es un archivo de metadatos
          interno. No es necesario descargarlo.
        </p>
      </>
    ),
  },
  {
    num: '02',
    title: 'Ejecutar el instalador',
    content: (
      <>
        <p>
          Haz doble clic en <code>React to MP4 Setup 1.0.0.exe</code>.
        </p>
        <div className="ig-warning">
          <div className="ig-warning__icon">🛡</div>
          <div>
            <div className="ig-warning__title">Advertencia de Windows SmartScreen</div>
            <p>
              El instalador aún no tiene firma de código de Microsoft. Para continuar:
            </p>
            <ol className="ig-warning__steps">
              <li>Haz clic en <strong>&ldquo;Más información&rdquo;</strong></li>
              <li>Luego en <strong>&ldquo;Ejecutar de todas formas&rdquo;</strong></li>
            </ol>
          </div>
        </div>
        <p>El asistente de instalación se abrirá.</p>
      </>
    ),
  },
  {
    num: '03',
    title: 'Seguir el asistente de instalación',
    content: (
      <>
        <p>El instalador NSIS guía el proceso en unos pocos pasos:</p>
        <ul className="ig-list">
          <li>
            <strong>Seleccionar carpeta de instalación</strong> — por defecto{' '}
            <code>C:\Program Files\React to MP4\</code>. Puedes cambiarlo a cualquier ruta.
          </li>
          <li>
            <strong>Crear accesos directos</strong> — el instalador crea automáticamente un acceso
            directo en el <em>Escritorio</em> y una entrada en el <em>Menú Inicio</em>.
          </li>
          <li>
            Haz clic en <strong>Instalar</strong> y espera a que termine (tarda menos de un minuto).
          </li>
          <li>Haz clic en <strong>Finalizar</strong>.</li>
        </ul>
      </>
    ),
  },
  {
    num: '04',
    title: 'Abrir RenderCast',
    content: (
      <>
        <p>Usa cualquiera de los accesos directos creados durante la instalación:</p>
        <div className="ig-shortcuts">
          <div className="ig-shortcut">
            <span className="ig-shortcut__key">Escritorio</span>
            <span className="ig-shortcut__arrow">→</span>
            <span className="ig-shortcut__label">doble clic en el icono <em>React to MP4</em></span>
          </div>
          <div className="ig-shortcut">
            <span className="ig-shortcut__key">Menú Inicio</span>
            <span className="ig-shortcut__arrow">→</span>
            <span className="ig-shortcut__label">busca <em>React to MP4</em></span>
          </div>
        </div>
        <p>La aplicación se abrirá directamente, sin pasos adicionales de configuración.</p>
      </>
    ),
  },
];

export default function InstallGuide() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const stepsRef   = useRef([]);
  const uninstRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      stepsRef.current.filter(Boolean).forEach((el, i) => {
        gsap.from(el, {
          x: -40, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
      gsap.from(uninstRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: uninstRef.current, start: 'top 88%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="guia-instalacion" ref={sectionRef} className="ig-section">
      <div className="ig__sep" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="ig__header">
          <div className="section-label">Guía de instalación</div>
          <h2 className="ig__title">
            <span className="ig__title-line">INSTRUCCIONES DE</span>
            <span className="ig__title-line ig__title-accent">INSTALACIÓN</span>
          </h2>
        </div>

        <div className="ig__timeline">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              className="ig-step"
            >
              <div className="ig-step__aside">
                <div className="ig-step__bubble">{step.num}</div>
                {i < steps.length - 1 && <div className="ig-step__line" />}
              </div>
              <div className="ig-step__body">
                <h3 className="ig-step__title">{step.title}</h3>
                <div className="ig-step__content">{step.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div ref={uninstRef} className="ig__uninstall">
          <h3 className="ig__uninstall-title">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 5h10M7 5V3h4v2M6 5v9a1 1 0 001 1h4a1 1 0 001-1V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Desinstalar
          </h3>
          <ol className="ig-list">
            <li>
              Ve a <strong>Configuración de Windows → Aplicaciones</strong>{' '}
              (o <em>Panel de control → Programas y características</em>)
            </li>
            <li>Busca <strong>React to MP4</strong></li>
            <li>Haz clic en <strong>Desinstalar</strong> y confirma</li>
          </ol>
          <p className="ig-note">
            Alternativamente, ejecuta el desinstalador desde la carpeta de instalación:{' '}
            <code>C:\Program Files\React to MP4\Uninstall React to MP4.exe</code>
          </p>
        </div>
      </div>
    </section>
  );
}
