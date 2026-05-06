export const PEOPLE = [
  { id: 'p1', name: 'Olivia Hartman', email: 'o.hartman@axiom.io', role: 'VP of Engineering', company: 'Axiom Labs', companyId: 'c1', avatar: 'OH', color: '#FF7A59', lastActivity: '2025-04-28', dealValue: 48000, stage: 'proposal', tags: ['champion', 'technical'] },
  { id: 'p2', name: 'Marcus Chen', email: 'm.chen@stridelabs.com', role: 'CTO', company: 'Stride Labs', companyId: 'c2', avatar: 'MC', color: '#0091AE', lastActivity: '2025-05-01', dealValue: 120000, stage: 'negotiation', tags: ['decision-maker'] },
  { id: 'p3', name: 'Priya Nair', email: 'priya@draftbit.co', role: 'Head of Product', company: 'Draftbit', companyId: 'c3', avatar: 'PN', color: '#F5C26B', lastActivity: '2025-04-22', dealValue: 24000, stage: 'qualified', tags: ['champion'] },
  { id: 'p4', name: 'James Whitfield', email: 'j.whitfield@loopai.com', role: 'CEO', company: 'Loop AI', companyId: 'c4', avatar: 'JW', color: '#00BDA5', lastActivity: '2025-04-30', dealValue: 200000, stage: 'negotiation', tags: ['decision-maker', 'executive'] },
  { id: 'p5', name: 'Sofia Reyes', email: 's.reyes@fableapp.io', role: 'Director of Ops', company: 'Fable', companyId: 'c5', avatar: 'SR', color: '#F2545B', lastActivity: '2025-04-18', dealValue: 36000, stage: 'prospect', tags: [] },
  { id: 'p6', name: 'Tom Eriksson', email: 't.eriksson@planethq.com', role: 'CFO', company: 'Planet HQ', companyId: 'c6', avatar: 'TE', color: '#7A5AF8', lastActivity: '2025-04-25', dealValue: 85000, stage: 'proposal', tags: ['decision-maker'] },
  { id: 'p7', name: 'Aisha Bello', email: 'aisha@routebase.io', role: 'Product Lead', company: 'Routebase', companyId: 'c7', avatar: 'AB', color: '#00BDA5', lastActivity: '2025-04-12', dealValue: 18000, stage: 'qualified', tags: ['technical'] },
  { id: 'p8', name: 'Ravi Sharma', email: 'ravi@crestdata.ai', role: 'COO', company: 'Crest Data', companyId: 'c8', avatar: 'RS', color: '#FF7A59', lastActivity: '2025-05-02', dealValue: 67000, stage: 'closed_won', tags: ['champion', 'decision-maker'] },
]

export const COMPANIES = [
  { id: 'c1', name: 'Axiom Labs', domain: 'axiom.io', industry: 'Developer Tools', employees: 120, arr: 2400000, activeDeals: 1, contacts: 2, owner: 'Sam Pierce' },
  { id: 'c2', name: 'Stride Labs', domain: 'stridelabs.com', industry: 'Infrastructure', employees: 340, arr: 8100000, activeDeals: 1, contacts: 3, owner: 'Sam Pierce' },
  { id: 'c3', name: 'Draftbit', domain: 'draftbit.co', industry: 'No-code', employees: 45, arr: 600000, activeDeals: 1, contacts: 1, owner: 'Maria Gould' },
  { id: 'c4', name: 'Loop AI', domain: 'loopai.com', industry: 'AI / ML', employees: 210, arr: 12000000, activeDeals: 1, contacts: 2, owner: 'Sam Pierce' },
  { id: 'c5', name: 'Fable', domain: 'fableapp.io', industry: 'Media Tech', employees: 80, arr: 1200000, activeDeals: 1, contacts: 1, owner: 'Maria Gould' },
  { id: 'c6', name: 'Planet HQ', domain: 'planethq.com', industry: 'Real Estate Tech', employees: 160, arr: 3600000, activeDeals: 1, contacts: 2, owner: 'Sam Pierce' },
  { id: 'c7', name: 'Routebase', domain: 'routebase.io', industry: 'Logistics Tech', employees: 55, arr: 900000, activeDeals: 1, contacts: 1, owner: 'Maria Gould' },
  { id: 'c8', name: 'Crest Data', domain: 'crestdata.ai', industry: 'Data & Analytics', employees: 290, arr: 6000000, activeDeals: 0, contacts: 2, owner: 'Sam Pierce' },
]

export const DEALS = [
  { id: 'd1', name: 'Axiom Labs — Platform', company: 'Axiom Labs', companyId: 'c1', contact: 'Olivia Hartman', contactId: 'p1', value: 48000, stage: 'proposal', probability: 60, owner: 'Sam Pierce', closeDate: '2025-06-15', createdAt: '2025-03-10', activity: '3 days ago' },
  { id: 'd2', name: 'Stride Labs — Enterprise', company: 'Stride Labs', companyId: 'c2', contact: 'Marcus Chen', contactId: 'p2', value: 120000, stage: 'negotiation', probability: 80, owner: 'Sam Pierce', closeDate: '2025-05-30', createdAt: '2025-02-20', activity: 'Today' },
  { id: 'd3', name: 'Draftbit — Growth', company: 'Draftbit', companyId: 'c3', contact: 'Priya Nair', contactId: 'p3', value: 24000, stage: 'qualified', probability: 40, owner: 'Maria Gould', closeDate: '2025-07-01', createdAt: '2025-04-01', activity: '13 days ago' },
  { id: 'd4', name: 'Loop AI — Enterprise Plus', company: 'Loop AI', companyId: 'c4', contact: 'James Whitfield', contactId: 'p4', value: 200000, stage: 'negotiation', probability: 85, owner: 'Sam Pierce', closeDate: '2025-05-25', createdAt: '2025-01-15', activity: '2 days ago' },
  { id: 'd5', name: 'Fable — Starter', company: 'Fable', companyId: 'c5', contact: 'Sofia Reyes', contactId: 'p5', value: 36000, stage: 'prospect', probability: 20, owner: 'Maria Gould', closeDate: '2025-08-01', createdAt: '2025-04-20', activity: '17 days ago' },
  { id: 'd6', name: 'Planet HQ — Pro', company: 'Planet HQ', companyId: 'c6', contact: 'Tom Eriksson', contactId: 'p6', value: 85000, stage: 'proposal', probability: 55, owner: 'Sam Pierce', closeDate: '2025-06-20', createdAt: '2025-03-05', activity: '10 days ago' },
  { id: 'd7', name: 'Routebase — Platform', company: 'Routebase', companyId: 'c7', contact: 'Aisha Bello', contactId: 'p7', value: 18000, stage: 'qualified', probability: 35, owner: 'Maria Gould', closeDate: '2025-07-15', createdAt: '2025-04-10', activity: '23 days ago' },
  { id: 'd8', name: 'Crest Data — Annual', company: 'Crest Data', companyId: 'c8', contact: 'Ravi Sharma', contactId: 'p8', value: 67000, stage: 'closed_won', probability: 100, owner: 'Sam Pierce', closeDate: '2025-04-30', createdAt: '2025-02-01', activity: '5 days ago' },
  { id: 'd9', name: 'Axiom Labs — Add-on', company: 'Axiom Labs', companyId: 'c1', contact: 'Olivia Hartman', contactId: 'p1', value: 12000, stage: 'prospect', probability: 25, owner: 'Maria Gould', closeDate: '2025-08-15', createdAt: '2025-05-01', activity: '4 days ago' },
  { id: 'd10', name: 'Stride Labs — Support', company: 'Stride Labs', companyId: 'c2', contact: 'Marcus Chen', contactId: 'p2', value: 28000, stage: 'closed_won', probability: 100, owner: 'Sam Pierce', closeDate: '2025-04-15', createdAt: '2025-03-01', activity: '20 days ago' },
  { id: 'd11', name: 'Draftbit — Enterprise', company: 'Draftbit', companyId: 'c3', contact: 'Priya Nair', contactId: 'p3', value: 52000, stage: 'closed_lost', probability: 0, owner: 'Maria Gould', closeDate: '2025-03-15', createdAt: '2025-01-10', activity: '7 weeks ago' },
  { id: 'd12', name: 'Fable — Growth Plus', company: 'Fable', companyId: 'c5', contact: 'Sofia Reyes', contactId: 'p5', value: 78000, stage: 'closed_lost', probability: 0, owner: 'Sam Pierce', closeDate: '2025-04-08', createdAt: '2025-02-01', activity: '4 weeks ago' },
]

export const PIPELINE_STAGES = [
  { id: 'prospect',    label: 'Prospect',     color: '#5C5C78' },
  { id: 'qualified',   label: 'Qualified',    color: '#F5C26B' },
  { id: 'proposal',    label: 'Proposal',     color: '#FF7A59' },
  { id: 'negotiation', label: 'Negotiation',  color: '#0091AE' },
  { id: 'closed_won',  label: 'Closed Won',   color: '#00BDA5' },
]

export const ACTIVITIES = [
  { id: 'a1', type: 'email', person: 'Marcus Chen', company: 'Stride Labs', text: 'Sent follow-up on enterprise proposal', time: '10 min ago', avatar: 'MC', color: '#0091AE' },
  { id: 'a2', type: 'call', person: 'James Whitfield', company: 'Loop AI', text: 'Discovery call — 45 min. Strong interest in enterprise tier.', time: '2 hours ago', avatar: 'JW', color: '#00BDA5' },
  { id: 'a3', type: 'deal', person: 'Ravi Sharma', company: 'Crest Data', text: 'Deal marked as Closed Won — $67,000', time: '5 days ago', avatar: 'RS', color: '#FF7A59' },
  { id: 'a4', type: 'note', person: 'Olivia Hartman', company: 'Axiom Labs', text: 'Added note: Technical eval passed, procurement review next', time: '3 days ago', avatar: 'OH', color: '#FF7A59' },
  { id: 'a5', type: 'email', person: 'Tom Eriksson', company: 'Planet HQ', text: 'Sent revised proposal after budget feedback', time: '10 days ago', avatar: 'TE', color: '#7A5AF8' },
]

export const TASKS = [
  { id: 't1', title: 'Send contract to Stride Labs', person: 'Marcus Chen', due: 'Today', priority: 'high', done: false },
  { id: 't2', title: 'Follow up on Loop AI pricing', person: 'James Whitfield', due: 'Tomorrow', priority: 'high', done: false },
  { id: 't3', title: 'Schedule demo for Axiom Labs', person: 'Olivia Hartman', due: 'May 8', priority: 'medium', done: false },
  { id: 't4', title: 'Send case study to Planet HQ', person: 'Tom Eriksson', due: 'May 9', priority: 'low', done: true },
]
