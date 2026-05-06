import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DEALS, PEOPLE } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'

const DEAL_ACTIVITIES = [
  { id: 1, type: 'call', icon: '📞', title: 'Discovery call completed', desc: 'Discussed pain points and technical requirements. Strong fit for enterprise tier.', time: '2 days ago', person: 'Sam Pierce', personColor: '#FF7A59' },
  { id: 2, type: 'email', icon: '✉️', title: 'Proposal sent', desc: 'Sent full proposal document with pricing breakdown and implementation timeline.', time: '5 days ago', person: 'Sam Pierce', personColor: '#FF7A59' },
  { id: 3, type: 'meeting', icon: '📅', title: 'Meeting scheduled', desc: 'Technical evaluation call booked with engineering team. 60 min slot confirmed.', time: '8 days ago', person: 'Sam Pierce', personColor: '#FF7A59' },
  { id: 4, type: 'note', icon: '📝', title: 'Deal created', desc: 'Initial qualification complete. Budget confirmed, timeline Q2.', time: '14 days ago', person: 'Sam Pierce', personColor: '#FF7A59' },
]

const typeIcon = (type) => {
  if (type === 'call') return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
  if (type === 'email') return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
  if (type === 'meeting') return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

const typeColor = { call: '#00BDA5', email: '#0091AE', meeting: '#7A5AF8', note: '#F5C26B' }

export default function DealPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState('')
  const [noteFocused, setNoteFocused] = useState(false)
  const [wonHov, setWonHov] = useState(false)
  const [editHov, setEditHov] = useState(false)

  const deal = DEALS.find(d => d.id === id)
  if (!deal) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Deal not found.{' '}
        <button onClick={() => navigate('/pipeline')} style={{ color: 'var(--brand)', background: 'none', border: 'none', cursor: 'pointer' }}>
          Back to Pipeline
        </button>
      </div>
    )
  }

  const meta = stageMeta(deal.stage)
  const contact = PEOPLE.find(p => p.id === deal.contactId)
  const ownerInitials = deal.owner.split(' ').map(w => w[0]).join('')
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [, cm, cd] = deal.closeDate.split('-')
  const closeFmt = months[parseInt(cm)] + ' ' + parseInt(cd) + ', 2025'

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <button
          onClick={() => navigate('/pipeline')}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '12px', padding: 0 }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          Pipeline
        </button>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ color: 'var(--text-secondary)' }}>{deal.company}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ color: 'var(--text-primary)' }}>{deal.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}>
        {/* Main column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header card */}
          <div style={{
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-card)',
            borderRadius: 'var(--radius)',
            padding: '24px',
          }}>
            <div style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              letterSpacing: '-0.5px',
              marginBottom: '14px',
              lineHeight: 1.2,
            }}>
              {deal.name}
            </div>

            {/* Company + contact */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'var(--brand-dim)',
                border: '1px solid var(--brand-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '700',
                color: 'var(--brand)',
              }}>
                {deal.company.slice(0, 2).toUpperCase()}
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{deal.company}</span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              {contact && (
                <>
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: contact.color + '22',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px',
                    fontWeight: '600',
                    color: contact.color,
                  }}>
                    {contact.avatar}
                  </div>
                  <Link
                    to={`/people/${contact.id}`}
                    style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {contact.name}
                  </Link>
                </>
              )}
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: '500',
                color: meta.color,
                background: meta.bg,
                border: `1px solid ${meta.border}`,
              }}>
                {meta.label}
              </span>
              <span style={{
                padding: '4px 12px',
                borderRadius: '99px',
                fontSize: '12px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {deal.probability}% probability
              </span>
              <span style={{
                padding: '4px 12px',
                borderRadius: '99px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
              }}>
                {deal.activity}
              </span>
            </div>
          </div>

          {/* Activity timeline */}
          <div style={{
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-card)',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Activity</span>
            </div>
            <div style={{ padding: '8px 0' }}>
              {DEAL_ACTIVITIES.map((act, i) => {
                const color = typeColor[act.type] || '#7C66FF'
                return (
                  <div
                    key={act.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '14px 20px',
                      borderBottom: i < DEAL_ACTIVITIES.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: color + '1A',
                      border: `1px solid ${color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: color,
                      marginTop: '1px',
                    }}>
                      {typeIcon(act.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{act.title}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{act.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: 'var(--brand-dim)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '7px',
                          fontWeight: '700',
                          color: 'var(--brand)',
                        }}>
                          {act.person.split(' ').map(w => w[0]).join('')}
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{act.person}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notes */}
          <div style={{
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-card)',
            borderRadius: 'var(--radius)',
            padding: '20px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>Notes</div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              onFocus={() => setNoteFocused(true)}
              onBlur={() => setNoteFocused(false)}
              placeholder="Add a note about this deal..."
              rows={4}
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: `1px solid ${noteFocused ? 'var(--border-focus)' : 'var(--border-strong)'}`,
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                padding: '10px 12px',
                outline: 'none',
                resize: 'vertical',
                lineHeight: '1.6',
                boxShadow: noteFocused ? '0 0 0 2px var(--brand-dim)' : 'none',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button style={{
                padding: '7px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--brand)',
                border: 'none',
                color: '#fff',
                fontSize: '12.5px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--brand-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--brand)'}
              >
                Save note
              </button>
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
          gap: '20px',
        }}>
          {/* Value */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Deal Value
            </div>
            <div style={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: '28px',
              fontWeight: '700',
              color: 'var(--brand)',
              letterSpacing: '-1px',
            }}>
              {formatCurrency(deal.value)}
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }} />

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <DetailRow label="Close Date" value={closeFmt} mono />
            <DetailRow
              label="Owner"
              custom={
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'var(--brand-dim)', border: '1px solid var(--brand-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '8px', fontWeight: '700', color: 'var(--brand)',
                  }}>{ownerInitials}</div>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{deal.owner}</span>
                </div>
              }
            />
            <DetailRow
              label="Company"
              custom={
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{deal.company}</span>
              }
            />
            {contact && (
              <DetailRow
                label="Contact"
                custom={
                  <Link
                    to={`/people/${contact.id}`}
                    style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {contact.name}
                  </Link>
                }
              />
            )}
          </div>

          {/* Probability */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>Probability</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: meta.color }}>{deal.probability}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                width: deal.probability + '%',
                height: '100%',
                background: meta.color,
                borderRadius: '3px',
              }} />
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
                background: wonHov ? 'rgba(34,197,94,0.2)' : 'var(--success-dim)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: 'var(--success)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
              }}
              onMouseEnter={() => setWonHov(true)}
              onMouseLeave={() => setWonHov(false)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Mark as Won
            </button>
            <button
              style={{
                width: '100%',
                padding: '9px',
                borderRadius: 'var(--radius-sm)',
                background: editHov ? 'rgba(0,0,0,0.04)' : 'transparent',
                border: '1px solid var(--border-strong)',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={() => setEditHov(true)}
              onMouseLeave={() => setEditHov(false)}
            >
              Edit Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value, custom, mono }) {
  return (
    <div>
      <div style={{ fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '3px' }}>
        {label}
      </div>
      {custom || (
        <span style={{
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
          fontFamily: mono ? "'JetBrains Mono', monospace" : 'inherit',
        }}>
          {value}
        </span>
      )}
    </div>
  )
}
