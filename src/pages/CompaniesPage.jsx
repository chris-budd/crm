import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPANIES } from '../data/crm'
import { formatARR } from '../utils/crm'


function companyColor(name) {
  const colors = ['#7A5AF8', '#0091AE', '#F5C26B', '#00BDA5', '#F2545B', '#7A5AF8', '#00BDA5', '#FF7A59']
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % colors.length
  return colors[h]
}

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

export default function CompaniesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [hoveredRow, setHoveredRow] = useState(null)
  const [searchFocused, setSearchFocused] = useState(false)

  const filtered = COMPANIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.domain.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  )

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
          }}>Companies</h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{COMPANIES.length} companies</div>
        </div>
        <button
          style={{
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
          Add company
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <span style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex',
        }}>
          <SearchIcon />
        </span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search companies..."
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
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '200px 140px 100px 120px 110px 140px 80px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border)',
        }}>
          {['Company', 'Industry', 'Employees', 'ARR', 'Active Deals', 'Owner', ''].map((h, i) => (
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
        {filtered.map((co, idx) => {
          const isHov = hoveredRow === co.id
          const color = companyColor(co.name)
          const initials = co.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          const arrBig = co.arr >= 5000000
          const ownerInitials = co.owner.split(' ').map(w => w[0]).join('')

          return (
            <div
              key={co.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 140px 100px 120px 110px 140px 80px',
                borderBottom: idx < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                background: isHov
                  ? 'var(--bg-card-hover)'
                  : idx % 2 === 1 ? 'rgba(255,255,255,0.015)' : 'transparent',
                transition: 'background 0.12s ease',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/companies/${co.id}`)}
              onMouseEnter={() => setHoveredRow(co.id)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* Company */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: color + '22',
                  border: `1.5px solid ${color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '10px',
                  fontWeight: '700',
                  color: color,
                }}>
                  {initials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{co.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{co.domain}</div>
                </div>
              </div>

              {/* Industry */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{co.industry}</span>
              </div>

              {/* Employees */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {co.employees.toLocaleString()}
                </span>
              </div>

              {/* ARR */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  fontWeight: '500',
                  color: arrBig ? 'var(--success)' : 'var(--text-secondary)',
                }}>
                  {formatARR(co.arr)}
                </span>
              </div>

              {/* Active Deals */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  fontWeight: '600',
                  color: co.activeDeals > 0 ? 'var(--brand)' : 'var(--text-muted)',
                }}>
                  {co.activeDeals}
                </span>
              </div>

              {/* Owner */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'var(--brand-dim)',
                  border: '1px solid var(--brand-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '9px',
                  fontWeight: '600',
                  color: 'var(--brand)',
                }}>
                  {ownerInitials}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{co.owner}</span>
              </div>

              {/* Actions */}
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
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
                <button style={{
                  padding: '4px 6px', borderRadius: 'var(--radius-sm)',
                  background: 'transparent', border: 'none',
                  color: 'var(--text-muted)', cursor: 'pointer', display: 'flex',
                }}>
                  <DotsIcon />
                </button>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            No companies found
          </div>
        )}
      </div>
    </div>
  )
}
