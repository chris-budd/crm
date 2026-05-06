import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PEOPLE } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const DotsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
)

const TAG_COLORS = {
  champion: { color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)', border: 'rgba(122,90,248,0.2)' },
  technical: { color: '#0091AE', bg: 'rgba(0,145,174,0.08)', border: 'rgba(0,145,174,0.2)' },
  'decision-maker': { color: '#FF7A59', bg: 'rgba(255,122,89,0.08)', border: 'rgba(255,122,89,0.2)' },
  executive: { color: '#00BDA5', bg: 'rgba(0,189,165,0.08)', border: 'rgba(0,189,165,0.2)' },
}

export default function PeoplePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [hoveredRow, setHoveredRow] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)

  const filtered = PEOPLE.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  )

  const colStyle = (width) => ({
    padding: '10px 16px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    width,
  })

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{
            fontFamily: "'Lexend', sans-serif",
            fontSize: '26px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
            marginBottom: '4px',
          }}>People</h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{PEOPLE.length} contacts</div>
        </div>
        <button style={{
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--brand)',
          border: 'none',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--brand-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--brand)'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add contact
        </button>
      </div>

      {/* Search */}
      <div style={{
        position: 'relative',
        marginBottom: '16px',
      }}>
        <span style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          pointerEvents: 'none',
          display: 'flex',
        }}>
          <SearchIcon />
        </span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search contacts..."
          style={{
            width: '100%',
            padding: '9px 12px 9px 36px',
            background: 'var(--bg-input)',
            border: `1px solid ${searchFocused ? 'var(--border-focus)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            outline: 'none',
            boxShadow: searchFocused ? '0 0 0 2px var(--brand-dim)' : 'none',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
        />
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 160px 140px 120px 110px 110px 160px 80px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)',
        }}>
          {['Name', 'Company', 'Role', 'Stage', 'Deal Value', 'Last Activity', 'Tags', ''].map((h, i) => (
            <div key={i} style={{
              padding: '10px 16px',
              fontSize: '11px',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'var(--text-muted)',
            }}>{h}</div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((person, idx) => {
          const meta = stageMeta(person.stage)
          const isHov = hoveredRow === person.id
          return (
            <div
              key={person.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '220px 160px 140px 120px 110px 110px 160px 80px',
                borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                background: isHov
                  ? 'var(--bg-card-hover)'
                  : idx % 2 === 1
                    ? 'rgba(255,255,255,0.015)'
                    : 'transparent',
                transition: 'background 0.12s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredRow(person.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => navigate(`/people/${person.id}`)}
            >
              {/* Name */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: person.color + '22',
                  border: `1.5px solid ${person.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '10px',
                  fontWeight: '600',
                  color: person.color,
                }}>
                  {person.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{person.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{person.email}</div>
                </div>
              </div>

              {/* Company */}
              <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>{person.company}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {(() => {
                    const map = { 'Axiom Labs': 'axiom.io', 'Stride Labs': 'stridelabs.com', 'Draftbit': 'draftbit.co', 'Loop AI': 'loopai.com', 'Fable': 'fableapp.io', 'Planet HQ': 'planethq.com', 'Routebase': 'routebase.io', 'Crest Data': 'crestdata.ai' }
                    return map[person.company] || ''
                  })()}
                </div>
              </div>

              {/* Role */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{person.role}</span>
              </div>

              {/* Stage */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: '500',
                  color: meta.color,
                  background: meta.bg,
                  border: `1px solid ${meta.border}`,
                  whiteSpace: 'nowrap',
                }}>
                  {meta.label}
                </span>
              </div>

              {/* Deal Value */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '500', color: 'var(--brand)' }}>
                  {formatCurrency(person.dealValue)}
                </span>
              </div>

              {/* Last Activity */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {person.lastActivity}
                </span>
              </div>

              {/* Tags */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                {person.tags.slice(0, 2).map(tag => {
                  const tc = TAG_COLORS[tag] || { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.06)', border: 'var(--border)' }
                  return (
                    <span key={tag} style={{
                      padding: '1px 7px',
                      borderRadius: '99px',
                      fontSize: '10px',
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

              {/* Actions */}
              <div
                style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => navigate(`/people/${person.id}`)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'transparent',
                    border: '1px solid var(--border-strong)',
                    color: 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.color = 'var(--brand)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  View
                </button>
                <button
                  style={{
                    padding: '4px 6px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <DotsIcon />
                </button>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No contacts found
          </div>
        )}
      </div>
    </div>
  )
}
