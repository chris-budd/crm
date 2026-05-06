import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PEOPLE, DEALS } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'

const PERSON_ACTIVITIES = [
  { id: 1, type: 'email', title: 'Follow-up email sent', desc: 'Sent detailed breakdown of enterprise tier pricing and onboarding timeline.', time: '2 days ago', color: '#0091AE' },
  { id: 2, type: 'call', title: 'Discovery call', desc: '45-minute call covering technical requirements and integration needs. Very engaged.', time: '1 week ago', color: '#00BDA5' },
  { id: 3, type: 'note', title: 'Note added', desc: 'Champion confirmed budget approved. Procurement review scheduled for next week.', time: '2 weeks ago', color: '#F5C26B' },
]

const typeIconSm = (type) => {
  if (type === 'call') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
  if (type === 'email') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

const TAG_COLORS = {
  champion: { color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)', border: 'rgba(122,90,248,0.2)' },
  technical: { color: '#0091AE', bg: 'rgba(0,145,174,0.08)', border: 'rgba(0,145,174,0.2)' },
  'decision-maker': { color: '#FF7A59', bg: 'rgba(255,122,89,0.08)', border: 'rgba(255,122,89,0.2)' },
  executive: { color: '#00BDA5', bg: 'rgba(0,189,165,0.08)', border: 'rgba(0,189,165,0.2)' },
}

export default function PersonPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [emailHov, setEmailHov] = useState(false)
  const [callHov, setCallHov] = useState(false)
  const [hovDeal, setHovDeal] = useState(null)

  const person = PEOPLE.find(p => p.id === id)
  if (!person) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Contact not found.{' '}
        <button onClick={() => navigate('/people')} style={{ color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
          Back to People
        </button>
      </div>
    )
  }

  const personDeals = DEALS.filter(d => d.contactId === person.id)

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <button
          onClick={() => navigate('/people')}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          People
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ color: 'var(--text-primary)' }}>{person.name}</span>
      </div>

      {/* Header */}
      <div style={{
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius)',
        padding: '28px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
      }}>
        {/* Big avatar */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: person.color + '22',
          border: `2px solid ${person.color}55`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          fontSize: '20px',
          fontWeight: '600',
          color: person.color,
        }}>
          {person.avatar}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{
            fontFamily: "'Lexend', sans-serif",
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            marginBottom: '4px',
            lineHeight: 1.1,
          }}>
            {person.name}
          </h1>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            {person.role}
            {' · '}
            <span style={{ color: 'var(--brand)', cursor: 'pointer' }}>
              {person.company}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {person.tags.map(tag => {
              const tc = TAG_COLORS[tag] || { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.06)', border: 'var(--border)' }
              return (
                <span key={tag} style={{
                  padding: '3px 10px',
                  borderRadius: '99px',
                  fontSize: '11.5px',
                  fontWeight: '500',
                  color: tc.color,
                  background: tc.bg,
                  border: `1px solid ${tc.border}`,
                }}>
                  {tag}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Deals */}
          <div style={{
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-card)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Deals</span>
              <span style={{
                fontSize: '11px', padding: '2px 8px', borderRadius: '99px',
                background: 'var(--brand-dim)', color: 'var(--brand)', border: '1px solid var(--brand-border)',
              }}>
                {personDeals.length}
              </span>
            </div>

            {personDeals.length > 0 ? (
              <div>
                {/* Mini table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 100px 110px',
                  padding: '8px 20px',
                  background: 'var(--bg-elevated)',
                  borderBottom: '1px solid var(--border)',
                }}>
                  {['Deal', 'Value', 'Stage', 'Close Date'].map((h, i) => (
                    <div key={i} style={{ fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>{h}</div>
                  ))}
                </div>
                {personDeals.map((deal, i) => {
                  const meta = stageMeta(deal.stage)
                  const isHov = hovDeal === deal.id
                  return (
                    <div
                      key={deal.id}
                      onClick={() => navigate(`/deals/${deal.id}`)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 100px 100px 110px',
                        padding: '12px 20px',
                        borderBottom: i < personDeals.length - 1 ? '1px solid var(--border)' : 'none',
                        background: isHov ? 'var(--bg-card-hover)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.12s ease',
                      }}
                      onMouseEnter={() => setHovDeal(deal.id)}
                      onMouseLeave={() => setHovDeal(null)}
                    >
                      <div style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--text-primary)' }}>{deal.name}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '500', color: 'var(--brand)' }}>
                        {formatCurrency(deal.value)}
                      </div>
                      <div>
                        <span style={{
                          padding: '2px 8px', borderRadius: '99px', fontSize: '10.5px', fontWeight: '500',
                          color: meta.color, background: meta.bg, border: `1px solid ${meta.border}`,
                        }}>
                          {meta.label}
                        </span>
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        {deal.closeDate}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No deals yet</div>
            )}
          </div>

          {/* Activity */}
          <div style={{
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-card)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Activity</span>
            </div>
            <div style={{ padding: '4px 0' }}>
              {PERSON_ACTIVITIES.map((act, i) => (
                <div
                  key={act.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '14px 20px',
                    borderBottom: i < PERSON_ACTIVITIES.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: act.color + '1A', border: `1px solid ${act.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: act.color, marginTop: '2px',
                  }}>
                    {typeIconSm(act.type)}
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

        {/* Sidebar */}
        <div style={{
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-card)',
          borderRadius: 'var(--radius)',
          padding: '20px',
          position: 'sticky',
          top: '80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {/* Contact details */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Contact Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <SidebarDetail label="Email">
                <a href={`mailto:${person.email}`} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11.5px',
                  color: 'var(--brand)',
                  textDecoration: 'none',
                  wordBreak: 'break-all',
                }}>
                  {person.email}
                </a>
              </SidebarDetail>
              <SidebarDetail label="Company">
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{person.company}</span>
              </SidebarDetail>
              <SidebarDetail label="Role">
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{person.role}</span>
              </SidebarDetail>
              <SidebarDetail label="Last Activity">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {person.lastActivity}
                </span>
              </SidebarDetail>
              <SidebarDetail label="Deal Value">
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', fontWeight: '500', color: 'var(--brand)' }}>
                  {formatCurrency(person.dealValue)}
                </span>
              </SidebarDetail>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }} />

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: emailHov ? 'var(--brand-hover)' : 'var(--brand)',
                border: 'none',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
              }}
              onMouseEnter={() => setEmailHov(true)}
              onMouseLeave={() => setEmailHov(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Send email
            </button>
            <button
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: callHov ? 'rgba(0,0,0,0.04)' : 'transparent',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
              }}
              onMouseEnter={() => setCallHov(true)}
              onMouseLeave={() => setCallHov(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Log call
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarDetail({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '3px' }}>
        {label}
      </div>
      {children}
    </div>
  )
}
