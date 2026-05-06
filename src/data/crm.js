// ─── Sales reps ───────────────────────────────────────────────────────────────

export const OWNERS = [
  { id: 'o1', name: 'Sam Pierce',  initials: 'SP', quota: 600000 },
  { id: 'o2', name: 'Maria Gould', initials: 'MG', quota: 450000 },
  { id: 'o3', name: 'Alex Torres', initials: 'AT', quota: 500000 },
  { id: 'o4', name: 'Nina Watts',  initials: 'NW', quota: 400000 },
]

// ─── Companies ────────────────────────────────────────────────────────────────

export const COMPANIES = [
  { id: 'c1',  name: 'Axiom Labs',         domain: 'axiom.io',           industry: 'Developer Tools',      employees: 120,  arr: 2400000,  activeDeals: 2, contacts: 2, owner: 'Sam Pierce'  },
  { id: 'c2',  name: 'Stride Labs',        domain: 'stridelabs.com',     industry: 'Infrastructure',       employees: 340,  arr: 8100000,  activeDeals: 1, contacts: 3, owner: 'Sam Pierce'  },
  { id: 'c3',  name: 'Draftbit',           domain: 'draftbit.co',        industry: 'No-code',              employees: 45,   arr: 600000,   activeDeals: 1, contacts: 1, owner: 'Maria Gould' },
  { id: 'c4',  name: 'Loop AI',            domain: 'loopai.com',         industry: 'AI / ML',              employees: 210,  arr: 12000000, activeDeals: 1, contacts: 2, owner: 'Sam Pierce'  },
  { id: 'c5',  name: 'Fable',              domain: 'fableapp.io',        industry: 'Media Tech',           employees: 80,   arr: 1200000,  activeDeals: 1, contacts: 1, owner: 'Maria Gould' },
  { id: 'c6',  name: 'Planet HQ',          domain: 'planethq.com',       industry: 'Real Estate Tech',     employees: 160,  arr: 3600000,  activeDeals: 1, contacts: 2, owner: 'Sam Pierce'  },
  { id: 'c7',  name: 'Routebase',          domain: 'routebase.io',       industry: 'Logistics Tech',       employees: 55,   arr: 900000,   activeDeals: 1, contacts: 1, owner: 'Maria Gould' },
  { id: 'c8',  name: 'Crest Data',         domain: 'crestdata.ai',       industry: 'Data & Analytics',     employees: 290,  arr: 6000000,  activeDeals: 0, contacts: 2, owner: 'Sam Pierce'  },
  { id: 'c9',  name: 'Meridian Health',    domain: 'meridianhealth.io',  industry: 'Healthcare Tech',      employees: 450,  arr: 9200000,  activeDeals: 1, contacts: 2, owner: 'Alex Torres' },
  { id: 'c10', name: 'Stackify',           domain: 'stackify.dev',       industry: 'DevOps',               employees: 85,   arr: 1800000,  activeDeals: 0, contacts: 1, owner: 'Nina Watts'  },
  { id: 'c11', name: 'Cloudwise',          domain: 'cloudwise.io',       industry: 'Cloud Infrastructure', employees: 520,  arr: 15000000, activeDeals: 1, contacts: 2, owner: 'Alex Torres' },
  { id: 'c12', name: 'Tessera',            domain: 'tessera.design',     industry: 'Design Tools',         employees: 35,   arr: 400000,   activeDeals: 1, contacts: 1, owner: 'Nina Watts'  },
  { id: 'c13', name: 'Vantage AI',         domain: 'vantageai.com',      industry: 'AI / ML',              employees: 175,  arr: 7500000,  activeDeals: 0, contacts: 1, owner: 'Alex Torres' },
  { id: 'c14', name: 'Plexus Networks',    domain: 'plexusnet.com',      industry: 'Networking',           employees: 310,  arr: 11000000, activeDeals: 1, contacts: 2, owner: 'Sam Pierce'  },
  { id: 'c15', name: 'GreenPath',          domain: 'greenpath.earth',    industry: 'CleanTech',            employees: 95,   arr: 2100000,  activeDeals: 0, contacts: 1, owner: 'Nina Watts'  },
  { id: 'c16', name: 'Nomadly',            domain: 'nomadly.app',        industry: 'Travel Tech',          employees: 140,  arr: 3300000,  activeDeals: 0, contacts: 1, owner: 'Maria Gould' },
  { id: 'c17', name: 'Harbinger Security', domain: 'harbingersec.com',   industry: 'Cybersecurity',        employees: 230,  arr: 8800000,  activeDeals: 1, contacts: 2, owner: 'Alex Torres' },
  { id: 'c18', name: 'Finova',             domain: 'finova.finance',     industry: 'FinTech',              employees: 380,  arr: 18000000, activeDeals: 1, contacts: 2, owner: 'Sam Pierce'  },
]

// ─── People / Contacts ────────────────────────────────────────────────────────

export const PEOPLE = [
  { id: 'p1',  name: 'Olivia Hartman',  email: 'o.hartman@axiom.io',         role: 'VP of Engineering',    company: 'Axiom Labs',         companyId: 'c1',  avatar: 'OH', color: '#FF7A59', lastActivity: '2026-04-28', dealValue: 48000,  stage: 'proposal',    tags: ['champion', 'technical']       },
  { id: 'p2',  name: 'Marcus Chen',     email: 'm.chen@stridelabs.com',      role: 'CTO',                  company: 'Stride Labs',        companyId: 'c2',  avatar: 'MC', color: '#0091AE', lastActivity: '2026-05-01', dealValue: 120000, stage: 'negotiation', tags: ['decision-maker']              },
  { id: 'p3',  name: 'Priya Nair',      email: 'priya@draftbit.co',          role: 'Head of Product',      company: 'Draftbit',           companyId: 'c3',  avatar: 'PN', color: '#F5C26B', lastActivity: '2026-04-22', dealValue: 24000,  stage: 'qualified',   tags: ['champion']                    },
  { id: 'p4',  name: 'James Whitfield', email: 'j.whitfield@loopai.com',     role: 'CEO',                  company: 'Loop AI',            companyId: 'c4',  avatar: 'JW', color: '#00BDA5', lastActivity: '2026-04-30', dealValue: 200000, stage: 'negotiation', tags: ['decision-maker', 'executive'] },
  { id: 'p5',  name: 'Sofia Reyes',     email: 's.reyes@fableapp.io',        role: 'Director of Ops',      company: 'Fable',              companyId: 'c5',  avatar: 'SR', color: '#F2545B', lastActivity: '2026-04-18', dealValue: 36000,  stage: 'prospect',    tags: []                              },
  { id: 'p6',  name: 'Tom Eriksson',    email: 't.eriksson@planethq.com',    role: 'CFO',                  company: 'Planet HQ',          companyId: 'c6',  avatar: 'TE', color: '#7A5AF8', lastActivity: '2026-04-25', dealValue: 85000,  stage: 'proposal',    tags: ['decision-maker']              },
  { id: 'p7',  name: 'Aisha Bello',     email: 'aisha@routebase.io',         role: 'Product Lead',         company: 'Routebase',          companyId: 'c7',  avatar: 'AB', color: '#00BDA5', lastActivity: '2026-04-12', dealValue: 18000,  stage: 'qualified',   tags: ['technical']                   },
  { id: 'p8',  name: 'Ravi Sharma',     email: 'ravi@crestdata.ai',          role: 'COO',                  company: 'Crest Data',         companyId: 'c8',  avatar: 'RS', color: '#FF7A59', lastActivity: '2026-05-02', dealValue: 67000,  stage: 'closed_won',  tags: ['champion', 'decision-maker']  },
  { id: 'p9',  name: 'Dmitri Volkov',   email: 'd.volkov@meridianhealth.io', role: 'CTO',                  company: 'Meridian Health',    companyId: 'c9',  avatar: 'DV', color: '#0091AE', lastActivity: '2026-04-29', dealValue: 145000, stage: 'proposal',    tags: ['decision-maker', 'technical'] },
  { id: 'p10', name: 'Carmen Reyes',    email: 'carmen@stackify.dev',        role: 'VP Engineering',       company: 'Stackify',           companyId: 'c10', avatar: 'CR', color: '#7A5AF8', lastActivity: '2026-03-15', dealValue: 28000,  stage: 'closed_won',  tags: ['technical']                   },
  { id: 'p11', name: 'Kevin Park',      email: 'k.park@cloudwise.io',        role: 'Head of Procurement',  company: 'Cloudwise',          companyId: 'c11', avatar: 'KP', color: '#F5C26B', lastActivity: '2026-04-20', dealValue: 130000, stage: 'negotiation', tags: ['decision-maker']              },
  { id: 'p12', name: 'Nadia El-Amin',   email: 'nadia@tessera.design',       role: 'CEO',                  company: 'Tessera',            companyId: 'c12', avatar: 'NE', color: '#F2545B', lastActivity: '2026-05-01', dealValue: 19000,  stage: 'qualified',   tags: ['executive', 'champion']       },
  { id: 'p13', name: 'Lucas Ferreira',  email: 'l.ferreira@vantageai.com',   role: 'COO',                  company: 'Vantage AI',         companyId: 'c13', avatar: 'LF', color: '#00BDA5', lastActivity: '2026-02-10', dealValue: 82000,  stage: 'closed_won',  tags: ['decision-maker']              },
  { id: 'p14', name: 'Sarah Kim',       email: 's.kim@plexusnet.com',        role: 'VP Sales Operations',  company: 'Plexus Networks',    companyId: 'c14', avatar: 'SK', color: '#FF7A59', lastActivity: '2026-04-15', dealValue: 95000,  stage: 'proposal',    tags: ['champion']                    },
  { id: 'p15', name: 'Omar Hassan',     email: 'o.hassan@greenpath.earth',   role: 'CFO',                  company: 'GreenPath',          companyId: 'c15', avatar: 'OH', color: '#00BDA5', lastActivity: '2026-01-22', dealValue: 44000,  stage: 'closed_won',  tags: ['decision-maker']              },
  { id: 'p16', name: 'Mei Lin',         email: 'm.lin@nomadly.app',          role: 'Head of Partnerships', company: 'Nomadly',            companyId: 'c16', avatar: 'ML', color: '#7A5AF8', lastActivity: '2026-02-28', dealValue: 52000,  stage: 'closed_won',  tags: ['champion']                    },
  { id: 'p17', name: 'Felix Wagner',    email: 'f.wagner@harbingersec.com',  role: 'CISO',                 company: 'Harbinger Security', companyId: 'c17', avatar: 'FW', color: '#0091AE', lastActivity: '2026-04-18', dealValue: 112000, stage: 'negotiation', tags: ['decision-maker', 'technical'] },
  { id: 'p18', name: 'Ananya Iyer',     email: 'a.iyer@finova.finance',      role: 'CTO',                  company: 'Finova',             companyId: 'c18', avatar: 'AI', color: '#F5C26B', lastActivity: '2026-05-01', dealValue: 195000, stage: 'proposal',    tags: ['technical', 'champion']       },
]

// ─── Deals ────────────────────────────────────────────────────────────────────
// source:     Inbound | Outbound | Partner | Event | Referral
// type:       New Business | Expansion | Renewal
// lostReason: Budget | Competitor | No decision | Timing | Product fit  (closed_lost only)

export const DEALS = [

  // ── Active pipeline (closes May–Sep 2026) ─────────────────────────────────
  { id: 'd1',  name: 'Axiom Labs — Platform',          company: 'Axiom Labs',         companyId: 'c1',  contact: 'Olivia Hartman',  contactId: 'p1',  value: 48000,  stage: 'proposal',    probability: 60,  owner: 'Sam Pierce',   source: 'Inbound',  type: 'New Business', closeDate: '2026-06-15', createdAt: '2026-03-10', activity: '3 days ago'  },
  { id: 'd2',  name: 'Stride Labs — Enterprise',        company: 'Stride Labs',        companyId: 'c2',  contact: 'Marcus Chen',     contactId: 'p2',  value: 120000, stage: 'negotiation', probability: 80,  owner: 'Sam Pierce',   source: 'Outbound', type: 'New Business', closeDate: '2026-05-30', createdAt: '2026-02-20', activity: 'Today'       },
  { id: 'd3',  name: 'Draftbit — Growth',               company: 'Draftbit',           companyId: 'c3',  contact: 'Priya Nair',      contactId: 'p3',  value: 24000,  stage: 'qualified',   probability: 40,  owner: 'Maria Gould',  source: 'Inbound',  type: 'New Business', closeDate: '2026-07-01', createdAt: '2026-04-01', activity: '13 days ago' },
  { id: 'd4',  name: 'Loop AI — Enterprise Plus',       company: 'Loop AI',            companyId: 'c4',  contact: 'James Whitfield', contactId: 'p4',  value: 200000, stage: 'negotiation', probability: 85,  owner: 'Sam Pierce',   source: 'Referral', type: 'New Business', closeDate: '2026-05-25', createdAt: '2026-01-15', activity: '2 days ago'  },
  { id: 'd5',  name: 'Fable — Starter',                 company: 'Fable',              companyId: 'c5',  contact: 'Sofia Reyes',     contactId: 'p5',  value: 36000,  stage: 'prospect',    probability: 20,  owner: 'Maria Gould',  source: 'Event',    type: 'New Business', closeDate: '2026-08-01', createdAt: '2026-04-20', activity: '17 days ago' },
  { id: 'd6',  name: 'Planet HQ — Pro',                 company: 'Planet HQ',          companyId: 'c6',  contact: 'Tom Eriksson',    contactId: 'p6',  value: 85000,  stage: 'proposal',    probability: 55,  owner: 'Sam Pierce',   source: 'Outbound', type: 'New Business', closeDate: '2026-06-20', createdAt: '2026-03-05', activity: '10 days ago' },
  { id: 'd7',  name: 'Routebase — Platform',            company: 'Routebase',          companyId: 'c7',  contact: 'Aisha Bello',     contactId: 'p7',  value: 18000,  stage: 'qualified',   probability: 35,  owner: 'Maria Gould',  source: 'Inbound',  type: 'New Business', closeDate: '2026-07-15', createdAt: '2026-04-10', activity: '23 days ago' },
  { id: 'd9',  name: 'Axiom Labs — Add-on',             company: 'Axiom Labs',         companyId: 'c1',  contact: 'Olivia Hartman',  contactId: 'p1',  value: 12000,  stage: 'prospect',    probability: 25,  owner: 'Maria Gould',  source: 'Inbound',  type: 'Expansion',    closeDate: '2026-08-15', createdAt: '2026-05-01', activity: '4 days ago'  },
  { id: 'd19', name: 'Meridian Health — Enterprise',    company: 'Meridian Health',    companyId: 'c9',  contact: 'Dmitri Volkov',   contactId: 'p9',  value: 145000, stage: 'proposal',    probability: 65,  owner: 'Alex Torres',  source: 'Partner',  type: 'New Business', closeDate: '2026-06-30', createdAt: '2026-03-18', activity: '5 days ago'  },
  { id: 'd21', name: 'Cloudwise — Annual',              company: 'Cloudwise',          companyId: 'c11', contact: 'Kevin Park',       contactId: 'p11', value: 130000, stage: 'negotiation', probability: 75,  owner: 'Alex Torres',  source: 'Outbound', type: 'Renewal',      closeDate: '2026-05-28', createdAt: '2026-02-12', activity: '1 day ago'   },
  { id: 'd23', name: 'Tessera — Pro',                   company: 'Tessera',            companyId: 'c12', contact: 'Nadia El-Amin',   contactId: 'p12', value: 19000,  stage: 'qualified',   probability: 45,  owner: 'Nina Watts',   source: 'Inbound',  type: 'New Business', closeDate: '2026-07-10', createdAt: '2026-04-15', activity: '8 days ago'  },
  { id: 'd25', name: 'Plexus Networks — Platform',      company: 'Plexus Networks',    companyId: 'c14', contact: 'Sarah Kim',        contactId: 'p14', value: 95000,  stage: 'proposal',    probability: 60,  owner: 'Sam Pierce',   source: 'Referral', type: 'New Business', closeDate: '2026-06-25', createdAt: '2026-03-22', activity: '6 days ago'  },
  { id: 'd27', name: 'Harbinger Security — Enterprise', company: 'Harbinger Security', companyId: 'c17', contact: 'Felix Wagner',     contactId: 'p17', value: 112000, stage: 'negotiation', probability: 70,  owner: 'Alex Torres',  source: 'Event',    type: 'Expansion',    closeDate: '2026-05-31', createdAt: '2026-02-28', activity: '2 days ago'  },
  { id: 'd29', name: 'Finova — Growth',                 company: 'Finova',             companyId: 'c18', contact: 'Ananya Iyer',     contactId: 'p18', value: 195000, stage: 'proposal',    probability: 50,  owner: 'Sam Pierce',   source: 'Inbound',  type: 'Renewal',      closeDate: '2026-07-05', createdAt: '2026-03-30', activity: '4 days ago'  },

  // ── 2026 Q1–Q2 — Closed ───────────────────────────────────────────────────
  { id: 'd60', name: 'Vantage AI — Platform',           company: 'Vantage AI',         companyId: 'c13', contact: 'Lucas Ferreira',  contactId: 'p13', value: 94000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Outbound', type: 'Renewal',      closeDate: '2026-04-28', createdAt: '2026-03-01', activity: '8 days ago'  },
  { id: 'd61', name: 'Stackify — Enterprise',           company: 'Stackify',           companyId: 'c10', contact: 'Carmen Reyes',    contactId: 'p10', value: 44000,  stage: 'closed_won',  probability: 100, owner: 'Nina Watts',   source: 'Inbound',  type: 'Expansion',    closeDate: '2026-04-15', createdAt: '2026-02-20', activity: '20 days ago' },
  { id: 'd62', name: 'GreenPath — Expansion',           company: 'GreenPath',          companyId: 'c15', contact: 'Omar Hassan',     contactId: 'p15', value: 58000,  stage: 'closed_won',  probability: 100, owner: 'Nina Watts',   source: 'Partner',  type: 'Expansion',    closeDate: '2026-04-08', createdAt: '2026-02-10', activity: '27 days ago' },
  { id: 'd63', name: 'Nomadly — Renewal',               company: 'Nomadly',            companyId: 'c16', contact: 'Mei Lin',         contactId: 'p16', value: 62000,  stage: 'closed_won',  probability: 100, owner: 'Maria Gould',  source: 'Inbound',  type: 'Renewal',      closeDate: '2026-03-31', createdAt: '2026-02-15', activity: '5 weeks ago' },
  { id: 'd64', name: 'Crest Data — Renewal',            company: 'Crest Data',         companyId: 'c8',  contact: 'Ravi Sharma',     contactId: 'p8',  value: 78000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'Renewal',      closeDate: '2026-03-18', createdAt: '2026-01-22', activity: '6 weeks ago' },
  { id: 'd65', name: 'Meridian Health — Pilot',         company: 'Meridian Health',    companyId: 'c9',  contact: 'Dmitri Volkov',   contactId: 'p9',  value: 38000,  stage: 'closed_lost', probability: 0,   owner: 'Alex Torres',  source: 'Partner',  type: 'New Business', closeDate: '2026-03-05', createdAt: '2026-01-10', activity: '2 months ago', lostReason: 'Timing'      },
  { id: 'd66', name: 'Plexus — Support Tier',           company: 'Plexus Networks',    companyId: 'c14', contact: 'Sarah Kim',       contactId: 'p14', value: 29000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'Expansion',    closeDate: '2026-02-22', createdAt: '2026-01-08', activity: '10 weeks ago'},
  { id: 'd67', name: 'Fable — Annual',                  company: 'Fable',              companyId: 'c5',  contact: 'Sofia Reyes',     contactId: 'p5',  value: 52000,  stage: 'closed_lost', probability: 0,   owner: 'Maria Gould',  source: 'Outbound', type: 'New Business', closeDate: '2026-02-10', createdAt: '2025-12-15', activity: '11 weeks ago', lostReason: 'Competitor'  },
  { id: 'd68', name: 'Loop AI — Renewal',               company: 'Loop AI',            companyId: 'c4',  contact: 'James Whitfield', contactId: 'p4',  value: 185000, stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'Renewal',      closeDate: '2026-01-31', createdAt: '2025-12-01', activity: '3 months ago'},
  { id: 'd69', name: 'Harbinger — Annual Renewal',      company: 'Harbinger Security', companyId: 'c17', contact: 'Felix Wagner',    contactId: 'p17', value: 96000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Inbound',  type: 'Renewal',      closeDate: '2026-01-17', createdAt: '2025-11-20', activity: '3 months ago'},

  // ── 2025 Q4 ───────────────────────────────────────────────────────────────
  { id: 'd34', name: 'Finova — Series B',               company: 'Finova',             companyId: 'c18', contact: 'Ananya Iyer',     contactId: 'p18', value: 210000, stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Referral', type: 'New Business', closeDate: '2025-12-18', createdAt: '2025-10-01', activity: '5 months ago'},
  { id: 'd35', name: 'Harbinger Security — Pro',        company: 'Harbinger Security', companyId: 'c17', contact: 'Felix Wagner',    contactId: 'p17', value: 68000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Event',    type: 'New Business', closeDate: '2025-12-04', createdAt: '2025-10-15', activity: '5 months ago'},
  { id: 'd36', name: 'Plexus Networks — Starter',       company: 'Plexus Networks',    companyId: 'c14', contact: 'Sarah Kim',       contactId: 'p14', value: 75000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Outbound', type: 'New Business', closeDate: '2025-11-27', createdAt: '2025-09-10', activity: '5 months ago'},
  { id: 'd37', name: 'Routebase — Logistics Pro',       company: 'Routebase',          companyId: 'c7',  contact: 'Aisha Bello',    contactId: 'p7',  value: 22000,  stage: 'closed_lost', probability: 0,   owner: 'Maria Gould',  source: 'Inbound',  type: 'New Business', closeDate: '2025-11-10', createdAt: '2025-09-20', activity: '6 months ago', lostReason: 'Timing'      },
  { id: 'd38', name: 'Cloudwise — Growth',              company: 'Cloudwise',          companyId: 'c11', contact: 'Kevin Park',      contactId: 'p11', value: 148000, stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Outbound', type: 'Expansion',    closeDate: '2025-10-29', createdAt: '2025-08-15', activity: '6 months ago'},
  { id: 'd39', name: 'GreenPath — Annual',              company: 'GreenPath',          companyId: 'c15', contact: 'Omar Hassan',     contactId: 'p15', value: 44000,  stage: 'closed_won',  probability: 100, owner: 'Nina Watts',   source: 'Partner',  type: 'New Business', closeDate: '2025-10-14', createdAt: '2025-08-20', activity: '6 months ago'},

  // ── 2025 Q3 ───────────────────────────────────────────────────────────────
  { id: 'd40', name: 'Vantage AI — Growth',             company: 'Vantage AI',         companyId: 'c13', contact: 'Lucas Ferreira',  contactId: 'p13', value: 79000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Outbound', type: 'New Business', closeDate: '2025-09-24', createdAt: '2025-07-10', activity: '7 months ago'},
  { id: 'd41', name: 'Stride Labs — Platform',          company: 'Stride Labs',        companyId: 'c2',  contact: 'Marcus Chen',     contactId: 'p2',  value: 55000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'New Business', closeDate: '2025-08-29', createdAt: '2025-07-01', activity: '8 months ago'},
  { id: 'd42', name: 'Crest Data — Growth',             company: 'Crest Data',         companyId: 'c8',  contact: 'Ravi Sharma',     contactId: 'p8',  value: 38000,  stage: 'closed_lost', probability: 0,   owner: 'Sam Pierce',   source: 'Outbound', type: 'New Business', closeDate: '2025-08-11', createdAt: '2025-06-18', activity: '9 months ago', lostReason: 'Budget'      },
  { id: 'd43', name: 'Axiom Labs — Seed',               company: 'Axiom Labs',         companyId: 'c1',  contact: 'Olivia Hartman',  contactId: 'p1',  value: 35000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'New Business', closeDate: '2025-07-19', createdAt: '2025-06-01', activity: '9 months ago'},
  { id: 'd70', name: 'Tessera — Seed',                  company: 'Tessera',            companyId: 'c12', contact: 'Nadia El-Amin',   contactId: 'p12', value: 16000,  stage: 'closed_lost', probability: 0,   owner: 'Nina Watts',   source: 'Inbound',  type: 'New Business', closeDate: '2025-07-05', createdAt: '2025-05-22', activity: '10 months ago', lostReason: 'No decision' },

  // ── 2025 Q2 ───────────────────────────────────────────────────────────────
  { id: 'd8',  name: 'Crest Data — Annual',             company: 'Crest Data',         companyId: 'c8',  contact: 'Ravi Sharma',     contactId: 'p8',  value: 67000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Outbound', type: 'New Business', closeDate: '2025-06-27', createdAt: '2025-04-01', activity: '11 months ago'},
  { id: 'd44', name: 'Loop AI — Seed',                  company: 'Loop AI',            companyId: 'c4',  contact: 'James Whitfield', contactId: 'p4',  value: 45000,  stage: 'closed_lost', probability: 0,   owner: 'Sam Pierce',   source: 'Referral', type: 'New Business', closeDate: '2025-06-14', createdAt: '2025-04-20', activity: '11 months ago', lostReason: 'Competitor'  },
  { id: 'd45', name: 'Nomadly — Starter',               company: 'Nomadly',            companyId: 'c16', contact: 'Mei Lin',         contactId: 'p16', value: 28000,  stage: 'closed_won',  probability: 100, owner: 'Maria Gould',  source: 'Inbound',  type: 'New Business', closeDate: '2025-05-30', createdAt: '2025-04-05', activity: '12 months ago'},
  { id: 'd46', name: 'Meridian Health — Pilot',         company: 'Meridian Health',    companyId: 'c9',  contact: 'Dmitri Volkov',   contactId: 'p9',  value: 48000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Partner',  type: 'New Business', closeDate: '2025-05-09', createdAt: '2025-03-15', activity: '12 months ago'},

  // ── 2025 Q1 ───────────────────────────────────────────────────────────────
  { id: 'd10', name: 'Stride Labs — Support',           company: 'Stride Labs',        companyId: 'c2',  contact: 'Marcus Chen',     contactId: 'p2',  value: 28000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'Expansion',    closeDate: '2025-04-14', createdAt: '2025-03-01', activity: '13 months ago'},
  { id: 'd47', name: 'Planet HQ — Starter',             company: 'Planet HQ',          companyId: 'c6',  contact: 'Tom Eriksson',    contactId: 'p6',  value: 32000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Event',    type: 'New Business', closeDate: '2025-03-25', createdAt: '2025-02-01', activity: '14 months ago'},
  { id: 'd11', name: 'Draftbit — Enterprise',           company: 'Draftbit',           companyId: 'c3',  contact: 'Priya Nair',      contactId: 'p3',  value: 52000,  stage: 'closed_lost', probability: 0,   owner: 'Maria Gould',  source: 'Outbound', type: 'New Business', closeDate: '2025-03-13', createdAt: '2025-01-10', activity: '14 months ago', lostReason: 'Competitor'  },
  { id: 'd30', name: 'Stackify — Growth',               company: 'Stackify',           companyId: 'c10', contact: 'Carmen Reyes',    contactId: 'p10', value: 28000,  stage: 'closed_won',  probability: 100, owner: 'Nina Watts',   source: 'Inbound',  type: 'New Business', closeDate: '2025-02-26', createdAt: '2025-01-05', activity: '14 months ago'},
  { id: 'd31', name: 'Nomadly — Annual',                company: 'Nomadly',            companyId: 'c16', contact: 'Mei Lin',         contactId: 'p16', value: 52000,  stage: 'closed_won',  probability: 100, owner: 'Maria Gould',  source: 'Referral', type: 'New Business', closeDate: '2025-01-31', createdAt: '2024-12-10', activity: '15 months ago'},
  { id: 'd33', name: 'Vantage AI — Enterprise',         company: 'Vantage AI',         companyId: 'c13', contact: 'Lucas Ferreira',  contactId: 'p13', value: 82000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Outbound', type: 'New Business', closeDate: '2025-01-16', createdAt: '2024-11-20', activity: '15 months ago'},

  // ── 2024 Q4 ───────────────────────────────────────────────────────────────
  { id: 'd48', name: 'Cloudwise — Pilot',               company: 'Cloudwise',          companyId: 'c11', contact: 'Kevin Park',      contactId: 'p11', value: 95000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Outbound', type: 'New Business', closeDate: '2024-12-20', createdAt: '2024-10-01', activity: '17 months ago'},
  { id: 'd12', name: 'Fable — Growth Plus',             company: 'Fable',              companyId: 'c5',  contact: 'Sofia Reyes',     contactId: 'p5',  value: 78000,  stage: 'closed_lost', probability: 0,   owner: 'Sam Pierce',   source: 'Event',    type: 'New Business', closeDate: '2024-12-05', createdAt: '2024-10-15', activity: '17 months ago', lostReason: 'Budget'      },
  { id: 'd49', name: 'Stackify — Starter',              company: 'Stackify',           companyId: 'c10', contact: 'Carmen Reyes',    contactId: 'p10', value: 22000,  stage: 'closed_lost', probability: 0,   owner: 'Nina Watts',   source: 'Inbound',  type: 'New Business', closeDate: '2024-11-18', createdAt: '2024-09-20', activity: '18 months ago', lostReason: 'Product fit' },
  { id: 'd38b',name: 'GreenPath — Pilot',               company: 'GreenPath',          companyId: 'c15', contact: 'Omar Hassan',     contactId: 'p15', value: 31000,  stage: 'closed_won',  probability: 100, owner: 'Nina Watts',   source: 'Partner',  type: 'New Business', closeDate: '2024-10-22', createdAt: '2024-08-28', activity: '18 months ago'},

  // ── 2024 Q3 ───────────────────────────────────────────────────────────────
  { id: 'd50', name: 'Finova — Series A',               company: 'Finova',             companyId: 'c18', contact: 'Ananya Iyer',     contactId: 'p18', value: 195000, stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Referral', type: 'New Business', closeDate: '2024-09-26', createdAt: '2024-07-15', activity: '20 months ago'},
  { id: 'd41b',name: 'Stride Labs — Seed',              company: 'Stride Labs',        companyId: 'c2',  contact: 'Marcus Chen',     contactId: 'p2',  value: 42000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'New Business', closeDate: '2024-08-30', createdAt: '2024-07-01', activity: '21 months ago'},
  { id: 'd51', name: 'Harbinger Security — Seed',       company: 'Harbinger Security', companyId: 'c17', contact: 'Felix Wagner',    contactId: 'p17', value: 88000,  stage: 'closed_lost', probability: 0,   owner: 'Alex Torres',  source: 'Event',    type: 'New Business', closeDate: '2024-08-12', createdAt: '2024-06-18', activity: '21 months ago', lostReason: 'Timing'      },
  { id: 'd43b',name: 'Axiom Labs — Launch',             company: 'Axiom Labs',         companyId: 'c1',  contact: 'Olivia Hartman',  contactId: 'p1',  value: 35000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Inbound',  type: 'New Business', closeDate: '2024-07-18', createdAt: '2024-06-01', activity: '22 months ago'},

  // ── 2024 Q2 ───────────────────────────────────────────────────────────────
  { id: 'd52', name: 'Loop AI — Growth',                company: 'Loop AI',            companyId: 'c4',  contact: 'James Whitfield', contactId: 'p4',  value: 88000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Referral', type: 'New Business', closeDate: '2024-06-20', createdAt: '2024-04-15', activity: '23 months ago'},
  { id: 'd45b',name: 'Nomadly — Launch',                company: 'Nomadly',            companyId: 'c16', contact: 'Mei Lin',         contactId: 'p16', value: 28000,  stage: 'closed_won',  probability: 100, owner: 'Maria Gould',  source: 'Inbound',  type: 'New Business', closeDate: '2024-05-30', createdAt: '2024-04-05', activity: '24 months ago'},
  { id: 'd46b',name: 'Meridian Health — Seed',          company: 'Meridian Health',    companyId: 'c9',  contact: 'Dmitri Volkov',   contactId: 'p9',  value: 48000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Partner',  type: 'New Business', closeDate: '2024-05-10', createdAt: '2024-03-15', activity: '24 months ago'},
  { id: 'd53', name: 'Tessera — Pilot',                 company: 'Tessera',            companyId: 'c12', contact: 'Nadia El-Amin',   contactId: 'p12', value: 12000,  stage: 'closed_lost', probability: 0,   owner: 'Nina Watts',   source: 'Inbound',  type: 'New Business', closeDate: '2024-04-22', createdAt: '2024-03-01', activity: '25 months ago', lostReason: 'Budget'      },

  // ── 2024 Q1 ───────────────────────────────────────────────────────────────
  { id: 'd47b',name: 'Planet HQ — Pilot',               company: 'Planet HQ',          companyId: 'c6',  contact: 'Tom Eriksson',    contactId: 'p6',  value: 29000,  stage: 'closed_won',  probability: 100, owner: 'Sam Pierce',   source: 'Event',    type: 'New Business', closeDate: '2024-03-25', createdAt: '2024-01-20', activity: '26 months ago'},
  { id: 'd54', name: 'Vantage AI — Pilot',              company: 'Vantage AI',         companyId: 'c13', contact: 'Lucas Ferreira',  contactId: 'p13', value: 34000,  stage: 'closed_won',  probability: 100, owner: 'Alex Torres',  source: 'Outbound', type: 'New Business', closeDate: '2024-02-28', createdAt: '2024-01-05', activity: '27 months ago'},
  { id: 'd55', name: 'Routebase — Starter',             company: 'Routebase',          companyId: 'c7',  contact: 'Aisha Bello',    contactId: 'p7',  value: 14000,  stage: 'closed_lost', probability: 0,   owner: 'Maria Gould',  source: 'Inbound',  type: 'New Business', closeDate: '2024-01-31', createdAt: '2023-12-10', activity: '28 months ago', lostReason: 'Competitor'  },
]

// ─── Pipeline stages ─────────────────────────────────────────────────────────

export const PIPELINE_STAGES = [
  { id: 'prospect',    label: 'Prospect',    color: '#5C5C78' },
  { id: 'qualified',   label: 'Qualified',   color: '#F5C26B' },
  { id: 'proposal',    label: 'Proposal',    color: '#FF7A59' },
  { id: 'negotiation', label: 'Negotiation', color: '#0091AE' },
  { id: 'closed_won',  label: 'Closed Won',  color: '#00BDA5' },
]

// ─── Recent activities ────────────────────────────────────────────────────────

export const ACTIVITIES = [
  { id: 'a1',  type: 'email',   person: 'Marcus Chen',     company: 'Stride Labs',        text: 'Sent follow-up on enterprise proposal',                                    time: '10 min ago',  avatar: 'MC', color: '#0091AE' },
  { id: 'a2',  type: 'call',    person: 'James Whitfield', company: 'Loop AI',            text: 'Discovery call — 45 min. Strong interest in enterprise tier.',             time: '2 hours ago', avatar: 'JW', color: '#00BDA5' },
  { id: 'a3',  type: 'deal',    person: 'Kevin Park',      company: 'Cloudwise',          text: 'Deal moved to Negotiation — verbal agreement on pricing',                   time: '1 day ago',   avatar: 'KP', color: '#F5C26B' },
  { id: 'a4',  type: 'note',    person: 'Olivia Hartman',  company: 'Axiom Labs',         text: 'Added note: Technical eval passed, procurement review next',               time: '3 days ago',  avatar: 'OH', color: '#FF7A59' },
  { id: 'a5',  type: 'email',   person: 'Tom Eriksson',    company: 'Planet HQ',          text: 'Sent revised proposal after budget feedback',                              time: '5 days ago',  avatar: 'TE', color: '#7A5AF8' },
  { id: 'a6',  type: 'call',    person: 'Dmitri Volkov',   company: 'Meridian Health',    text: 'Intro call — identified 3 key pain points around compliance tooling',       time: '1 day ago',   avatar: 'DV', color: '#0091AE' },
  { id: 'a7',  type: 'deal',    person: 'Lucas Ferreira',  company: 'Vantage AI',         text: 'Deal marked as Closed Won — $94,000',                                      time: '8 days ago',  avatar: 'LF', color: '#00BDA5' },
  { id: 'a8',  type: 'email',   person: 'Felix Wagner',    company: 'Harbinger Security', text: 'Sent security questionnaire response and compliance docs',                  time: '2 days ago',  avatar: 'FW', color: '#0091AE' },
  { id: 'a9',  type: 'meeting', person: 'Ananya Iyer',     company: 'Finova',             text: 'Product demo — 90 min. Positive signals from CTO and engineering team.',    time: '4 days ago',  avatar: 'AI', color: '#F5C26B' },
  { id: 'a10', type: 'note',    person: 'Sarah Kim',       company: 'Plexus Networks',    text: 'Added note: Legal review started, expect 2-week turnaround',                time: '6 days ago',  avatar: 'SK', color: '#FF7A59' },
  { id: 'a11', type: 'call',    person: 'Nadia El-Amin',   company: 'Tessera',            text: 'Qualification call — budget confirmed at $15–20k. Good fit for Pro tier.',  time: '8 days ago',  avatar: 'NE', color: '#F2545B' },
  { id: 'a12', type: 'email',   person: 'Priya Nair',      company: 'Draftbit',           text: 'Sent case study on no-code platform migrations',                           time: '13 days ago', avatar: 'PN', color: '#F5C26B' },
]

// ─── Tasks ────────────────────────────────────────────────────────────────────

export const TASKS = [
  { id: 't1', title: 'Send contract to Stride Labs',         person: 'Marcus Chen',     due: 'Today',     priority: 'high',   done: false },
  { id: 't2', title: 'Follow up on Loop AI pricing',         person: 'James Whitfield', due: 'Tomorrow',  priority: 'high',   done: false },
  { id: 't3', title: 'Schedule demo for Axiom Labs',         person: 'Olivia Hartman',  due: 'May 8',     priority: 'medium', done: false },
  { id: 't4', title: 'Send case study to Planet HQ',         person: 'Tom Eriksson',    due: 'May 9',     priority: 'low',    done: true  },
  { id: 't5', title: 'Review Meridian Health security docs', person: 'Dmitri Volkov',   due: 'May 9',     priority: 'high',   done: false },
  { id: 't6', title: 'Prepare Harbinger renewal proposal',   person: 'Felix Wagner',    due: 'May 12',    priority: 'medium', done: false },
  { id: 't7', title: 'Send Finova technical spec sheet',     person: 'Ananya Iyer',     due: 'May 13',    priority: 'medium', done: false },
  { id: 't8', title: 'Log notes from Cloudwise call',        person: 'Kevin Park',      due: 'May 7',     priority: 'low',    done: true  },
  { id: 't9', title: 'Check in on Tessera legal review',     person: 'Nadia El-Amin',   due: 'May 14',    priority: 'low',    done: false },
]

// ─── Monthly quota targets ────────────────────────────────────────────────────
// Index 0 = January. Used to render target vs actual lines in revenue charts.

export const MONTHLY_TARGETS = {
  2024: [ 85000,  90000,  95000,  95000, 100000, 105000, 100000, 105000, 110000, 115000, 115000, 125000],
  2025: [120000, 125000, 130000, 130000, 135000, 140000, 140000, 145000, 150000, 155000, 155000, 160000],
  2026: [150000, 155000, 160000, 165000, 170000, 175000, 175000, 180000, 185000, 190000, 190000, 200000],
}
