import Mark from './Mark'

/*
 * The six clubs in the bag, from the design handoff. Geometry is on the
 * handoff's 4px pixel grid; each club points at the section it opens.
 *
 * Construction: the shaft runs straight up the wrapper and the hosel
 * continues it, unrotated. Only the head group turns, pivoting at the top
 * of the hosel — so the face can be lofted without the shaft looking bent.
 */

const GROOVES =
  'repeating-linear-gradient(0deg, rgba(30,34,40,.5) 0 4px, rgba(0,0,0,0) 4px 10px)'

const px = (left, top, width, height, background, extra) => ({
  position: 'absolute',
  left,
  top,
  width,
  height,
  background,
  ...extra,
})

// A head group hangs above the shaft, pivoting at the top of the hosel.
// Its box is mostly empty air, so only the rects inside it take the pointer.
function Head({ left, top, width, height, origin, transform, children }) {
  return (
    <div
      className="club-head"
      style={{
        position: 'absolute',
        left,
        top,
        width,
        height,
        transformOrigin: origin,
        transform,
      }}
    >
      {children}
    </div>
  )
}

// The hosel, always in line with the shaft (wrapper x 111-129).
function Hosel({ top, height, color = '#b9c0cb', highlight = '#e6eaf0' }) {
  return (
    <>
      <div style={px(111, top, 18, height, color)} />
      {highlight && <div style={px(111, top, 8, height, highlight)} />}
    </>
  )
}

function IronHead({ variant }) {
  // 7 iron and wedge share a shape; the 9 iron is a touch narrower.
  if (variant === 'nine') {
    return (
      <>
        <div style={px(36, 0, 70, 8, '#e6eaf0')} />
        <div style={px(22, 8, 92, 8, '#cfd5de')} />
        <div style={px(14, 16, 104, 36, '#97a0ad', { backgroundImage: GROOVES })} />
        <div style={px(10, 16, 8, 36, '#e6eaf0')} />
        <div style={px(14, 52, 104, 12, '#5d6672')} />
        <div style={px(24, 64, 86, 10, '#cfd5de')} />
      </>
    )
  }
  if (variant === 'seven') {
    return (
      <>
        <div style={px(34, 0, 72, 8, '#e6eaf0')} />
        <div style={px(18, 8, 96, 8, '#cfd5de')} />
        <div style={px(10, 16, 108, 40, '#8b95a2', { backgroundImage: GROOVES })} />
        <div style={px(6, 16, 8, 40, '#e6eaf0')} />
        <div style={px(10, 56, 108, 12, '#5d6672')} />
        <div style={px(20, 68, 90, 10, '#cfd5de')} />
      </>
    )
  }
  return (
    <>
      <div style={px(34, 0, 72, 8, '#e6eaf0')} />
      <div style={px(18, 8, 96, 8, '#cfd5de')} />
      <div style={px(8, 16, 110, 34, '#8b95a2', { backgroundImage: GROOVES })} />
      <div style={px(4, 16, 8, 34, '#e6eaf0')} />
      <div style={px(8, 50, 110, 12, '#5d6672')} />
      <div style={px(16, 62, 94, 10, '#cfd5de')} />
    </>
  )
}

function DriverHead({ brand }) {
  return (
    <>
      <div style={px(56, 4, 104, 10, '#17191f')} />
      <div style={px(36, 14, 136, 10, '#22252c')} />
      <div style={px(22, 24, 160, 12, '#8f2630')} />
      <div style={px(12, 36, 178, 56, '#2a2d34')} />
      <div style={px(12, 36, 178, 6, '#3d424b')} />
      <div style={px(8, 92, 178, 12, '#8f2630')} />
      <div style={px(18, 104, 152, 12, '#22252c')} />
      <div style={px(38, 116, 112, 10, '#17191f')} />
      <div style={px(62, 126, 64, 8, '#101215')} />
      <div
        style={{
          position: 'absolute',
          left: 14,
          top: 40,
          width: 176,
          height: 50,
          display: 'grid',
          placeItems: 'center',
          transform: 'rotate(-3deg)',
        }}
      >
        <Mark cell={2} color="#f2e7cf" title={brand} />
      </div>
    </>
  )
}

function WoodHead({ mark }) {
  return (
    <>
      <div style={px(44, 0, 80, 10, '#3a3f47')} />
      <div style={px(26, 10, 112, 10, '#494f59')} />
      <div style={px(14, 20, 134, 48, '#565d68')} />
      <div style={px(14, 20, 134, 6, '#6e7580')} />
      <div style={px(10, 68, 138, 12, '#3a3f47')} />
      <div style={px(18, 80, 116, 10, '#8f2630')} />
      <div style={px(36, 90, 80, 8, '#22252c')} />
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 22,
          width: 94,
          height: 46,
          display: 'grid',
          placeItems: 'center',
          transform: 'scaleX(-1)',
        }}
      >
        {/* just the W off the wordmark, as a monogram */}
        <Mark cell={2} color="#e6dcc4" cols={[0, 26]} title={mark} />
      </div>
    </>
  )
}

function PutterHead() {
  return (
    <>
      <div style={px(14, 0, 172, 8, '#ded7bd')} />
      <div style={px(10, 8, 180, 18, '#b7ae93')} />
      <div style={px(10, 26, 180, 10, '#8b8269')} />
      <div style={px(16, 36, 168, 8, '#4c4636')} />
    </>
  )
}

export const CLUBS = [
  {
    id: 'wedge',
    left: 520,
    top: 270,
    width: 240,
    height: 290,
    rotate: -28,
    z: 2,
    section: 'rough',
    card: {
      name: 'WEDGE',
      label: 'HIMYM QUOTES',
    },
    head: (
      <>
        <Hosel top={-56} height={64} />
        {/* the most lofted club in the bag: toe drooped well below the others */}
        <Head left={3} top={-96} width={130} height={104} origin="117px 40px" transform="rotate(14deg)">
          <IronHead variant="wedge" />
        </Head>
      </>
    ),
  },
  {
    id: 'driver',
    left: 580,
    top: 120,
    width: 240,
    height: 440,
    rotate: -13,
    z: 6,
    section: 'who',
    card: {
      name: 'DRIVER',
      label: 'WHO I AM',
    },
    head: (
      <>
        <Hosel top={-30} height={42} color="#17191f" highlight={null} />
        {/* pivot sits inside the cover's bottom band so the neck stays buried */}
        <Head left={-67} top={-128} width={210} height={140} origin="185px 98px" transform="rotate(8deg)">
          <DriverHead brand="Wilson" />
        </Head>
      </>
    ),
  },
  {
    id: 'iron',
    left: 620,
    top: 130,
    width: 240,
    height: 430,
    rotate: -4,
    z: 8,
    section: 'toolkit',
    card: {
      name: '7 IRON',
      label: 'TECH STACK',
    },
    head: (
      <>
        <Hosel top={-56} height={64} />
        <Head left={3} top={-100} width={130} height={108} origin="117px 44px" transform="rotate(15deg)">
          <IronHead variant="seven" />
        </Head>
      </>
    ),
  },
  {
    id: 'iron2',
    left: 660,
    top: 230,
    width: 240,
    height: 330,
    rotate: -1,
    z: 7,
    section: 'off',
    card: {
      name: '9 IRON',
      label: 'OFF THE COURSE',
    },
    head: (
      <>
        <Hosel top={-56} height={64} />
        <Head
          left={3}
          top={-96}
          width={130}
          height={104}
          origin="117px 40px"
          transform="rotate(-8deg) scaleX(-1)"
        >
          <IronHead variant="nine" />
        </Head>
      </>
    ),
  },
  {
    id: 'wood',
    left: 690,
    top: 150,
    width: 240,
    height: 410,
    rotate: 14,
    z: 4,
    section: 'work',
    card: {
      name: '5 WOOD',
      label: 'WORK',
    },
    head: (
      <>
        <Hosel top={-32} height={44} color="#33373e" highlight={null} />
        {/* pivot sits inside the cover's body, not in the notch below it */}
        <Head
          left={-20}
          top={-108}
          width={160}
          height={120}
          origin="140px 76px"
          transform="rotate(-16deg) scaleX(-1)"
        >
          <WoodHead mark="W" />
        </Head>
      </>
    ),
  },
  {
    id: 'putter',
    left: 760,
    top: 260,
    width: 240,
    height: 300,
    rotate: 24,
    z: 3,
    section: 'contact',
    card: {
      name: 'PUTTER',
      label: 'GET IN TOUCH',
    },
    head: (
      <>
        <Hosel top={-32} height={40} />
        <Head left={81} top={-64} width={200} height={72} origin="39px 32px" transform="rotate(-30deg)">
          <PutterHead />
        </Head>
      </>
    ),
  },
]
