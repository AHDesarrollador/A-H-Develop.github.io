import { useEffect, useState } from 'react';
import '../diseños/Navbar.css';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#como-funciona', label: '¿Cómo funciona?' },
    { href: '#instalacion',   label: 'Instalación' },
    { href: '#comunidad',     label: 'Comunidad' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`}>
      <nav className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo">
          <div className="navbar__logo-mark">
            <span className="navbar__logo-icon">▶</span>
          </div>
          <span className="navbar__logo-text">
            Render<span className="navbar__logo-accent">Cast</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="navbar__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="navbar__cta-wrap">
          <a
            href="https://github.com/AHDesarrollador/HTML-TO-MP4.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary navbar__cta"
          >
            Descargar
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className={`navbar__hamburger-line ${menuOpen ? 'navbar__hamburger-line--top-open' : ''}`} />
          <span className={`navbar__hamburger-line ${menuOpen && 'navbar__hamburger-line--hidden'}`} />
          <span className={`navbar__hamburger-line ${menuOpen ? 'navbar__hamburger-line--bot-open' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/AHDesarrollador/HTML-TO-MP4.git"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary navbar__mobile-cta"
          >
            Descargar
          </a>
        </div>
      )}
    </header>
  );
}
