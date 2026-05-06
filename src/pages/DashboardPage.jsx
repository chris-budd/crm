import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEALS, TASKS, ACTIVITIES } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'

const activityTypeIcon = (type) => {
  if (type === 'email') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
  if (type === 'call') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
  if (type === 'deal') return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  )
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function KpiCard({ label, value, sub, accent, className }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={className}
      style={{
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        transition: 'background 0.15s ease',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontSize: '11px',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '10px',
      }}>{label}</div>
      <div style={{
        fontFamily: "'Lexend', sans-serif",
        fontSize: '36px',
        fontWeight: '700',
        color: accent || 'var(--text-primary)',
        lineHeight: 1,
        letterSpacing: '-1px',
        marginBottom: '8px',
      }}>{value}</div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</div>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [hoveredDeal, setHoveredDeal] = useState(null)
  const [tasks, setTasks] = useState(TASKS)

  const now = new Date('2025-05-05')
  const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const activeDeals = DEALS.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
  const closedWon = DEALS.filter(d => d.stage === 'closed_won')
  const allClosed = DEALS.filter(d => d.stage === 'closed_won' || d.stage === 'closed_lost')
  const pipelineValue = activeDeals.reduce((s, d) => s + d.value, 0)
  const wonValue = closedWon.reduce((s, d) => s + d.value, 0)
  const winRate = allClosed.length > 0 ? Math.round((closedWon.length / allClosed.length) * 100) : 0

  const closingSoon = DEALS.filter(d => {
    if (d.stage === 'closed_won' || d.stage === 'closed_lost') return false
    const cd = new Date(d.closeDate)
    return cd >= now && cd <= in30
  }).sort((a, b) => new Date(a.closeDate) - new Date(b.closeDate))

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <KpiCard
          className="anim-fade-up anim-1"
          label="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          sub="↑ Active pipeline"
          accent="var(--brand)"
        />
        <KpiCard
          className="anim-fade-up anim-2"
          label="Won This Month"
          value={formatCurrency(wonValue)}
          sub="↑ Closed won"
          accent="var(--success)"
        />
        <KpiCard
          className="anim-fade-up anim-3"
          label="Win Rate"
          value={winRate + '%'}
          sub="→ All closed deals"
          accent="#06B6D4"
        />
        <KpiCard
          className="anim-fade-up anim-4"
          label="Open Deals"
          value={String(activeDeals.length)}
          sub="→ Across all stages"
          accent="var(--brand)"
        />
      </div>

      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '24px' }}>
        {/* Closing Soon */}
        <div style={{
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-card)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Closing Soon</span>
            <button
              style={{
                fontSize: '12px',
                color: 'var(--brand)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/pipeline')}
            >
              View all →
            </button>
          </div>
          <div>
            {closingSoon.map((deal, i) => {
              const meta = stageMeta(deal.stage)
              const isHov = hoveredDeal === deal.id
              return (
                <div
                  key={deal.id}
                  onClick={() => navigate(`/deals/${deal.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 20px',
                    borderBottom: i < closingSoon.length - 1 ? '1px solid var(--border)' : 'none',
                    background: isHov ? 'var(--bg-card-hover)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={() => setHoveredDeal(deal.id)}
                  onMouseLeave={() => setHoveredDeal(null)}
                >
                  {/* Company avatar */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--brand-dim)',
                    border: '1px solid var(--brand-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--brand)',
                  }}>
                    {deal.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {deal.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{deal.company}</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: '500', color: 'var(--brand)', flexShrink: 0 }}>
                    {formatCurrency(deal.value)}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0, width: '60px', textAlign: 'right' }}>
                    {deal.closeDate.slice(5)}
                  </div>
                  <div style={{
                    padding: '2px 8px',
                    borderRadius: '99px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: meta.color,
                    background: meta.bg,
                    border: `1px solid ${meta.border}`,
                    flexShrink: 0,
                  }}>
                    {meta.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tasks */}
        <div style={{
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-card)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Tasks</span>
            <span style={{
              fontSize: '11px',
              padding: '2px 7px',
              borderRadius: '99px',
              background: 'var(--brand-dim)',
              color: 'var(--brand)',
              border: '1px solid var(--brand-border)',
            }}>
              {tasks.filter(t => !t.done).length} open
            </span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {tasks.map((task, i) => {
              const dueColor = task.due === 'Today' ? 'var(--danger)' : task.due === 'Tomorrow' ? 'var(--warning)' : 'var(--text-muted)'
              const dueBg = task.due === 'Today' ? 'var(--danger-dim)' : task.due === 'Tomorrow' ? 'var(--warning-dim)' : 'rgba(255,255,255,0.04)'
              const priorityColor = task.priority === 'high' ? 'var(--danger)' : task.priority === 'medium' ? 'var(--warning)' : 'var(--text-muted)'
              return (
                <div
                  key={task.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '10px 16px',
                    borderBottom: i < tasks.length - 1 ? '1px solid var(--border)' : 'none',
                    opacity: task.done ? 0.5 : 1,
                  }}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      border: `1.5px solid ${task.done ? 'var(--success)' : 'var(--border-strong)'}`,
                      background: task.done ? 'var(--success-dim)' : 'transparent',
                      flexShrink: 0,
                      marginTop: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {task.done && (
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    )}
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '12.5px',
                      fontWeight: '500',
                      color: 'var(--text-primary)',
                      textDecoration: task.done ? 'line-through' : 'none',
                      marginBottom: '2px',
                    }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{task.person}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '99px',
                      background: dueBg,
                      color: dueColor,
                      border: `1px solid ${task.due === 'Today' ? 'rgba(239,68,68,0.2)' : task.due === 'Tomorrow' ? 'rgba(245,158,11,0.2)' : 'var(--border)'}`,
                    }}>
                      {task.due}
                    </span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: priorityColor, display: 'block' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Recent Activity</span>
        </div>
        <div style={{ padding: '8px 0' }}>
          {ACTIVITIES.map((act, i) => (
            <div
              key={act.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '12px 20px',
                borderBottom: i < ACTIVITIES.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: act.color + '1A',
                border: `1px solid ${act.color}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: act.color,
              }}>
                {activityTypeIcon(act.type)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', marginBottom: '1px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{act.person}</span>
                  <span style={{ color: 'var(--text-secondary)', marginLeft: '6px' }}>· {act.company}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{act.text}</div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0, marginTop: '2px' }}>
                {act.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
