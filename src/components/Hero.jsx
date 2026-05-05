import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../diseños/Hero.css';

const CodeLine = ({ indent = 0, children }) => (
  <div style={{ '--indent': indent }} className="code-line">{children}</div>
);

function ProductMockup() {
  return (
    <div className="mockup">
      {/* Code editor */}
      <div className="code-block mockup__code-body" style={{ padding: 0, fontSize: '0.72rem' }}>
        <div className="code-block__header">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
          <span className="code-block__filename">animation.jsx</span>
        </div>
        <div className="code-block__body mockup__code-body">
          <CodeLine>
            <span className="s-kw">import</span> <span className="s-fn">React</span>{' '}
            <span className="s-kw">from</span>{' '}
            <span className="s-str">'react'</span>
          </CodeLine>
          <CodeLine><br /></CodeLine>
          <CodeLine>
            <span className="s-kw">const</span>{' '}
            <span className="s-fn">Circle</span> = () =&gt; (
          </CodeLine>
          <CodeLine indent={1}>
            <span className="s-tag">&lt;div</span>{' '}
            <span className="s-attr">style</span>={'{{'}
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">width</span>:{' '}
            <span className="s-str">'80px'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">height</span>:{' '}
            <span className="s-str">'80px'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">borderRadius</span>:{' '}
            <span className="s-str">'50%'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">background</span>:{' '}
            <span className="s-str">'#c5ff2e'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">animation</span>:{' '}
            <span className="s-str">'spin 1s linear infinite'</span>
          </CodeLine>
          <CodeLine indent={1}>
            {'}}'}
            <span className="s-tag">/&gt;</span>
          </CodeLine>
          <CodeLine>)</CodeLine>
        </div>
      </div>

      {/* Arrow */}
      <div className="mockup__arrow">
        <div className="mockup__arrow-btn">→</div>
        <span className="mockup__arrow-label">render</span>
      </div>

      {/* Video preview */}
      <div className="mockup__video">
        <div className="mockup__video-titlebar">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
          <span className="mockup__video-filename">output.mp4</span>
        </div>

        <div className="mockup__video-canvas">
          <div className="mockup__orbit-wrapper">
            <div className="mockup__orbit-ring mockup__orbit-ring--outer" />
            <div className="mockup__orbit-ring mockup__orbit-ring--inner" />
            <div className="mockup__orbit-center" />
            <div className="mockup__orbit-dot mockup__orbit-dot--lime" />
            <div className="mockup__orbit-dot mockup__orbit-dot--blue" />
          </div>
          <div className="mockup__scanline" />
        </div>

        <div className="mockup__controls">
          <span className="mockup__controls-play">⏸</span>
          <div className="mockup__controls-progress">
            <div className="mockup__controls-bar" />
          </div>
          <span className="mockup__controls-time">00:04</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef     = useRef(null);
  const words       = useRef([]);
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const mockupRef   = useRef(null);
  const badgeRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.7 })
        .from(
          words.current.filter(Boolean),
          { y: 120, opacity: 0, duration: 1.1, stagger: 0.07, skewX: -4 },
          '-=0.3'
        )
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
        .from(ctaRef.current.children, { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.6')
        .from(mockupRef.current, { x: 50, opacity: 0, duration: 1.2 }, '-=1.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['CONVIERTE', 'ANIMACIONES', 'EN', 'VIDEO'];

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__glow hero__glow--lime" aria-hidden="true" />
      <div className="hero__glow hero__glow--red"  aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="hero-grid">
          {/* LEFT — Text */}
          <div>
            <div ref={badgeRef} className="section-label hero__badge">
              HTML &amp; React to MP4
            </div>

            <h1 className="hero__title">
              {titleWords.map((word, i) => (
                <span key={i} className="hero__title-line">
                  <span
                    ref={(el) => (words.current[i] = el)}
                    className={`hero__title-word ${i === 3 ? 'hero__title-word--accent' : ''}`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p ref={subtitleRef} className="hero__subtitle">
              RenderCast captura cada fotograma de tus animaciones{' '}
              <em>HTML</em>, <em>React</em>, <em>Next.js</em> y <em>Remotion</em> y las convierte en archivos{' '}
              <strong>MP4</strong> de alta calidad. Sin navegadores visibles, sin grabación de pantalla.
            </p>

            <div ref={ctaRef} className="hero__cta">
              <a href="https://github.com/AHDesarrollador/HTML-TO-MP4.git" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9M4 7l4 4 4-4M1 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Descargar gratis
              </a>
              <a href="#como-funciona" className="btn-ghost">
                Ver cómo funciona
              </a>
            </div>

            <div className="hero__stats">
              {[
                { val: '24fps', label: 'Máx. framerate' },
                { val: '1080p',    label: 'Max. Resolución' },
                { val: 'GUI & CLI',   label: 'Con GUI' },
              ].map(({ val, label }) => (
                <div key={val}>
                  <div className="hero__stat-val">{val}</div>
                  <div className="hero__stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Mockup */}
          <div ref={mockupRef}>
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import '../diseños/Hero.css';

const CodeLine = ({ indent = 0, children }) => (
  <div style={{ '--indent': indent }} className="code-line">{children}</div>
);

function ProductMockup() {
  return (
    <div className="mockup">
      {/* Code editor */}
      <div className="code-block mockup__code-body" style={{ padding: 0, fontSize: '0.72rem' }}>
        <div className="code-block__header">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
          <span className="code-block__filename">animation.jsx</span>
        </div>
        <div className="code-block__body mockup__code-body">
          <CodeLine>
            <span className="s-kw">import</span> <span className="s-fn">React</span>{' '}
            <span className="s-kw">from</span>{' '}
            <span className="s-str">'react'</span>
          </CodeLine>
          <CodeLine><br /></CodeLine>
          <CodeLine>
            <span className="s-kw">const</span>{' '}
            <span className="s-fn">Circle</span> = () =&gt; (
          </CodeLine>
          <CodeLine indent={1}>
            <span className="s-tag">&lt;div</span>{' '}
            <span className="s-attr">style</span>={'{{'}
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">width</span>:{' '}
            <span className="s-str">'80px'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">height</span>:{' '}
            <span className="s-str">'80px'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">borderRadius</span>:{' '}
            <span className="s-str">'50%'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">background</span>:{' '}
            <span className="s-str">'#c5ff2e'</span>,
          </CodeLine>
          <CodeLine indent={2}>
            <span className="s-attr">animation</span>:{' '}
            <span className="s-str">'spin 1s linear infinite'</span>
          </CodeLine>
          <CodeLine indent={1}>
            {'}}'}
            <span className="s-tag">/&gt;</span>
          </CodeLine>
          <CodeLine>)</CodeLine>
        </div>
      </div>

      {/* Arrow */}
      <div className="mockup__arrow">
        <div className="mockup__arrow-btn">→</div>
        <span className="mockup__arrow-label">render</span>
      </div>

      {/* Video preview */}
      <div className="mockup__video">
        <div className="mockup__video-titlebar">
          <span className="code-block__dot" style={{ background: '#ff5f57' }} />
          <span className="code-block__dot" style={{ background: '#ffbd2e' }} />
          <span className="code-block__dot" style={{ background: '#28c840' }} />
          <span className="mockup__video-filename">output.mp4</span>
        </div>

        <div className="mockup__video-canvas">
          <div className="mockup__orbit-wrapper">
            <div className="mockup__orbit-ring mockup__orbit-ring--outer" />
            <div className="mockup__orbit-ring mockup__orbit-ring--inner" />
            <div className="mockup__orbit-center" />
            <div className="mockup__orbit-dot mockup__orbit-dot--lime" />
            <div className="mockup__orbit-dot mockup__orbit-dot--blue" />
          </div>
          <div className="mockup__scanline" />
        </div>

        <div className="mockup__controls">
          <span className="mockup__controls-play">⏸</span>
          <div className="mockup__controls-progress">
            <div className="mockup__controls-bar" />
          </div>
          <span className="mockup__controls-time">00:04</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef     = useRef(null);
  const words       = useRef([]);
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const mockupRef   = useRef(null);
  const badgeRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.7 })
        .from(
          words.current.filter(Boolean),
          { y: 120, opacity: 0, duration: 1.1, stagger: 0.07, skewX: -4 },
          '-=0.3'
        )
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
        .from(ctaRef.current.children, { y: 20, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.6')
        .from(mockupRef.current, { x: 50, opacity: 0, duration: 1.2 }, '-=1.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleWords = ['CONVIERTE', 'ANIMACIONES', 'EN', 'VIDEO'];

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__glow hero__glow--lime" aria-hidden="true" />
      <div className="hero__glow hero__glow--red"  aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="hero-grid">
          {/* LEFT — Text */}
          <div>
            <div ref={badgeRef} className="section-label hero__badge">
              HTML &amp; React to MP4
            </div>

            <h1 className="hero__title">
              {titleWords.map((word, i) => (
                <span key={i} className="hero__title-line">
                  <span
                    ref={(el) => (words.current[i] = el)}
                    className={`hero__title-word ${i === 3 ? 'hero__title-word--accent' : ''}`}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p ref={subtitleRef} className="hero__subtitle">
              CodeReel captura cada fotograma de tus animaciones{' '}
              <em>HTML</em> y <em>React</em> y las convierte en archivos{' '}
              <strong>MP4</strong> de alta calidad. Sin navegadores visibles, sin grabación de pantalla.
            </p>

            <div ref={ctaRef} className="hero__cta">
              <a href="https://github.com/AHDesarrollador/HTML-TO-MP4.git" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9M4 7l4 4 4-4M1 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Descargar gratis
              </a>
              <a href="#como-funciona" className="btn-ghost">
                Ver cómo funciona
              </a>
            </div>

            <div className="hero__stats">
              {[
                { val: '60fps', label: 'Máx. framerate' },
                { val: '4K',    label: 'Max. Resolución' },
                { val: 'GUI & CLI',   label: 'Con GUI' },
              ].map(({ val, label }) => (
                <div key={val}>
                  <div className="hero__stat-val">{val}</div>
                  <div className="hero__stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Mockup */}
          <div ref={mockupRef}>
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
