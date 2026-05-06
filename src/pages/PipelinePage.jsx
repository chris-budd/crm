import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEALS, PIPELINE_STAGES } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'

function DealCard({ deal, navigate }) {
  const [hovered, setHovered] = useState(false)
  const meta = stageMeta(deal.stage)
  const stage = PIPELINE_STAGES.find(s => s.id === deal.stage)
  const stageColor = stage ? stage.color : '#5C5C78'

  const contactInitials = deal.contact.split(' ').map(w => w[0]).join('').slice(0, 2)
  const ownerInitials = deal.owner.split(' ').map(w => w[0]).join('')

  const closeMonth = deal.closeDate.slice(5, 7)
  const closeDay = deal.closeDate.slice(8, 10)
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const closeFmt = months[parseInt(closeMonth)] + ' ' + closeDay

  return (
    <div
      onClick={() => navigate(`/deals/${deal.id}`)}
      style={{
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '14px',
        cursor: 'pointer',
        transition: 'background 0.15s ease, box-shadow 0.15s ease',
        boxShadow: hovered ? 'var(--shadow-elevated)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: company + value */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
        <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {deal.company}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--brand)',
          flexShrink: 0,
        }}>
          {formatCurrency(deal.value)}
        </div>
      </div>

      {/* Deal name */}
      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.3 }}>
        {deal.name.replace(deal.company + ' — ', '')}
      </div>

      {/* Contact */}
      <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
        <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{deal.contact}</span>
        {' '}
        <span>·</span>
        {' '}
        <span style={{ color: 'var(--text-muted)' }}>
          {(() => {
            const roles = {
              'Olivia Hartman': 'VP Eng', 'Marcus Chen': 'CTO', 'Priya Nair': 'Head of Product',
              'James Whitfield': 'CEO', 'Sofia Reyes': 'Dir. Ops', 'Tom Eriksson': 'CFO',
              'Aisha Bello': 'Product Lead', 'Ravi Sharma': 'COO',
            }
            return roles[deal.contact] || ''
          })()}
        </span>
      </div>

      {/* Close date + probability */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '3px 8px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10.5px',
            color: 'var(--text-secondary)',
          }}>
            {closeFmt}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: stageColor,
            fontWeight: '500',
          }}>
            {deal.probability}%
          </span>
        </div>
      </div>

      {/* Owner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'var(--brand-dim)',
          border: '1px solid var(--brand-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          fontWeight: '600',
          color: 'var(--brand)',
          flexShrink: 0,
        }}>
          {ownerInitials}
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{deal.owner}</span>
      </div>

      {/* Probability bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'var(--bg-elevated)',
      }}>
        <div style={{
          width: deal.probability + '%',
          height: '100%',
          background: stageColor,
          borderRadius: '0 2px 0 0',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const navigate = useNavigate()

  const totalPipeline = DEALS
    .filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
    .reduce((s, d) => s + d.value, 0)

  const dealsByStage = {}
  PIPELINE_STAGES.forEach(s => {
    dealsByStage[s.id] = DEALS.filter(d => d.stage === s.id)
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 96px)' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={{
            fontFamily: "'Lexend', sans-serif",
            fontSize: '22px',
            fontWeight: '700',
            color: 'var(--text-primary)',
            letterSpacing: '-0.5px',
          }}>Pipeline</h1>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--brand)',
          }}>
            {formatCurrency(totalPipeline)} total
          </span>
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
          New Deal
        </button>
      </div>

      {/* Kanban board */}
      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '12px',
        flex: 1,
        alignItems: 'stretch',
      }}>
        {PIPELINE_STAGES.map(stage => {
          const deals = dealsByStage[stage.id] || []
          const colTotal = deals.reduce((s, d) => s + d.value, 0)

          return (
            <div
              key={stage.id}
              style={{
                minWidth: '260px',
                width: '260px',
                flexShrink: 0,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Column header */}
              <div style={{
                padding: '12px 14px',
                borderBottom: '1px solid var(--border)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: stage.color,
                      flexShrink: 0,
                      boxShadow: `0 0 6px ${stage.color}66`,
                    }} />
                    <span style={{
                      fontSize: '12.5px',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                    }}>
                      {stage.label}
                    </span>
                  </div>
                  <span style={{
                    padding: '1px 7px',
                    borderRadius: '99px',
                    fontSize: '10.5px',
                    fontWeight: '600',
                    color: stage.color,
                    background: stage.color + '1A',
                    border: `1px solid ${stage.color}33`,
                  }}>
                    {deals.length}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  paddingLeft: '15px',
                }}>
                  {colTotal > 0 ? formatCurrency(colTotal) : '—'}
                </div>
              </div>

              {/* Cards */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {deals.map(deal => (
                  <DealCard key={deal.id} deal={deal} navigate={navigate} />
                ))}
                {deals.length === 0 && (
                  <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    border: '1px dashed var(--border)',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    No deals
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
