import '../diseños/Marquee.css';

const leftItems = [
  'HTML → MP4',
  'React → MP4',
  'CSS Animations',
  'GSAP → MP4',
  'Framer Motion',
  'Lottie → MP4',
  'Three.js → MP4',
  'Canvas → MP4',
];

const rightItems = [
  'EXPORT',
  'RENDER',
  'ANIMATE',
  'CREATE',
  'SHIP',
  'RECORD',
  'ENCODE',
  'DEPLOY',
];

export default function Marquee() {
  const leftDouble  = [...leftItems,  ...leftItems];
  const rightDouble = [...rightItems, ...rightItems];

  return (
    <div className="marquee-wrapper">
      {/* Strip 1 — dark bg, moves left */}
      <div className="marquee-strip-dark">
        <div className="marquee-track-left">
          {leftDouble.map((item, i) => (
            <div
              key={i}
              className={`marquee-item-left ${i % 3 === 0 ? 'marquee-item-left--accent' : ''}`}
            >
              <span className="marquee-dot marquee-dot--dark" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Strip 2 — lime bg, moves right */}
      <div className="marquee-strip-lime">
        <div className="marquee-track-right">
          {rightDouble.map((item, i) => (
            <div key={i} className="marquee-item-right">
              <span className="marquee-dot marquee-dot--lime" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
