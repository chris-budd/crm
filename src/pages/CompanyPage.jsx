import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { COMPANIES, PEOPLE, DEALS } from '../data/crm'
import { formatCurrency, formatARR, stageMeta } from '../utils/crm'

function companyColor(name) {
  const colors = ['#7A5AF8', '#0091AE', '#F5C26B', '#00BDA5', '#F2545B', '#7A5AF8', '#00BDA5', '#FF7A59']
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % colors.length
  return colors[h]
}

const TAG_COLORS = {
  champion: { color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)', border: 'rgba(122,90,248,0.2)' },
  technical: { color: '#0091AE', bg: 'rgba(0,145,174,0.08)', border: 'rgba(0,145,174,0.2)' },
  'decision-maker': { color: '#FF7A59', bg: 'rgba(255,122,89,0.08)', border: 'rgba(255,122,89,0.2)' },
  executive: { color: '#00BDA5', bg: 'rgba(0,189,165,0.08)', border: 'rgba(0,189,165,0.2)' },
}

const TABS = ['Overview', 'Deals', 'Contacts']

const COMPANY_ACTIVITIES = [
  { id: 1, type: 'deal', title: 'New deal created', desc: 'Enterprise proposal sent for review to procurement team.', time: '2 days ago', color: '#FF7A59' },
  { id: 2, type: 'email', title: 'Email sent', desc: 'Followed up on technical evaluation results and shared case studies.', time: '1 week ago', color: '#0091AE' },
  { id: 3, type: 'call', title: 'Discovery call', desc: '60-min call with engineering and finance leads. Budget confirmed for Q2.', time: '2 weeks ago', color: '#00BDA5' },
  { id: 4, type: 'note', title: 'Note added', desc: 'Company expanding headcount 40% YoY — strong expansion revenue potential.', time: '3 weeks ago', color: '#F5C26B' },
]

function typeIcon(type) {
  if (type === 'deal') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  )
  if (type === 'email') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
  if (type === 'call') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      borderRadius: 'var(--radius-sm)',
      padding: '14px 16px',
      border: '1px solid var(--border)',
    }}>
      <div style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: '700', color: accent || 'var(--text-primary)', letterSpacing: '-0.5px', lineHeight: 1, marginBottom: '3px' }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub}</div>}
    </div>
  )
}

export default function CompanyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const [hovDeal, setHovDeal] = useState(null)
  const [hovContact, setHovContact] = useState(null)
  const [newDealHov, setNewDealHov] = useState(false)
  const [emailHov, setEmailHov] = useState(false)

  const company = COMPANIES.find(c => c.id === id)
  if (!company) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Company not found.{' '}
        <button onClick={() => navigate('/companies')} style={{ color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
          Back to Companies
        </button>
      </div>
    )
  }

  const color = companyColor(company.name)
  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const ownerInitials = company.owner.split(' ').map(w => w[0]).join('')
  const companyDeals = DEALS.filter(d => d.companyId === id)
  const companyPeople = PEOPLE.filter(p => p.companyId === id)
  const pipelineValue = companyDeals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost').reduce((s, d) => s + d.value, 0)
  const wonDeals = companyDeals.filter(d => d.stage === 'closed_won')

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <button
          onClick={() => navigate('/companies')}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          Companies
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ color: 'var(--text-primary)' }}>{company.name}</span>
      </div>

      {/* Header card */}
      <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', padding: '24px 28px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            {/* Logo */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '12px',
              background: color + '18', border: `2px solid ${color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', fontWeight: '700', color: color, flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '4px' }}>
                {company.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{company.industry}</span>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <a
                  href={`https://${company.domain}`}
                  style={{ fontSize: '13px', color: 'var(--brand)', fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {company.domain}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '500',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
                }}>
                  {company.employees.toLocaleString()} employees
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'var(--brand-dim)', border: '1px solid var(--brand-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '8px', fontWeight: '700', color: 'var(--brand)',
                  }}>
                    {ownerInitials}
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{company.owner}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button
              style={{
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                background: emailHov ? 'rgba(0,0,0,0.04)' : 'transparent',
                border: '1px solid var(--border-strong)', color: 'var(--text-secondary)',
                fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={() => setEmailHov(true)}
              onMouseLeave={() => setEmailHov(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Send email
            </button>
            <button
              style={{
                padding: '8px 16px', borderRadius: 'var(--radius-sm)',
                background: newDealHov ? 'var(--brand-hover)' : 'var(--brand)',
                border: 'none', color: '#fff',
                fontSize: '13px', fontWeight: '500', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={() => setNewDealHov(true)}
              onMouseLeave={() => setNewDealHov(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New Deal
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '16px', borderBottom: '1px solid var(--border)' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '9px 18px', fontSize: '13px',
              fontWeight: activeTab === tab ? '600' : '400',
              color: activeTab === tab ? 'var(--brand)' : 'var(--text-secondary)',
              background: 'none', border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--brand)' : '2px solid transparent',
              cursor: 'pointer', marginBottom: '-1px', transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <StatCard label="ARR" value={formatARR(company.arr)} sub="annual recurring revenue" accent="var(--success)" />
              <StatCard label="Pipeline" value={formatCurrency(pipelineValue)} sub="active deals" accent="var(--brand)" />
              <StatCard label="Deals Won" value={wonDeals.length.toString()} sub={formatCurrency(wonDeals.reduce((s, d) => s + d.value, 0)) + ' total'} accent="#0091AE" />
            </div>

            {/* Activity */}
            <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Recent Activity</span>
              </div>
              <div style={{ padding: '4px 0' }}>
                {COMPANY_ACTIVITIES.map((act, i) => (
                  <div key={act.id} style={{
                    display: 'flex', gap: '12px', padding: '14px 20px',
                    borderBottom: i < COMPANY_ACTIVITIES.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: act.color + '1A', border: `1px solid ${act.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: act.color, marginTop: '2px',
                    }}>
                      {typeIcon(act.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)' }}>{act.title}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: company details */}
          <div style={{
            background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)',
            padding: '20px', position: 'sticky', top: '80px',
            display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '12px' }}>
                Company Details
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Industry', value: company.industry },
                  { label: 'Employees', value: company.employees.toLocaleString(), mono: true },
                  { label: 'Website', value: company.domain, mono: true, brand: true },
                  { label: 'ARR', value: formatARR(company.arr), mono: true, success: true },
                  { label: 'Contacts', value: `${companyPeople.length} person${companyPeople.length !== 1 ? 's' : ''}` },
                  { label: 'Active Deals', value: String(company.activeDeals), brand: true },
                  { label: 'Owner', value: company.owner },
                ].map(({ label, value, mono, brand, success }) => (
                  <div key={label}>
                    <div style={{ fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '3px' }}>
                      {label}
                    </div>
                    <span style={{
                      fontSize: '12.5px',
                      color: brand ? 'var(--brand)' : success ? 'var(--success)' : 'var(--text-secondary)',
                      fontFamily: mono ? "'JetBrains Mono', monospace" : 'inherit',
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Deals' && (
        <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 140px 110px 110px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
            {['Deal', 'Value', 'Stage', 'Probability', 'Close Date'].map((h, i) => (
              <div key={i} style={{ padding: '9px 16px', fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>{h}</div>
            ))}
          </div>
          {companyDeals.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No deals yet</div>
          )}
          {companyDeals.map((deal, i) => {
            const meta = stageMeta(deal.stage)
            const isHov = hovDeal === deal.id
            return (
              <div
                key={deal.id}
                onClick={() => navigate(`/deals/${deal.id}`)}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 110px 140px 110px 110px',
                  borderBottom: i < companyDeals.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isHov ? 'var(--bg-card-hover)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.12s',
                }}
                onMouseEnter={() => setHovDeal(deal.id)}
                onMouseLeave={() => setHovDeal(null)}
              >
                <div style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '1px' }}>{deal.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{deal.contact}</div>
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: '500', color: 'var(--brand)' }}>
                    {formatCurrency(deal.value)}
                  </span>
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ padding: '2px 9px', borderRadius: '99px', fontSize: '11px', fontWeight: '500', color: meta.color, background: meta.bg, border: `1px solid ${meta.border}` }}>
                    {meta.label}
                  </span>
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: meta.color }}>{deal.probability}%</span>
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--text-muted)' }}>{deal.closeDate}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'Contacts' && (
        <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          {companyPeople.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No contacts yet</div>
          )}
          {companyPeople.map((person, i) => {
            const isHov = hovContact === person.id
            const meta = stageMeta(person.stage)
            return (
              <div
                key={person.id}
                onClick={() => navigate(`/people/${person.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px',
                  borderBottom: i < companyPeople.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isHov ? 'var(--bg-card-hover)' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.12s',
                }}
                onMouseEnter={() => setHovContact(person.id)}
                onMouseLeave={() => setHovContact(null)}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: person.color + '22', border: `1.5px solid ${person.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '600', color: person.color, flexShrink: 0,
                }}>
                  {person.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>{person.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{person.role}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {person.tags.map(tag => {
                    const tc = TAG_COLORS[tag] || { color: 'var(--text-secondary)', bg: 'var(--bg-elevated)', border: 'var(--border)' }
                    return (
                      <span key={tag} style={{
                        padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: '500',
                        color: tc.color, background: tc.bg, border: `1px solid ${tc.border}`,
                      }}>
                        {tag}
                      </span>
                    )
                  })}
                </div>
                <div style={{
                  padding: '2px 9px', borderRadius: '99px', fontSize: '11px', fontWeight: '500',
                  color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`,
                  flexShrink: 0,
                }}>
                  {meta.label}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: '500', color: 'var(--brand)', flexShrink: 0 }}>
                  {formatCurrency(person.dealValue)}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
