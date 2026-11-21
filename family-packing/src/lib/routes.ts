// Every route in design/screens.md, with the screen it will become.
// scripts/check-routes.mjs fails the gate when a route here or in screens.md
// has no file under app/.

export type ScreenRoute = {
  id: string;
  title: string;
  /** The route as written in design/screens.md. */
  route: string;
  /** A concrete path to open it, with sample values for [params]. */
  href: string;
  source: string;
};

export const SAMPLE_ID = 'sample';

export const screenRoutes: ScreenRoute[] = [
  { id: 'S01a', title: 'Home', route: '/', href: '/', source: 'Main.dc.html' },
  { id: 'S02', title: 'Trip basics', route: '/trips/new', href: '/trips/new', source: 'Describe.dc.html' },
  { id: 'S03', title: "Scout's questions", route: '/trips/new/questions', href: '/trips/new/questions', source: 'Clarify.dc.html' },
  { id: 'S04', title: 'Trip ticket review', route: '/trips/new/review', href: '/trips/new/review', source: 'Review.dc.html' },
  { id: 'S04b', title: 'Generating', route: '/trips/new/generating', href: '/trips/new/generating', source: 'Generating.dc.html' },
  { id: 'S04c', title: 'Generation failed', route: '/trips/new/error', href: '/trips/new/error', source: 'GenError.dc.html' },
  { id: 'S05', title: 'Trip home', route: '/trips/[id]', href: `/trips/${SAMPLE_ID}`, source: 'Reveal.dc.html' },
  { id: 'S06', title: 'Packing workspace', route: '/trips/[id]/pack', href: `/trips/${SAMPLE_ID}/pack`, source: 'Pack.dc.html' },
  { id: 'S10', title: 'Bags', route: '/trips/[id]/bags', href: `/trips/${SAMPLE_ID}/bags`, source: 'Bags.dc.html' },
  { id: 'D1', title: 'All packed', route: '/trips/[id]/done', href: `/trips/${SAMPLE_ID}/done`, source: 'Done.dc.html' },
  { id: 'S01e', title: 'Past and archived trips', route: '/trips/past', href: '/trips/past', source: 'PastTrips.dc.html' },
  { id: 'S09', title: "Crew and Scout's memory", route: '/family', href: '/family', source: 'Crew.dc.html' },
  { id: 'S09b', title: 'One person', route: '/family/[id]', href: `/family/${SAMPLE_ID}`, source: 'Profile.dc.html' },
  { id: 'S09b', title: 'Add a person', route: '/family/new', href: '/family/new', source: 'Profile.dc.html' },
  { id: 'S12', title: 'Pack like a past trip', route: '/trips/new/from/[id]', href: `/trips/new/from/${SAMPLE_ID}`, source: 'Repeat.dc.html' },
  { id: 'S11', title: 'Pack together', route: '/household', href: '/household', source: 'Share.dc.html' },
  { id: 'A1', title: 'Account and settings', route: '/account', href: '/account', source: 'Account.dc.html' },
  { id: 'S09c', title: 'What Scout remembers', route: '/family/memory', href: '/family/memory', source: 'Memory.dc.html' },
  { id: 'A2', title: 'Your data and privacy', route: '/account/privacy', href: '/account/privacy', source: 'Privacy.dc.html' },
];

export function screenFor(route: string): ScreenRoute {
  const screen = screenRoutes.find((entry) => entry.route === route);
  if (!screen) throw new Error(`No screen for route ${route}`);
  return screen;
}
