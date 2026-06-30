export interface Restaurant {
  id: string
  name: string
  cuisine: string
  address: string
  neighborhood: string
  distance: string
  status: 'customer' | 'prospect' | 'dormant' | 'closed' | 'hot'
  priority: 'high' | 'medium' | 'low'
  rating: number
  revenue: string
  employees: number
  locations: number
  phone: string
  website: string
  instagram: string
  instagramFollowers: string
  tiktokActivity: string
  deliveryPlatforms: string[]
  hasLoyalty: boolean
  expansionStatus: 'expanding' | 'stable' | 'exploring' | 'new'
  closeProbability: number
  lastContact: string
  nextFollowUp: string
  ownerName: string
  managerName: string
  decisionMaker: string
  ownerBirthday: string
  favoriteTeam: string
  painPoints: string[]
  goals: string[]
  currentPromotion: string
  aiSummary: string
  openedDate: string
  hours: string
  coordinates: { lat: number; lng: number }
}

export interface RouteStop {
  id: string
  restaurantId: string
  order: number
  type: 'appointment' | 'follow-up' | 'prospect' | 'check-in'
  time?: string
  notes: string
  estimatedDuration: number
}

export interface TimelineEntry {
  id: string
  restaurantId: string
  type: 'call' | 'email' | 'text' | 'meeting' | 'note' | 'voice' | 'visit' | 'document' | 'contract'
  date: string
  time: string
  summary: string
  outcome?: string
  duration?: string
  nextStep?: string
}

export interface Objection {
  id: string
  category: string
  objection: string
  response: string
  roiPoint: string
  successStory: string
}

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: "Rosetta's Kitchen & Bar",
    cuisine: 'Italian',
    address: '260 N Canon Dr',
    neighborhood: 'Beverly Hills',
    distance: '0.4 mi',
    status: 'customer',
    priority: 'high',
    rating: 4.8,
    revenue: '$2.4M',
    employees: 42,
    locations: 2,
    phone: '(310) 555-0182',
    website: 'rosettaskitchen.com',
    instagram: '@rosettaskitchenla',
    instagramFollowers: '18.4K',
    tiktokActivity: 'High',
    deliveryPlatforms: ['DoorDash', 'UberEats', 'Grubhub'],
    hasLoyalty: true,
    expansionStatus: 'expanding',
    closeProbability: 92,
    lastContact: '3 days ago',
    nextFollowUp: 'Today 2:00 PM',
    ownerName: 'Marco Bellini',
    managerName: 'Sofia Ortega',
    decisionMaker: 'Marco Bellini',
    ownerBirthday: 'Nov 14',
    favoriteTeam: 'LA Lakers',
    painPoints: ['Staff turnover', 'Peak hour wait times', 'Online review management'],
    goals: ['Open 3rd location by Q4', 'Increase avg ticket size', 'Launch catering'],
    currentPromotion: 'Happy Hour 3–6 PM daily',
    aiSummary: "Marco responds best to data-driven conversations. He's expansion-focused and ROI-minded. Mention the Beverly Hills location's 23% revenue lift since onboarding. He loves talking basketball — open with Lakers talk. Best visit window: Tue/Thu 10–11:30 AM before lunch rush.",
    openedDate: '2018-03-12',
    hours: 'Mon–Sun 11 AM – 11 PM',
    coordinates: { lat: 34.0695, lng: -118.4003 }
  },
  {
    id: 'r2',
    name: 'Ember & Oak',
    cuisine: 'American Wood-Fire',
    address: '8442 Sunset Blvd',
    neighborhood: 'West Hollywood',
    distance: '1.2 mi',
    status: 'customer',
    priority: 'high',
    rating: 4.6,
    revenue: '$1.9M',
    employees: 31,
    locations: 1,
    phone: '(323) 555-0294',
    website: 'emberandoak.com',
    instagram: '@emberandoak',
    instagramFollowers: '24.1K',
    tiktokActivity: 'Very High',
    deliveryPlatforms: ['DoorDash', 'UberEats'],
    hasLoyalty: false,
    expansionStatus: 'exploring',
    closeProbability: 78,
    lastContact: '1 week ago',
    nextFollowUp: 'Today 4:30 PM',
    ownerName: 'Devon Walsh',
    managerName: 'Priya Nair',
    decisionMaker: 'Devon Walsh',
    ownerBirthday: 'Mar 8',
    favoriteTeam: 'LA Rams',
    painPoints: ['No loyalty program', 'Heavy social media spend with unclear ROI', 'Weekend staffing'],
    goals: ['Launch loyalty program', 'Expand to Silver Lake', 'Increase repeat visits'],
    currentPromotion: 'Sunday Roast special',
    aiSummary: "Devon is creative and brand-focused — not a numbers person initially, but responds once you connect the story to revenue. He's actively looking at loyalty programs. Lead with the Ember & Oak brand story angle, then bridge to metrics. TikTok content is his love language.",
    openedDate: '2020-09-01',
    hours: 'Tue–Sun 5 PM – 12 AM',
    coordinates: { lat: 34.0901, lng: -118.3700 }
  },
  {
    id: 'r3',
    name: 'Saffron Palace',
    cuisine: 'Modern Indian',
    address: '114 N Brand Blvd',
    neighborhood: 'Glendale',
    distance: '6.3 mi',
    status: 'prospect',
    priority: 'high',
    rating: 4.5,
    revenue: '$1.1M',
    employees: 22,
    locations: 1,
    phone: '(818) 555-0371',
    website: 'saffronpalacela.com',
    instagram: '@saffronpalacela',
    instagramFollowers: '9.2K',
    tiktokActivity: 'Medium',
    deliveryPlatforms: ['UberEats', 'Grubhub'],
    hasLoyalty: false,
    expansionStatus: 'stable',
    closeProbability: 61,
    lastContact: '2 weeks ago',
    nextFollowUp: 'Thu 11:00 AM',
    ownerName: 'Arjun Mehta',
    managerName: 'Preethi Sharma',
    decisionMaker: 'Arjun Mehta',
    ownerBirthday: 'Jul 22',
    favoriteTeam: 'India Cricket',
    painPoints: ['Low foot traffic on weekdays', 'High third-party delivery fees', 'No customer data'],
    goals: ['Build owned customer base', 'Reduce delivery platform dependence', 'Add catering arm'],
    currentPromotion: 'Lunch thali special $14',
    aiSummary: "Arjun is methodical and skeptical — he's been burned by marketing vendors before. Lead with customer ownership and data. Avoid selling hard on the first visit; he needs to trust you. Ask about his catering goals. Reference how similar Indian restaurant owners have reduced DoorDash dependency by 40%.",
    openedDate: '2019-11-18',
    hours: 'Mon–Sun 12 PM – 10 PM',
    coordinates: { lat: 34.1478, lng: -118.2541 }
  },
  {
    id: 'r4',
    name: 'Pacific Rim',
    cuisine: 'Pan-Asian',
    address: '2901 Ocean Ave',
    neighborhood: 'Santa Monica',
    distance: '3.8 mi',
    status: 'hot',
    priority: 'high',
    rating: 4.7,
    revenue: '$3.1M',
    employees: 55,
    locations: 3,
    phone: '(310) 555-0451',
    website: 'pacificrimla.com',
    instagram: '@pacificrimla',
    instagramFollowers: '41.2K',
    tiktokActivity: 'Very High',
    deliveryPlatforms: ['DoorDash', 'UberEats', 'Grubhub', 'Caviar'],
    hasLoyalty: false,
    expansionStatus: 'expanding',
    closeProbability: 84,
    lastContact: '4 days ago',
    nextFollowUp: 'Today 10:00 AM',
    ownerName: 'Lily Chen',
    managerName: 'James Tanaka',
    decisionMaker: 'Lily Chen',
    ownerBirthday: 'Feb 14',
    favoriteTeam: 'LA Sparks',
    painPoints: ['Managing loyalty across 3 locations', 'Inconsistent customer experience', 'App for ordering'],
    goals: ['Unified loyalty program', 'Open 4th location in Culver City', 'Launch mobile ordering'],
    currentPromotion: 'Weekday lunch deal $18.95',
    aiSummary: "Lily is a visionary operator running three locations and planning a fourth. She thinks in systems, not tactics. Lead with how you unify loyalty across all locations, then show the aggregated customer data. She's seen our solution at a competitor — address that head on. She's warm but decisive. Close on this visit.",
    openedDate: '2015-06-20',
    hours: 'Mon–Sun 11:30 AM – 11 PM',
    coordinates: { lat: 34.0195, lng: -118.4912 }
  },
  {
    id: 'r5',
    name: 'La Maison',
    cuisine: 'French Bistro',
    address: '11677 San Vicente Blvd',
    neighborhood: 'Brentwood',
    distance: '2.1 mi',
    status: 'dormant',
    priority: 'medium',
    rating: 4.4,
    revenue: '$850K',
    employees: 18,
    locations: 1,
    phone: '(310) 555-0612',
    website: 'lamaisonbrentwood.com',
    instagram: '@lamaisonbrentwood',
    instagramFollowers: '5.6K',
    tiktokActivity: 'Low',
    deliveryPlatforms: ['UberEats'],
    hasLoyalty: false,
    expansionStatus: 'stable',
    closeProbability: 38,
    lastContact: '3 months ago',
    nextFollowUp: 'Next week',
    ownerName: 'Céline Dupont',
    managerName: 'Henri Laurent',
    decisionMaker: 'Céline Dupont',
    ownerBirthday: 'Sep 5',
    favoriteTeam: 'None',
    painPoints: ['Post-COVID revenue recovery', 'Aging customer base', 'Competition from new openings'],
    goals: ['Attract younger demographic', 'Improve online presence', 'Add wine subscription'],
    currentPromotion: 'Prix fixe dinner $65',
    aiSummary: "Céline has been quiet since our last contract lapsed. Approach warmly — don't lead with the lapsed relationship. Mention the new younger customer targeting features, which align perfectly with her goal of attracting millennials. A handwritten note before this visit would go a long way.",
    openedDate: '2012-04-22',
    hours: 'Tue–Sun 5:30 PM – 10:30 PM',
    coordinates: { lat: 34.0490, lng: -118.4670 }
  },
  {
    id: 'r6',
    name: 'The Urban Farmhouse',
    cuisine: 'Brunch & Farm-to-Table',
    address: '1401 Echo Park Ave',
    neighborhood: 'Echo Park',
    distance: '4.5 mi',
    status: 'prospect',
    priority: 'medium',
    rating: 4.6,
    revenue: '$720K',
    employees: 15,
    locations: 1,
    phone: '(213) 555-0788',
    website: 'urbanfarmhouseep.com',
    instagram: '@urbanfarmhouseep',
    instagramFollowers: '14.8K',
    tiktokActivity: 'High',
    deliveryPlatforms: ['DoorDash'],
    hasLoyalty: false,
    expansionStatus: 'exploring',
    closeProbability: 55,
    lastContact: 'Never',
    nextFollowUp: 'Fri 9:00 AM',
    ownerName: 'Maya Goldstein',
    managerName: 'Tomás Rivera',
    decisionMaker: 'Maya Goldstein',
    ownerBirthday: 'Jun 30',
    favoriteTeam: 'Dodgers',
    painPoints: ['Weekend waitlist management', 'No way to capture walk-in data', 'Seasonal slowdowns'],
    goals: ['Convert waitlist to loyalty members', 'Launch midweek promotions', 'Hire sous chef'],
    currentPromotion: 'Free kids meal on weekdays',
    aiSummary: "Maya is a passionate food-first entrepreneur who's cautious about 'corporate solutions'. Lead with community and craft — show her how other indie restaurants like hers have used the platform authentically. She's active on TikTok and responds to creative pitches. Don't show up in a suit.",
    openedDate: '2021-08-15',
    hours: 'Sat–Sun 8 AM – 3 PM, Mon–Fri 9 AM – 2 PM',
    coordinates: { lat: 34.0780, lng: -118.2600 }
  },
  {
    id: 'r7',
    name: 'Nomad Kitchen',
    cuisine: 'Contemporary American',
    address: '833 S Alameda St',
    neighborhood: 'Arts District',
    distance: '5.1 mi',
    status: 'customer',
    priority: 'medium',
    rating: 4.5,
    revenue: '$1.3M',
    employees: 26,
    locations: 1,
    phone: '(213) 555-0934',
    website: 'nomadkitchendtla.com',
    instagram: '@nomadkitchendtla',
    instagramFollowers: '22.3K',
    tiktokActivity: 'Very High',
    deliveryPlatforms: ['DoorDash', 'UberEats'],
    hasLoyalty: true,
    expansionStatus: 'stable',
    closeProbability: 88,
    lastContact: '5 days ago',
    nextFollowUp: 'Wed 1:00 PM',
    ownerName: 'Carlos Reyes',
    managerName: 'Aisha Washington',
    decisionMaker: 'Carlos Reyes',
    ownerBirthday: 'Dec 3',
    favoriteTeam: 'Clippers',
    painPoints: ['Loyalty program engagement stagnated', 'Staff training consistency', 'Upsell at POS'],
    goals: ['Reactivate dormant loyalty members', 'Launch a chef collab series', 'Add private dining'],
    currentPromotion: 'Chef\'s tasting menu Thu–Sat',
    aiSummary: "Carlos is a loyal customer and brand ambassador. His main focus now is reactivating dormant loyalty members — show him the win-back campaign flow. He's planning a chef collaboration series and you could pitch a co-branded loyalty reward around it. He responds to enthusiasm and creativity.",
    openedDate: '2017-02-28',
    hours: 'Tue–Sun 11 AM – 11 PM',
    coordinates: { lat: 34.0370, lng: -118.2340 }
  },
  {
    id: 'r8',
    name: 'Marea Luna',
    cuisine: 'Modern Mexican',
    address: '2804 Sunset Blvd',
    neighborhood: 'Silver Lake',
    distance: '3.2 mi',
    status: 'prospect',
    priority: 'low',
    rating: 4.3,
    revenue: '$640K',
    employees: 12,
    locations: 1,
    phone: '(323) 555-1042',
    website: 'marealunasl.com',
    instagram: '@marealunasl',
    instagramFollowers: '8.7K',
    tiktokActivity: 'Medium',
    deliveryPlatforms: ['DoorDash', 'UberEats'],
    hasLoyalty: false,
    expansionStatus: 'stable',
    closeProbability: 32,
    lastContact: '1 month ago',
    nextFollowUp: 'Next month',
    ownerName: 'Elena Fuentes',
    managerName: 'Marco Villa',
    decisionMaker: 'Elena Fuentes',
    ownerBirthday: 'Apr 18',
    favoriteTeam: 'Chivas',
    painPoints: ['Budget constraints', 'Small team, limited bandwidth'],
    goals: ['Increase weekend revenue', 'Add a cocktail menu'],
    currentPromotion: 'Taco Tuesday $3 tacos',
    aiSummary: "Elena is budget-conscious. She's not ready to invest yet but is the right demographic to nurture. Keep contact warm with low-pressure check-ins. A good referral source when she's ready.",
    openedDate: '2022-01-10',
    hours: 'Wed–Mon 12 PM – 10 PM',
    coordinates: { lat: 34.0830, lng: -118.2620 }
  }
]

export const todayRoute: RouteStop[] = [
  { id: 'stop1', restaurantId: 'r4', order: 1, type: 'appointment', time: '10:00 AM', notes: 'Decision meeting — bring contract', estimatedDuration: 45 },
  { id: 'stop2', restaurantId: 'r1', order: 2, type: 'follow-up', time: '2:00 PM', notes: 'Check on loyalty campaign performance', estimatedDuration: 30 },
  { id: 'stop3', restaurantId: 'r2', order: 3, type: 'follow-up', time: '4:30 PM', notes: 'Loyalty program pitch — Devon is ready', estimatedDuration: 45 },
  { id: 'stop4', restaurantId: 'r3', order: 4, type: 'prospect', time: '6:00 PM', notes: 'First formal pitch — bring case studies', estimatedDuration: 30 },
]

export const timelineEntries: TimelineEntry[] = [
  {
    id: 't1', restaurantId: 'r1', type: 'visit',
    date: 'Jun 27', time: '11:15 AM',
    summary: 'In-person visit — discussed Q3 loyalty campaign',
    outcome: 'Positive — Marco approved $2,400 monthly budget',
    duration: '35 min', nextStep: 'Follow up with contract amendment'
  },
  {
    id: 't2', restaurantId: 'r1', type: 'email',
    date: 'Jun 25', time: '3:42 PM',
    summary: 'Sent monthly performance report — 18% lift in repeat visits',
    outcome: 'Opened, no reply yet',
    nextStep: 'Call if no reply by Jun 28'
  },
  {
    id: 't3', restaurantId: 'r1', type: 'call',
    date: 'Jun 20', time: '10:05 AM',
    summary: 'Discussed summer promotion strategy',
    outcome: 'Marco wants a happy hour reward tier by July 4',
    duration: '18 min', nextStep: 'Build happy hour campaign'
  },
  {
    id: 't4', restaurantId: 'r1', type: 'meeting',
    date: 'Jun 12', time: '2:00 PM',
    summary: 'Quarterly business review',
    outcome: 'Revenue up 23% YoY — strong renewal conversation',
    duration: '60 min', nextStep: 'Send renewal proposal'
  },
  {
    id: 't5', restaurantId: 'r1', type: 'contract',
    date: 'May 1', time: '9:00 AM',
    summary: 'Annual contract renewal signed — $28,800',
    outcome: 'Signed via DocuSign',
    nextStep: 'Onboarding kickoff'
  },
  {
    id: 't6', restaurantId: 'r1', type: 'voice',
    date: 'May 15', time: '1:30 PM',
    summary: 'Voice note after visit — Marco mentioned interest in catering loyalty rewards',
    nextStep: 'Research catering tier options'
  },
  {
    id: 't7', restaurantId: 'r1', type: 'note',
    date: 'Apr 18', time: '4:00 PM',
    summary: 'Marco\'s daughter plays soccer for Westside FC — great personal connection',
    nextStep: 'Remember for next visit'
  }
]

export const objections: Objection[] = [
  {
    id: 'o1',
    category: 'Pricing',
    objection: "It's too expensive for what we get.",
    response: "I completely understand — every dollar matters. Let me show you exactly what ROI our current customers in your tier generate. On average, restaurants your size see $4.20 returned for every $1 invested within 90 days. That's because we're not just a loyalty program — we're driving repeat visits that would otherwise go to a competitor. Can I show you a 90-day projection for your volume?",
    roiPoint: "Avg 4.2x ROI in 90 days. Break-even typically at day 47.",
    successStory: "Nomad Kitchen (Arts District) was skeptical on price. 8 months in, they attributed $180K in incremental revenue to the platform."
  },
  {
    id: 'o2',
    category: 'Timing',
    objection: "Not a good time — we're in the middle of a renovation.",
    response: "That's actually perfect timing. The best restaurants launch while they have a built-in news hook. Renovation equals buzz — we can build your loyalty base *before* you reopen, so on day one you have an audience ready to come in and celebrate with you. We've done this with three restaurants in LA and the reopening numbers are incredible.",
    roiPoint: "Pre-launch signups average 280 members before reopening.",
    successStory: "Ember & Oak launched during their patio renovation and had 400+ loyalty members on reopening day."
  },
  {
    id: 'o3',
    category: 'Competition',
    objection: "We already use [Competitor]. It's working fine.",
    response: "I'm glad you have something in place — that means you understand the value. I'm not here to replace what's working. What I'd love to do is show you a side-by-side of what you're getting versus what's possible. Most operators who've tried both say they didn't realize what they were missing until they saw the customer data depth we provide. Can I get 10 minutes on that comparison?",
    roiPoint: "Customers switching from top competitors see 31% higher member engagement avg.",
    successStory: "Pacific Rim switched from a competitor in March and hit their highest monthly loyalty revenue in May."
  },
  {
    id: 'o4',
    category: 'Tech',
    objection: "We don't have the bandwidth to manage another tech platform.",
    response: "That's the most common thing I hear — and it's exactly why our onboarding is built to take zero bandwidth from your team. We handle the setup, we train your staff in 20 minutes, and our system runs on autopilot after that. The average operator spends less than 30 minutes a month managing it. I'll sit next to you and show you how simple it is right now on my phone.",
    roiPoint: "Avg time to manage: 22 min/month. Setup time: 3 business days.",
    successStory: "La Maison ran the entire program for 6 months with a 2-person team and zero technical issues."
  },
  {
    id: 'o5',
    category: 'Trust',
    objection: "We tried something similar before and it didn't work.",
    response: "Tell me about that experience — what happened? (Listen.) Thank you for sharing that. What you're describing is exactly what we rebuilt our platform to fix. [Address specific issue they mentioned.] The reason it didn't work before wasn't the concept — it was execution. Here's what we do differently: [specific differentiator]. I'd rather show you than tell you. Can I set up a 30-day pilot, no commitment?",
    roiPoint: "Trial-to-close rate: 73%. Most pilots show results by week 3.",
    successStory: "Three of our top accounts had failed with other vendors before trying us."
  },
  {
    id: 'o6',
    category: 'Loyalty',
    objection: "Our customers are too regular — they come back anyway.",
    response: "Your regulars are your greatest asset and your biggest risk — because right now, you don't own that relationship. If they move, have a bad experience, or discover a competitor's program, you have no way to bring them back. What we're doing is turning those regulars into *enrolled* regulars — so you know who they are, can reach them directly, and can reward their loyalty in a way that makes them feel seen. That's the difference between a regular and a member.",
    roiPoint: "Enrolled regulars visit 2.3x more than non-enrolled regulars.",
    successStory: "Rosetta's Kitchen enrolled 1,200 regulars in month 1 — average spend increased 28%."
  }
]

export const nearbyOpportunities = [
  { id: 'n1', name: "Goldie's Brunch Bar", type: 'prospect', distance: '0.3 mi', fit: 'High', reason: 'No loyalty program, 4.7★, 180 weekly visits' },
  { id: 'n2', name: 'The Perch Rooftop', type: 'prospect', distance: '0.5 mi', fit: 'High', reason: 'Just hired 8 new staff — expansion signal' },
  { id: 'n3', name: 'Nori & Knife', type: 'dormant', distance: '0.7 mi', fit: 'Medium', reason: 'Last contact 4 months ago — needs re-engagement' },
  { id: 'n4', name: 'Cactus Rose', type: 'new', distance: '0.9 mi', fit: 'High', reason: 'Opened 6 weeks ago — building customer base' },
  { id: 'n5', name: 'Salt & Vine', type: 'competitor', distance: '1.1 mi', fit: 'Medium', reason: 'Using competitor — switch opportunity' },
  { id: 'n6', name: 'The Blueprint', type: 'prospect', distance: '1.4 mi', fit: 'High', reason: 'Strong TikTok following, no loyalty CRM' },
]

export const performanceData = {
  today: {
    visits: 3,
    calls: 7,
    emails: 12,
    meetings: 2,
    followUps: 5,
  },
  month: {
    revenue: 148500,
    target: 175000,
    deals: 4,
    visits: 47,
    conversionRate: 28,
    commissionEstimate: 8910,
  },
  week: [
    { day: 'Mon', visits: 6, revenue: 28000 },
    { day: 'Tue', visits: 8, revenue: 34000 },
    { day: 'Wed', visits: 5, revenue: 21000 },
    { day: 'Thu', visits: 7, revenue: 31000 },
    { day: 'Fri', visits: 9, revenue: 41000 },
    { day: 'Sat', visits: 4, revenue: 18000 },
    { day: 'Today', visits: 3, revenue: 14000 },
  ],
  aiScore: 87,
  routeEfficiency: 93,
  timeSavedHours: 6.5,
}

export const dailyBriefing = {
  date: 'Monday, June 30',
  weather: { temp: 76, condition: 'Sunny', icon: '☀️' },
  route: { stops: 4, miles: 28.3, driveTime: '1h 42m', revenue: '$340K pipeline' },
  insights: [
    {
      type: 'hot',
      title: 'Close Pacific Rim Today',
      body: "Lily Chen has visited your pricing page 3 times this week. AI confidence: 84%. This is your moment.",
      action: 'View Snapshot',
      restaurantId: 'r4'
    },
    {
      type: 'opportunity',
      title: "Ember & Oak Is Ready",
      body: 'Devon Walsh liked your last email and spent 7 minutes on the loyalty ROI calculator. Best time to visit: today 4–5 PM.',
      action: 'Add to Route',
      restaurantId: 'r2'
    },
    {
      type: 'alert',
      title: "La Maison: Re-engage Now",
      body: "Céline Dupont hasn't been contacted in 3 months. A competitor was seen there last week. Window is closing.",
      action: 'Plan Visit',
      restaurantId: 'r5'
    },
    {
      type: 'new',
      title: 'New Opening: The Perch Rooftop',
      body: "Opened 6 weeks ago, 0.5 miles from your 10 AM stop. 4.8★ on Google. Perfect ICP — no loyalty program yet.",
      action: 'View Profile',
      restaurantId: 'r3'
    },
    {
      type: 'expansion',
      title: "Rosetta's Opening 3rd Location",
      body: "Marco posted on Instagram about a new Culver City lease. Renewal and expansion conversation opportunity.",
      action: 'See Timeline',
      restaurantId: 'r1'
    }
  ]
}
