// All site content, preserved from the previous (Mac/Notes) edition of the site.
// The legacy implementation lives in /legacy; the copy here is carried over verbatim.

export const hero = {
  name: 'wilson li',
  tagline: "here's a glimpse into my life.",
  taglineSub: 'not everything about me, but enough to get the idea',
  // Written for the Notes-app edition of the site. Nothing renders it now —
  // kept only so the copy is not lost. The legacy site still uses it.
  notebook:
    "notes has become a go to app for me. whether that is scribbling down tim horton's orders for my friends, writing down my thoughts, or reminders of what my friends love, what ive realized is that my notes have become a memorabilia of who I am today.",
  currently: [
    '2A software engineering at waterloo',
    'software developer @ port443',
    "project developer @ uw blueprint (food4kids)",
  ],
  video: {
    src: '/images/waterloocrestsmiski.mp4',
    label: 'click here to watch me draw my smiski waterloo crest again',
  },
}

export const about = {
  title: "hi, i'm wilson li",
  intro:
    'I am a software engineering student at the University of Waterloo who learns best by building. Personal projects are my way of exploring my interests and especially testing ideas; more often than not those ideas fail but I never fail to learn from them. Many of these projects grow out of my interest in sports, where I enjoy exploring how mathematical models and statistical reasoning are used to make sense of performance and prediction. What keeps me interested is the process itself, starting with an imperfect idea, learning from its failures, and slowly refining it into a coherent and useful fullstack application. That constant learning and cycle of iteration is what keeps me going.',
  photo: { src: '/images/wilson-about.png', alt: 'Wilson Li' },
  facts: [
    {
      text: '– software engineering student at the university of waterloo',
      icons: [{ src: '/images/waterloocrest.png', alt: 'Waterloo crest' }],
    },
    { text: '– i like building personal projects and learning by doing', icons: [] },
    { text: '– this site is my notebook for ideas, projects, and things in progress', icons: [] },
    { text: '– grew up just outside of philadelphia', icons: [] },
    {
      text: '– big philly pride',
      icons: [{ src: '/images/libertybell.png', alt: 'Liberty bell' }],
    },
    {
      text: '– huge eagles fan: go birds dh',
      icons: [{ src: '/images/eagles.png', alt: 'Eagles logo' }],
    },
    {
      text: '– love watching sports, especially the nfl and nba',
      icons: [
        { src: '/images/nfl.png', alt: 'NFL logo' },
        { src: '/images/nba.png', alt: 'NBA logo' },
      ],
    },
    {
      text: '– love to play poker',
      icons: [{ src: '/images/poker.png', alt: 'Poker' }],
    },
    {
      text: '– outside of school i stay active: soccer + gym',
      icons: [
        { src: '/images/soccer.png', alt: 'Soccer' },
        { src: '/images/gym.png', alt: 'Gym' },
      ],
    },
    {
      text: '– training for my first half marathon this fall',
      icons: [{ src: '/images/run.png', alt: 'Running' }],
    },
    {
      text: '– also into music and art',
      icons: [
        { src: '/images/music.png', alt: 'Music' },
        { src: '/images/art.png', alt: 'Art' },
      ],
    },
  ],
}

export const projects = {
  title: 'projects',
  description: 'side projects and lessons learned:',
  descriptionSub: 'documentation of what i learned while building these projects',
  items: [
    {
      id: 'courtiq',
      name: 'CourtIQ',
      position: 'LLM · ML',
      tech: 'python, fastapi, postgresql, pgvector, openai api, docker, aws',
      blurb:
        "ask it anything about the box scores in plain english, or pull the day's picks and simulate how often a slip actually cashes",
      // A slot with `youtube` opens the player instead of the picture; `src` is
      // the still it shows in the row until then.
      images: [
        {
          src: '/images/courtiq-demo.jpg',
          alt: 'CourtIQ demo',
          youtube: 'APjUfBE8fqs',
        },
        { src: '/images/courtiq1.png', alt: 'CourtIQ factor analysis for a single pick' },
        { src: '/images/courtiq2.png', alt: 'CourtIQ Monte Carlo simulation of a bet slip' },
      ],
      // carried over from the resume
      bullets: [
        '– full-stack NBA chatbot combining text-to-SQL generation, semantic news search (pgvector), and prop betting analysis across 7 materialized views and 75+ years of box score data',
        '– calibrated prop-prediction engine using EWMA, Bayesian shrinkage, and Platt scaling, achieving a 0.153 Brier score across 880K walk-forward predictions',
        '– hardened text-to-SQL pipeline with GPT-4o self-repair, read-only execution, and query safeguards across 1.45M box-score rows',
        '– production deployment pipeline on Docker multi-stage builds, Docker Compose, and GitHub Actions CI; API secured with credit-weighted rate limiting and token budgets to control LLM costs',
      ],
      // TODO(wilson): your three lines here — what building it taught you.
      // Until this has entries the row simply omits the block, so it is safe
      // to leave empty. The other projects' `lessons` are the model.
      lessons: [],
    },
    {
      id: 'handtracker',
      name: 'nfl playbook handtracker',
      position: 'CV · 3D',
      tech: 'python, opencv, mediapipe, three.js, supabase',
      blurb: 'heavily inspired by being an eagles fan and wanting to explore computer vision',
      images: [
        { src: '/images/handtracker1.png', alt: 'Hand Tracker 1' },
        { src: '/images/handtracker2.png', alt: 'Hand Tracker 2' },
      ],
      bullets: [
        '– uses real-time hand tracking to control input and interactions',
        '– renders an interactive 3D football field using Three.js',
        '– draws and edits football routes through gesture-based input',
        '– stores and replays custom play designs for later use',
      ],
      lessons: [
        '– Working on something I cared about made learning easier',
        '– Hand tracking needs temporal smoothing and gesture state transitions',
        '– 3D route rendering depends on consistent coordinate mapping',
      ],
    },
    {
      id: 'uway',
      name: 'uway',
      position: 'FULLSTACK',
      tech: 'react, javascript, fastapi, python, sql, rest apis, json',
      blurb: 'built for se101 after we realized how brutally cold it is in waterloo',
      images: [
        { src: '/images/uway1.png', alt: 'Uway 1' },
        { src: '/images/uway2.png', alt: 'Uway 2' },
      ],
      bullets: [
        '– parses pasted Quest schedules with Python and regex into clean structured data',
        '– uses dijkstra’s algorithm to compute the shortest indoor paths between classes',
        '– serves schedule and location data through an API for routing logic',
        '– provides a web interface for users to visualize their schedules',
      ],
      lessons: [
        '– project ideas are hidden in plain sight',
        '– finally understood version control with git',
        '– learned the importance of user feedback in shaping features and agile development',
      ],
    },
    {
      id: 'nbaengine',
      name: 'Probabilistic NBA Analytics Engine',
      position: 'ML · STATS',
      tech: 'python, pandas, numpy, scikit-learn, matplotlib, mongodb, fastapi',
      blurb:
        'A probabilistic NBA analytics system that models team total outcomes using leakage-safe machine learning, uncertainty-aware statistics, and interactive analysis.',
      images: [
        { src: '/images/nbaengine1.png', alt: 'NBA Engine 1' },
        { src: '/images/nbaengine2.png', alt: 'NBA Engine 2' },
      ],
      bullets: [
        '– Built a leakage-safe ML pipeline using past-only data and walk-forward backtesting',
        '– Modeled outcomes as calibrated probabilities instead of binary predictions.',
        '– Quantified event relationships and uncertainty with Bayesian smoothing and bootstrap methods.',
        '– Incorporated player tracking data for more accurate event modeling.',
      ],
      lessons: [
        '– handling lots of data is hard',
        '– learned the importance of feature engineering',
        '– gained experience with model evaluation and backtesting techniques',
      ],
    },
    {
      id: 'waypost',
      name: 'waypost',
      position: 'HACKATHON · 2ND',
      tech: 'fastapi, react, tailwind css, firebase, cloudinary',
      blurb:
        "new hacks 2025 2nd place - circular tourist economy. built on energy drinks and midnight mcd's",
      images: [
        { src: '/images/waypost1.png', alt: 'Waypost 1' },
        { src: '/images/waypost2.png', alt: 'Waypost 2' },
        { src: '/images/waypost3.png', alt: 'Waypost 3' },
      ],
      bullets: [
        '– Built a circular-economy platform to reduce tourist waste',
        '– Designed backend data models to represent items, availability windows, and locations',
        '– Implemented point system for users to earn rewards',
        '– Stored point balances and transaction history in the backend for consistency',
      ],
      lessons: [
        '– no matter how hard things get, having friends to go through it with you makes it 10x easier',
        '– learned i can sit and code for 24 hours',
        '– mcdonalds tastes 1000x better at 2am',
      ],
    },
  ],
}

export const gym = {
  title: 'gym routine',
  description:
    'i like to stay active and go to the gym, here is the workout split ive used for the last 3 year (p.s. i have kinda been slacking on legs)',
  descriptionSub:
    'i follow this routine twice a week and go about 5-6 times a week. if its 5 days then its because i only felt like hitting legs once that week',
  days: [
    {
      title: 'Chest + back:',
      exercises: [
        { reps: '2x8', name: 'barbell bench press' },
        { reps: '2x8', name: 'lat pulldown' },
        { reps: '2x8', name: 'incline dumbell press' },
        { reps: '2x8', name: 'cable rows' },
        { reps: '2x8', name: 'machine chest flies' },
        { reps: '2x10', name: 'machine reverse flies' },
      ],
    },
    {
      title: 'Arms:',
      exercises: [
        { reps: '2x8', name: 'dumbell shoulder press' },
        { reps: '2x8', name: 'preacher curl' },
        { reps: '2x8', name: 'single arm tricep extensions' },
        { reps: '2x10', name: 'lat raises' },
        { reps: '2x8', name: 'hammer curls' },
        { reps: '2x8', name: 'tricep pushdowns' },
      ],
    },
    {
      title: 'legs and abs (i really hate this day + all drop sets):',
      exercises: [
        { reps: '3x6', name: 'barbell squat' },
        { reps: '2x12', name: 'calf extensions' },
        { reps: '2x10', name: 'hamstring curls' },
        { reps: '2x10', name: 'quad extensions' },
        { reps: '2x12', name: 'decline abs' },
        { reps: '2x15', name: 'cable crunch' },
      ],
    },
  ],
}

export const photos = {
  title: 'photos',
  description: 'a collection of some of my favorite memories. click on any of them to enlarge',
  // The six that appear in the gallery grid, in order. To swap one, put a
  // different filename here and re-run `npm run thumbs` so it gets a small
  // version for the grid — the originals are 3-6k px wide and far too heavy
  // to decode into a 200px cell.
  featured: [
    'IMG_0001.webp',
    'IMG_4926.webp',
    'IMG_4933.webp',
    'IMG_0003.webp',
    'IMG_6209.webp',
    'IMG_6738.webp',
  ],
  items: [
    { src: '/images/IMG_0001.webp', description: "se30 except eugene was sick and kevin's batman" },
    { src: '/images/IMG_0002.webp', description: 'antelope canyon, arizona' },
    { src: '/images/IMG_0003.webp', description: 'senior prom' },
    { src: '/images/IMG_0004.webp', description: 'yantai, shandong' },
    { src: '/images/IMG_0032.webp', description: 'beach' },
    { src: '/images/IMG_0569.webp', description: 'first time in toronto' },
    { src: '/images/IMG_0579.webp', description: 'eaton centre' },
    { src: '/images/IMG_0587.webp', description: 'downtown toronto' },
    { src: '/images/IMG_0622.webp', description: 'philadelphia' },
    { src: '/images/IMG_0960.webp', description: 'waterloo in a nutshell' },
    { src: '/images/IMG_1003.webp', description: 'first snowfall ive seen in waterloo' },
    { src: '/images/IMG_1036.webp', description: 'view from black friday air bnb' },
    { src: '/images/IMG_1049.webp', description: 'turns out cactus club does not serve cactus' },
    { src: '/images/IMG_1278.webp', description: 'new york window display' },
    { src: '/images/IMG_1706.webp', description: 'horseshoe bend, arizona' },
    { src: '/images/IMG_2367.webp', description: 'vegas - my favorite city of all time' },
    { src: '/images/IMG_3074.webp', description: 'cool canyon but i forgot where' },
    { src: '/images/IMG_3129.webp', description: 'yellowstone national park' },
    { src: '/images/IMG_3131.webp', description: 'yellowstone sunset' },
    { src: '/images/IMG_4926.webp', description: 'high school graduation, class of 2025' },
    { src: '/images/IMG_4933.webp', description: 'maine' },
    { src: '/images/IMG_5444_jpg.webp', description: 'japan' },
    { src: '/images/IMG_5855.webp', description: 'times square' },
    { src: '/images/IMG_5942.webp', description: 'rockefeller center' },
    { src: '/images/IMG_6093.webp', description: 'cool japanese garden' },
    { src: '/images/IMG_6105.webp', description: 'texas' },
    { src: '/images/IMG_6209.webp', description: 'friends in my dorm' },
    { src: '/images/IMG_6735.webp', description: 'home sweet home' },
    { src: '/images/IMG_6738.webp', description: 'cool sunset in my neighborhood' },
    { src: '/images/IMG_7025.webp', description: 'RV trip!' },
    { src: '/images/IMG_9482.webp', description: 'japan' },
    { src: '/images/IMG_9590.webp', description: 'yantai, shandong' },
    { src: '/images/IMG_9709.webp', description: 'plane view' },
    { src: '/images/IMG_9723.webp', description: 'cool japan photo' },
    { src: '/images/IMG_9736.webp', description: 'another cool japan photo' },
    { src: '/images/IMG_9771.webp', description: 'gyubeeeee' },
  ],
}

export const quotes = {
  title: 'quotes from himym',
  description:
    'how i met your mother is one of my favorite shows of all time along side ted lasso and suits. here are some of the quotes that resonated with me and what i think',
  image: { src: '/images/himym.png', alt: 'How I Met Your Mother' },
  items: [
    {
      quote:
        '"and most importantly, whatever you do in this life, it\'s not legendary unless your friends are there to see it"',
      thought:
        'This is my favorite quote from the entire show. And it’s true. What’s there to celebrate without the people who saw you through ups and downs',
    },
    {
      quote:
        '"you will be shocked kids, when you discover how easy it is in life to part ways with people forever. that\'s why when you find someone you wanna keep around, you do something about it"',
      thought:
        "It's easy to let people slip away, but when you find someone worth keeping, you have to make an effort to hold on to them.",
    },
    {
      quote:
        '"you can ask the universe for all the signs you want but ultimately, we only see what we want to see when we\'re ready to see it"',
      thought: 'dont tunnel vision on what you think you want. be open to the possibilities',
    },
    {
      quote: '"sometimes things have to fall apart to make way for better things"',
      thought: 'failing is part of the process',
    },
    {
      quote:
        '"kids, you can\'t cling to the past because no matter how hard you hold on, it\'s already gone"',
      thought: 'let go of what was and embrace what is',
    },
    {
      quote:
        '"because sometimes even if you know how something\'s going to end, that doesn\'t mean you can\'t enjoy the ride"',
      thought: "we're here for a fun time not a long time",
    },
    {
      quote:
        '"shouldn\'t we hold out for the person who doesn\'t just tolerate our little quirks but actually kinda likes them"',
      thought: "when the right person shows up, you'll know",
    },
  ],
}

export const contact = {
  title: 'get in touch',
  description:
    'feel free to reach out whenever if youd like to connect about anything. im a pretty fast responder and will get back to you asap. here are some of my contacts:',
  links: [
    { id: 'github', label: 'github', href: 'https://github.com/wilson-li3', external: true },
    { id: 'linkedin', label: 'linkedin', href: 'https://www.linkedin.com/in/wilsonli3', external: true },
    {
      id: 'devpost',
      label: 'devpost',
      href: 'https://devpost.com/wilson-li3?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav',
      external: true,
    },
    { id: 'email', label: 'wyli@uwaterloo.ca', href: 'mailto:wyli@uwaterloo.ca', external: false },
  ],
}

export const doodle = {
  hint: "scribble something — it's your note",
}

// The course: 18 holes, par 72 (front nine 36, back nine 36).
// Each hole plays from a lie — tee / fairway / rough / bunker / green —
// which picks the little animated scene at the top of the hole.
export const holes = [
  { n: 1, par: 4, yds: 377, name: 'tee off', kind: 'hero', lie: 'tee' },
  { n: 2, par: 3, yds: 156, name: 'from wilson’s notebook', kind: 'notebook', lie: 'fairway' },
  { n: 3, par: 5, yds: 524, name: 'currently', kind: 'currently', lie: 'rough' },
  { n: 4, par: 3, yds: 178, name: 'clubhouse tv', kind: 'tv', lie: 'green' },
  { n: 5, par: 4, yds: 401, name: 'hi, i’m wilson li', kind: 'about', lie: 'fairway' },
  { n: 6, par: 4, yds: 366, name: 'player facts', kind: 'facts', lie: 'rough' },
  { n: 7, par: 4, yds: 428, name: 'nfl playbook handtracker', kind: 'project', project: 'handtracker', lie: 'bunker' },
  { n: 8, par: 4, yds: 395, name: 'uway', kind: 'project', project: 'uway', lie: 'fairway' },
  { n: 9, par: 5, yds: 547, name: 'probabilistic nba analytics engine', kind: 'project', project: 'nbaengine', lie: 'rough' },
  { n: 10, par: 4, yds: 412, name: 'waypost', kind: 'project', project: 'waypost', lie: 'tee' },
  { n: 11, par: 4, yds: 388, name: 'chest + back', kind: 'gym', day: 0, lie: 'rough' },
  { n: 12, par: 4, yds: 342, name: 'arms', kind: 'gym', day: 1, lie: 'fairway' },
  { n: 13, par: 5, yds: 561, name: 'legs and abs', kind: 'gym', day: 2, lie: 'bunker' },
  { n: 14, par: 3, yds: 143, name: 'photos', kind: 'photos', lie: 'green' },
  { n: 15, par: 4, yds: 405, name: 'quotes from himym', kind: 'quotes', lie: 'fairway' },
  { n: 16, par: 4, yds: 359, name: 'get in touch', kind: 'contact', lie: 'rough' },
  { n: 17, par: 3, yds: 121, name: 'the practice green', kind: 'doodle', lie: 'green' },
  { n: 18, par: 5, yds: 533, name: 'sign your scorecard', kind: 'finish', lie: 'green' },
]

export const lieLabels = {
  tee: 'off the tee',
  fairway: 'from the fairway',
  rough: 'from the rough',
  bunker: 'from the bunker',
  green: 'on the green',
}

export const theTurn = {
  afterHole: 9,
  label: 'the turn',
  note: 'quick tim horton’s run before the back nine',
}

// Legacy routes from the Notes-era site → sections on the content stage.
// Every value must be an id in SECTIONS (see src/pixel/sections.js); anything
// else quietly lands on the first section. The gym routine and the practice
// green are no longer on the site, so their old routes go to the nearest
// section rather than 404.
export const legacyRoutes = {
  '/about': 'who',
  '/projects': 'work',
  '/contact': 'contact',
  '/quotes-himym': 'rough',
  '/photos': 'off',
  '/gym-routine': 'off',
  '/doodle': 'contact',
}
