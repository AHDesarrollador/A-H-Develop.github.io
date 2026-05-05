import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import WhatIs from './components/WhatIs.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Download from './components/Download.jsx';
import FutureFeatures from './components/FutureFeatures.jsx';
import Social from './components/Social.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="app-root">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <WhatIs />
        <HowItWorks />
        <Download />
        <FutureFeatures />
        <Social />
      </main>
      <Footer />
    </div>
  );
}
