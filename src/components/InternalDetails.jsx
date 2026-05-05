import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../diseños/InternalDetails.css';

gsap.registerPlugin(ScrollTrigger);

const TABS = ['Pipeline', 'Detección', 'Características', 'CLI'];

const detectionRows = [
  {
    type: 'Remotion',
    condition: 'package.json contiene remotion o @remotion/*',
    strategy: 'Delega el render a npx remotion render. No usa captura de frames',
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

const exportParams = [
  { param: 'Resolución (ancho)', values: 'Cualquier valor en px',           def: '1920' },
  { param: 'Resolución (alto)',  values: 'Cualquier valor en px',           def: '1080' },
  { param: 'FPS',                values: '24 / 30 / 60 (GUI) · cualquier número (CLI)', def: '30' },
  { param: 'Duración',           values: '1–300 s (GUI) · cualquier número (CLI)', def: '5 s' },
  { param: 'Formato',            values: 'MP4 (.mp4) · H.264 raw (.264)',   def: 'MP4' },
  { param: 'Nombre del archivo', values: 'Cualquier texto',                 def: 'output.mp4' },
];

const presets = [
  { name: '1080p', res: '1920 × 1080', fps: '24' },
];

function PipelineTab() {
  return (
    <div className="id-pipeline">
      <div className="id-code-wrap">
        <div className="code-block">
          <div className="code-block__header">
            <span className="code-block__dot" style={{ background: '#ff5f57' }} />
            <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
            <span className="code-block__dot" style={{ background: '#28c840' }} />
            <span className="code-block__filename">pipeline.txt</span>
          </div>
          <div className="code-block__body id-pipeline__code">
            <div className="id-phase"><span className="id-phase__tag id-phase__tag--blue">Fase 1 — BUILD</span></div>
            <div className="id-phase__line">  Detecta el tipo de proyecto → instala dependencias → compila → levanta servidor HTTP local</div>
            <br/>
            <div className="id-phase"><span className="id-phase__tag id-phase__tag--lime">Fase 2 — CAPTURE</span></div>
            <div className="id-phase__line">  Abre el navegador en modo headless → congela el reloj virtual del DOM →</div>
            <div className="id-phase__line">  avanza el tiempo cuadro a cuadro → captura cada frame como PNG</div>
            <br/>
            <div className="id-phase"><span className="id-phase__tag id-phase__tag--red">Fase 3 — ENCODE</span></div>
            <div className="id-phase__line">  Toma todos los PNG de la carpeta temporal → codifica con FFmpeg (H.264, CRF 18) →</div>
            <div className="id-phase__line">  guarda el MP4 final → limpia los archivos temporales</div>
          </div>
        </div>
      </div>

      <div className="id-info-grid">
        <div className="id-info-card">
          <div className="id-info-card__icon id-info-card__icon--blue">🌐</div>
          <h4 className="id-info-card__title">Captura de frames</h4>
          <p className="id-info-card__text">
            Se usa la API de Chrome DevTools Protocol (<code>Emulation.setVirtualTimePolicy</code>) para
            congelar y avanzar el tiempo virtual del DOM, garantizando que CSS animations,{' '}
            <code>requestAnimationFrame</code>, <code>setTimeout</code> y <code>Date.now()</code> se
            mueven exactamente un intervalo de frame por captura.
          </p>
          <ul className="id-info-card__list">
            <li>Electron (escritorio): API nativa <code>capturePage()</code></li>
            <li>CLI: Puppeteer con Chromium embebido</li>
            <li>Canvas WebGL: parche de <code>getContext()</code> con <code>preserveDrawingBuffer: true</code></li>
          </ul>
        </div>
        <div className="id-info-card">
          <div className="id-info-card__icon id-info-card__icon--lime">🎬</div>
          <h4 className="id-info-card__title">Codificación de video</h4>
          <ul className="id-info-card__list">
            <li>Codec: <strong>H.264</strong> (<code>libx264</code>)</li>
            <li>Espacio de color: <code>yuv420p</code> (máxima compatibilidad)</li>
            <li>Calidad: <strong>CRF 18</strong> (alta calidad visual)</li>
            <li>Preset: <code>fast</code></li>
            <li>FFmpeg incluido en la app (<code>ffmpeg-static</code>). No requiere instalación separada.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DetectionTab() {
  return (
    <div className="id-detection">
      <p className="id-detection__intro">
        RenderCast identifica el proyecto de entrada y aplica la estrategia correcta según el contenido
        de <code>package.json</code>:
      </p>
      <div className="id-table-wrap">
        <table className="id-table">
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
                <td><strong>{row.type}</strong></td>
                <td><code>{row.condition}</code></td>
                <td>{row.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FeaturesTab() {
  return (
    <div className="id-features">
      <div className="id-feature-block">
        <h4 className="id-feature-block__title">Interfaz de escritorio (Electron)</h4>
        <ul className="id-feat-list">
          <li><strong>Menú superior</strong> — Archivo, Editar, Vista, Exportar y Ayuda</li>
          <li><strong>Barra de estado</strong> en tiempo real con fase y porcentaje</li>
          <li><strong>Panel lateral</strong> con cuatro secciones: Archivo, Explorador, Cola de proyectos y Configuración</li>
          <li><strong>Área de previsualización</strong> — animación orbital 16:9 con indicador de tiempo</li>
          <li><strong>Línea de tiempo</strong> — controles play/pause, seek y marcas de segundos</li>
          <li><strong>Modal de exportación</strong> — fase actual, barra de progreso y botón para abrir carpeta de destino</li>
          <li><strong>Drag &amp; drop</strong> — arrastra carpetas o archivos <code>.jsx</code> / <code>.html</code> directamente</li>
        </ul>
      </div>

      <div className="id-feature-block">
        <h4 className="id-feature-block__title">Modo batch (cola de proyectos)</h4>
        <ul className="id-feat-list">
          <li>Agrega múltiples proyectos con diferentes rutas de entrada y salida</li>
          <li>Procesamiento en orden <strong>FIFO</strong> (uno a la vez)</li>
          <li>Estado por trabajo: <code>en espera</code> → <code>procesando X%</code> → <code>listo</code> / <code>error</code></li>
          <li>Barra de progreso individual por trabajo activo</li>
          <li>Contador de trabajos totales, activos, en cola y completados</li>
        </ul>
      </div>

      <div className="id-feature-block">
        <h4 className="id-feature-block__title">Opciones de exportación</h4>
        <div className="id-table-wrap">
          <table className="id-table">
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Valores</th>
                <th>Por defecto</th>
              </tr>
            </thead>
            <tbody>
              {exportParams.map((r) => (
                <tr key={r.param}>
                  <td>{r.param}</td>
                  <td>{r.values}</td>
                  <td><code>{r.def}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h5 className="id-presets-title">Presets rápidos (GUI)</h5>
        <div className="id-table-wrap">
          <table className="id-table">
            <thead>
              <tr>
                <th>Preset</th>
                <th>Resolución</th>
                <th>FPS</th>
              </tr>
            </thead>
            <tbody>
              {presets.map((p) => (
                <tr key={p.name}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.res}</td>
                  <td>{p.fps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CLITab() {
  return (
    <div className="id-cli">
      <p className="id-cli__intro">
        Disponible como herramienta independiente (<code>r2mp4</code>) para integraciones y
        automatizaciones:
      </p>
      <div className="terminal">
        <div className="terminal__header">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
          <span className="terminal__title">terminal</span>
        </div>
        <div className="terminal__body">
          <div className="terminal__line">
            <span className="terminal__prompt">#</span>
            <span className="terminal__output">Conversión individual</span>
          </div>
          <div className="terminal__line">
            <span className="terminal__prompt">$</span>
            <span className="terminal__cmd">r2mp4 convert -i ./mi-animacion -o ./videos -w 1920 -h 1080 -f 30 -d 10 -n demo.mp4</span>
          </div>
          <br />
          <div className="terminal__line">
            <span className="terminal__prompt">#</span>
            <span className="terminal__output">Batch desde un archivo JSON</span>
          </div>
          <div className="terminal__line">
            <span className="terminal__prompt">$</span>
            <span className="terminal__cmd">r2mp4 batch -b ./trabajos.json</span>
          </div>
          <div className="terminal__line">
            <span className="terminal__cursor" />
          </div>
        </div>
      </div>
      <div className="id-cli__flags">
        {[
          { flag: '-i', desc: 'Carpeta del proyecto de entrada' },
          { flag: '-o', desc: 'Carpeta de salida del MP4' },
          { flag: '-w', desc: 'Ancho en píxeles' },
          { flag: '-h', desc: 'Alto en píxeles' },
          { flag: '-f', desc: 'Frames por segundo' },
          { flag: '-d', desc: 'Duración en segundos' },
          { flag: '-n', desc: 'Nombre del archivo de salida' },
          { flag: '-b', desc: 'Archivo JSON con lista de trabajos batch' },
        ].map(({ flag, desc }) => (
          <div key={flag} className="id-cli__flag">
            <code className="id-cli__flag-name">{flag}</code>
            <span className="id-cli__flag-desc">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TAB_CONTENT = {
  Pipeline:       <PipelineTab />,
  Detección:      <DetectionTab />,
  Características:<FeaturesTab />,
  CLI:            <CLITab />,
};

export default function InternalDetails() {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const contentRef  = useRef(null);
  const [activeTab, setActiveTab] = useState('Pipeline');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.from(contentRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="funcionamiento" ref={sectionRef} className="id-section">
      <div className="id__sep" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="id__header">
          <div className="section-label">Documentación técnica</div>
          <h2 className="id__title">
            <span className="id__title-line">FUNCIONAMIENTO</span>
            <span className="id__title-line id__title-accent">INTERNO</span>
          </h2>
        </div>

        <div className="id__tabs">
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

        <div ref={contentRef} className="id__content">
          {TAB_CONTENT[activeTab]}
        </div>
      </div>
    </section>
  );
}
