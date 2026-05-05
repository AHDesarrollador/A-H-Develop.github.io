import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import WhatIs from './components/WhatIs.jsx';
import WhatIs from './components/WhatIs.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import InternalDetails from './components/InternalDetails.jsx';
import Download from './components/Download.jsx';
import InstallGuide from './components/InstallGuide.jsx';
import Limitations from './components/Limitations.jsx';
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
        <WhatIs />
        <HowItWorks />
        <InternalDetails />
        <Download />
        <InstallGuide />
        <Limitations />
        <FutureFeatures />
        <Social />
      </main>
      <Footer />
    </div>
  );
}
