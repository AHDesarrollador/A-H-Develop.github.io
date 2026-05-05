import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/Download.css';

gsap.registerPlugin(ScrollTrigger);

const TABS = ['Descarga', 'Instalación', 'Primer uso'];

/* ─── Step data ──────────────────────────────────────────── */
const downloadSteps = [
  {
    num: '01',
    title: 'Abre el repositorio',
    desc: 'Ve al repositorio oficial de HTML to MP4 en GitHub y dirígete a la sección "Releases" en el panel lateral derecho.',
  },
  {
    num: '02',
    title: 'Descarga el instalador',
    desc: 'Selecciona la versión más reciente y descarga el archivo HTML-TO-MP4-Setup.exe (solo disponible para Windows por ahora).',
  },
  {
    num: '03',
    title: 'Listo para instalar',
    desc: 'Una vez descargado el archivo .exe, ejecutalo como administrador para iniciar el asistente de instalación.',
  },
];

const installSteps = [
  {
    num: '01',
    title: 'Ejecuta el instalador',
    desc: 'Haz doble clic en HTML-TO-MP4-Setup.exe. Si Windows SmartScreen lo bloquea, haz clic en "Más información" → "Ejecutar de todas formas".',
  },
  {
    num: '02',
    title: 'Elige la carpeta de destino',
    desc: 'El asistente te pedirá seleccionar dónde instalar la aplicación. Puedes dejar la ruta predeterminada o elegir una personalizada.',
  },
  {
    num: '03',
    title: 'Completa la instalación',
    desc: 'Haz clic en "Instalar" y espera unos segundos. Al finalizar, marca "Ejecutar HTML to MP4" y pulsa "Finalizar" para abrir la app.',
  },
];

const firstUseSteps = [
  {
    num: '01',
    title: 'Abre la aplicación',
    desc: 'Inicia HTML to MP4 desde el acceso directo del escritorio o el menú de inicio. La interfaz gráfica se abrirá lista para usar.',
  },
  {
    num: '02',
    title: 'Carga tu animación',
    desc: 'Arrastra tu archivo HTML o JSX al panel de entrada, o usa el botón "Abrir archivo". La previsualización se cargará automáticamente.',
  },
  {
    num: '03',
    title: 'Configura y exporta',
    desc: 'Ajusta los parámetros: resolución, FPS y duración. Cuando estés listo, haz clic en "Exportar MP4" y elige dónde guardar el video.',
  },
];

/* ─── Right-panel preview components ────────────────────── */
function DownloadPreview() {
  return (
    <div className="preview-card">
      <div className="preview-card__titlebar">
        <div className="preview-card__dots">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
        </div>
        <span className="preview-card__title">Explorador de archivos</span>
      </div>

      <div className="preview-card__body">
        {/* File info */}
        <div className="dl-file">
          <div className="dl-file__icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 14l4 4 4-4M13 9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="dl-file__info">
            <div className="dl-file__name">HTML-TO-MP4-Setup.exe</div>
            <div className="dl-file__meta">Windows x64 &nbsp;·&nbsp; v1.2.0 &nbsp;·&nbsp; 48.3 MB</div>
          </div>
        </div>

        <div className="dl-divider" />

        {/* Details */}
        {[
          { label: 'Plataforma', val: 'Windows 10 / 11' },
          { label: 'Arquitectura', val: 'x64 (64-bit)' },
          { label: 'Formato', val: '.exe — Instalador' },
          { label: 'Licencia', val: 'MIT — Open Source' },
        ].map(({ label, val }) => (
          <div key={label} className="dl-row">
            <span className="dl-row__label">{label}</span>
            <span className="dl-row__val">{val}</span>
          </div>
        ))}

        <div className="dl-divider" />

        {/* Progress bar (decorative) */}
        <div className="dl-progress-label">
          <span>Descargando...</span>
          <span className="dl-progress-pct">89%</span>
        </div>
        <div className="dl-progress-track">
          <div className="dl-progress-bar" />
        </div>
        <div className="dl-progress-sub">43.2 MB / 48.3 MB</div>

        <a
          href="https://github.com/AHDesarrollador/HTML-TO-MP4.git"
          target="_blank"
          rel="noopener noreferrer"
          className="dl-cta"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          Ir a GitHub Releases
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

function InstallerPreview() {
  return (
    <div className="preview-card preview-card--installer">
      <div className="preview-card__titlebar">
        <div className="preview-card__dots">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
        </div>
        <span className="preview-card__title">🛡 HTML to MP4 — Setup v1.2.0</span>
      </div>

      <div className="preview-card__body">
        <div className="installer__header">
          <div className="installer__icon">MP4</div>
          <div>
            <div className="installer__name">HTML to MP4</div>
            <div className="installer__sub">Asistente de instalación</div>
          </div>
        </div>

        <div className="dl-divider" />

        {/* Setup steps */}
        <div className="installer__steps">
          {[
            { label: 'Extraer archivos',           done: true },
            { label: 'Configurar entorno',          done: true },
            { label: 'Instalando componentes...',   active: true },
            { label: 'Crear acceso directo',        done: false },
            { label: 'Finalizar instalación',       done: false },
          ].map(({ label, done, active }) => (
            <div key={label} className={`installer__step ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
              <span className="installer__step-icon">
                {done   ? '✓' : active ? '▶' : '○'}
              </span>
              <span className="installer__step-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="dl-progress-label" style={{ marginTop: '1.2rem' }}>
          <span>Instalando...</span>
          <span className="dl-progress-pct">72%</span>
        </div>
        <div className="dl-progress-track">
          <div className="dl-progress-bar" style={{ width: '72%' }} />
        </div>

        {/* Buttons */}
        <div className="installer__btns">
          <button className="installer__btn installer__btn--ghost">&lt; Atrás</button>
          <button className="installer__btn installer__btn--primary">Siguiente &gt;</button>
          <button className="installer__btn installer__btn--cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

function AppUIPreview() {
  return (
    <div className="preview-card preview-card--app">
      <div className="preview-card__titlebar preview-card__titlebar--app">
        <div className="preview-card__dots">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
        </div>
        <span className="preview-card__title">HTML to MP4 — v1.2.0</span>
      </div>

      {/* Menu bar */}
      <div className="app__menubar">
        {['Archivo', 'Editar', 'Vista', 'Exportar', 'Ayuda'].map((m) => (
          <span key={m} className="app__menu-item">{m}</span>
        ))}
      </div>

      {/* Main pane */}
      <div className="app__panes">
        {/* Left: settings */}
        <div className="app__sidebar">
          <div className="app__sidebar-section">
            <div className="app__sidebar-label">Archivo de entrada</div>
            <div className="app__file-row">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1"/>
                <path d="M7 1v3h3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
              </svg>
              <span>animation.jsx</span>
            </div>
          </div>

          <div className="app__divider" />

          <div className="app__sidebar-section">
            <div className="app__sidebar-label">Configuración</div>
            {[
              { key: 'Resolución', val: '1920 × 1080' },
              { key: 'FPS',        val: '60' },
              { key: 'Duración',   val: '4.0 s' },
              { key: 'Formato',    val: 'MP4 / H.264' },
            ].map(({ key, val }) => (
              <div key={key} className="app__setting">
                <span className="app__setting-key">{key}</span>
                <span className="app__setting-val">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: preview */}
        <div className="app__preview">
          <div className="app__preview-screen">
            {/* Mini orbit animation */}
            <div className="app__preview-orbit">
              <div className="app__orbit-ring app__orbit-ring--outer" />
              <div className="app__orbit-ring app__orbit-ring--inner" />
              <div className="app__orbit-center" />
              <div className="app__orbit-dot app__orbit-dot--lime" />
            </div>
          </div>
          <button className="app__export-btn">
            ▶&nbsp; Exportar MP4
          </button>
        </div>
      </div>
    </div>
  );
}

const STEP_DATA = {
  Descarga:     downloadSteps,
  Instalación:  installSteps,
  'Primer uso': firstUseSteps,
};

const PREVIEWS = {
  Descarga:     <DownloadPreview />,
  Instalación:  <InstallerPreview />,
  'Primer uso': <AppUIPreview />,
};

/* ─── Main component ─────────────────────────────────────── */
export default function Download() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const contentRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Descarga');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });

      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="instalacion" ref={sectionRef} className="download-section">
      <div className="download__accent-line" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="download__header">
          <div className="section-label download__label">Guía de inicio</div>
          <h2 className="download__title">
            <span className="download__title-line">DESCARGA</span>
            <span className="download__title-line">
              E <span className="download__title-accent">INSTALACIÓN</span>
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="download__tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} className="install-grid">
          {/* Steps */}
          <div className="install-steps">
            {STEP_DATA[activeTab].map((step, i) => (
              <div key={`${activeTab}-${i}`} className="install-step">
                {i < STEP_DATA[activeTab].length - 1 && (
                  <div className="install-step__connector" aria-hidden="true" />
                )}
                <div className="install-step__bubble">{step.num}</div>
                <div className="install-step__text">
                  <h4 className="install-step__title">{step.title}</h4>
                  <p className="install-step__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic preview panel */}
          <div className="preview-panel">
            {PREVIEWS[activeTab]}
          </div>
        </div>
      </div>
    </section>
  );
}
