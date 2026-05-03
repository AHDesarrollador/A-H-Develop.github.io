import '../diseños/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Logo */}
        <div className="footer__logo">
          <div className="footer__logo-mark">
            <span className="footer__logo-icon">▶</span>
          </div>
          <span className="footer__logo-text">
            Code<span className="footer__logo-accent">Reel</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="footer__copyright">
          © {new Date().getFullYear()} CodeReel — MIT License
        </p>

        {/* Links */}
        <nav className="footer__links">
          {['GitHub', 'Docs', 'Changelog'].map((link) => (
            <a key={link} href="#" className="footer__link">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
