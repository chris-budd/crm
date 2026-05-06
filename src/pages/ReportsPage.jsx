import { useState } from 'react'
import { DEALS, PEOPLE } from '../data/crm'
import { formatCurrency } from '../utils/crm'
import { stageMeta } from '../utils/crm'

const MONTHLY = [
  { month: 'Nov', pipeline: 148000, closed: 0,      lost: 22000 },
  { month: 'Dec', pipeline: 193000, closed: 38000,  lost: 15000 },
  { month: 'Jan', pipeline: 265000, closed: 55000,  lost: 31000 },
  { month: 'Feb', pipeline: 312000, closed: 81000,  lost: 28000 },
  { month: 'Mar', pipeline: 389000, closed: 108000, lost: 52000 },
  { month: 'Apr', pipeline: 531000, closed: 162000, lost: 78000 },
]

const OWNER_PERF = [
  { name: 'Sam Pierce',  initials: 'SP', pipeline: 453000, won: 95000,  lost: 78000, deals: 7, winRate: 55 },
  { name: 'Maria Gould', initials: 'MG', pipeline: 90000,  won: 0,      lost: 52000, deals: 5, winRate: 0  },
]

function KpiCard({ label, value, sub, accent, delta, className }) {
  const [hov, setHov] = useState(false)
  const positive = delta && delta.startsWith('+')
  return (
    <div
      className={className}
      style={{
        background: hov ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        borderRadius: 'var(--radius)',
        padding: '20px',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '10px' }}>
        {label}
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', color: accent || 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1, marginBottom: '8px' }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {delta && (
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            color: positive ? 'var(--success)' : 'var(--danger)',
            background: positive ? 'var(--success-dim)' : 'var(--danger-dim)',
            padding: '1px 6px',
            borderRadius: '99px',
          }}>
            {delta}
          </span>
        )}
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{sub}</span>
      </div>
    </div>
  )
}

function SvgBarChart({ data }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.pipeline, d.closed)))
  const W = 560
  const H = 160
  const PAD = { top: 16, right: 16, bottom: 28, left: 54 }
  const chartW = W - PAD.left - PAD.right
  const chartH = H - PAD.top - PAD.bottom
  const groupW = chartW / data.length
  const barW = Math.floor(groupW * 0.28)
  const gap = Math.floor(groupW * 0.04)

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: PAD.top + chartH * (1 - t),
    label: formatCurrency(Math.round(maxVal * t)),
  }))

  const [hov, setHov] = useState(null)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {/* Grid lines */}
      {yTicks.map((tick, i) => (
        <g key={i}>
          <line
            x1={PAD.left} y1={tick.y} x2={W - PAD.right} y2={tick.y}
            stroke="var(--border)" strokeWidth="1" strokeDasharray={i === 0 ? 'none' : '3,3'}
          />
          <text
            x={PAD.left - 8} y={tick.y + 4}
            textAnchor="end"
            fontSize="9"
            fill="var(--text-muted)"
            fontFamily="JetBrains Mono, monospace"
          >
            {tick.label}
          </text>
        </g>
      ))}

      {/* Bars */}
      {data.map((d, i) => {
        const x = PAD.left + i * groupW + groupW / 2
        const pipeH = (d.pipeline / maxVal) * chartH
        const closedH = (d.closed / maxVal) * chartH
        const hovering = hov === i

        return (
          <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
            {/* Pipeline bar */}
            <rect
              x={x - barW - gap / 2}
              y={PAD.top + chartH - pipeH}
              width={barW}
              height={pipeH}
              rx="2"
              fill={hovering ? '#0091AE' : 'rgba(0,145,174,0.35)'}
              style={{ transition: 'fill 0.15s' }}
            />
            {/* Closed won bar */}
            <rect
              x={x + gap / 2}
              y={PAD.top + chartH - closedH}
              width={barW}
              height={closedH}
              rx="2"
              fill={hovering ? '#00BDA5' : 'rgba(0,189,165,0.5)'}
              style={{ transition: 'fill 0.15s' }}
            />
            {/* Month label */}
            <text
              x={x}
              y={PAD.top + chartH + 14}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-muted)"
              fontFamily="Lexend, sans-serif"
            >
              {d.month}
            </text>
            {/* Hover tooltip */}
            {hovering && (
              <g>
                <rect
                  x={x - 40} y={PAD.top + chartH - pipeH - 36}
                  width={80} height={30}
                  rx="4"
                  fill="var(--text-primary)"
                  opacity="0.9"
                />
                <text x={x} y={PAD.top + chartH - pipeH - 22} textAnchor="middle" fontSize="9" fill="#fff" fontFamily="JetBrains Mono, monospace">
                  {formatCurrency(d.pipeline)}
                </text>
                <text x={x} y={PAD.top + chartH - pipeH - 12} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)" fontFamily="Lexend, sans-serif">
                  pipeline
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function DonutChart({ won, lost }) {
  const total = won + lost
  const winRate = total > 0 ? (won / total) : 0
  const R = 52
  const cx = 70
  const cy = 70
  const circumference = 2 * Math.PI * R
  const wonArc = circumference * winRate
  const lostArc = circumference * (1 - winRate)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <svg viewBox="0 0 140 140" style={{ width: '140px', height: '140px', flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--bg-elevated)" strokeWidth="14" />
        {lostArc > 0 && (
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="var(--danger)"
            strokeWidth="14"
            strokeDasharray={`${lostArc} ${circumference}`}
            strokeDashoffset={-wonArc}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            opacity="0.4"
          />
        )}
        {wonArc > 0 && (
          <circle
            cx={cx} cy={cy} r={R}
            fill="none"
            stroke="var(--success)"
            strokeWidth="14"
            strokeDasharray={`${wonArc} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        )}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--text-primary)" fontFamily="Lexend, sans-serif">
          {Math.round(winRate * 100)}%
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontFamily="Lexend, sans-serif">
          win rate
        </text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--success)', flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Closed Won</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', fontWeight: '600', color: 'var(--success)' }}>
            {won} deals
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--danger)', opacity: 0.5, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Closed Lost</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', fontWeight: '600', color: 'var(--danger)', opacity: 0.7 }}>
            {lost} deals
          </div>
        </div>
      </div>
    </div>
  )
}

function PipelineStageBar({ stage, value, maxValue, count }) {
  const meta = stageMeta(stage)
  const pct = maxValue > 0 ? (value / maxValue) * 100 : 0
  const [hov, setHov] = useState(false)

  return (
    <div
      style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '7px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            padding: '2px 9px',
            borderRadius: '99px',
            fontSize: '11px',
            fontWeight: '500',
            color: meta.color,
            background: meta.bg,
            border: `1px solid ${meta.border}`,
          }}>
            {meta.label}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{count} deal{count !== 1 ? 's' : ''}</span>
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>
          {formatCurrency(value)}
        </span>
      </div>
      <div style={{ height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{
          width: hov ? `${Math.min(pct + 2, 100)}%` : `${pct}%`,
          height: '100%',
          background: meta.color,
          borderRadius: '3px',
          transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
          opacity: hov ? 1 : 0.75,
        }} />
      </div>
    </div>
  )
}

const TABS = ['Overview', 'Pipeline', 'Revenue', 'Team']

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('Overview')

  const won = DEALS.filter(d => d.stage === 'closed_won')
  const lost = DEALS.filter(d => d.stage === 'closed_lost')
  const active = DEALS.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
  const allClosed = [...won, ...lost]

  const pipelineValue = active.reduce((s, d) => s + d.value, 0)
  const wonValue = won.reduce((s, d) => s + d.value, 0)
  const lostValue = lost.reduce((s, d) => s + d.value, 0)
  const winRate = allClosed.length > 0 ? Math.round((won.length / allClosed.length) * 100) : 0
  const avgDealSize = allClosed.length > 0 ? Math.round((wonValue + lostValue) / allClosed.length) : 0

  const stages = ['prospect', 'qualified', 'proposal', 'negotiation']
  const stageData = stages.map(s => ({
    stage: s,
    value: DEALS.filter(d => d.stage === s).reduce((sum, d) => sum + d.value, 0),
    count: DEALS.filter(d => d.stage === s).length,
  }))
  const maxStageValue = Math.max(...stageData.map(s => s.value))

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            Reports
          </h1>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Q2 2025 · Last updated just now</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            display: 'flex',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
          }}>
            {['Last 30d', 'Last 90d', 'YTD'].map(r => (
              <button
                key={r}
                style={{
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: r === 'Last 90d' ? '600' : '400',
                  background: r === 'Last 90d' ? 'var(--brand-dim)' : 'transparent',
                  color: r === 'Last 90d' ? 'var(--brand)' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  borderRight: r !== 'YTD' ? '1px solid var(--border)' : 'none',
                }}
              >
                {r}
              </button>
            ))}
          </div>
          <button style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--brand-border)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '20px', borderBottom: '1px solid var(--border)' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: activeTab === tab ? '600' : '400',
              color: activeTab === tab ? 'var(--brand)' : 'var(--text-secondary)',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--brand)' : '2px solid transparent',
              cursor: 'pointer',
              marginBottom: '-1px',
              transition: 'color 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <KpiCard
          className="anim-fade-up anim-1"
          label="Active Pipeline"
          value={formatCurrency(pipelineValue)}
          sub="vs last quarter"
          delta="+18%"
          accent="var(--brand)"
        />
        <KpiCard
          className="anim-fade-up anim-2"
          label="Won This Quarter"
          value={formatCurrency(wonValue)}
          sub="vs last quarter"
          delta="+34%"
          accent="var(--success)"
        />
        <KpiCard
          className="anim-fade-up anim-3"
          label="Win Rate"
          value={winRate + '%'}
          sub="closed deals"
          delta="+6%"
          accent="#0091AE"
        />
        <KpiCard
          className="anim-fade-up anim-4"
          label="Avg Deal Size"
          value={formatCurrency(avgDealSize)}
          sub="all closed"
          delta="+11%"
          accent="var(--text-primary)"
        />
      </div>

      {/* Row 2: pipeline stages + win/loss donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* Pipeline by Stage */}
        <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Pipeline by Stage</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--brand)', fontWeight: '500' }}>
              {formatCurrency(pipelineValue)} total
            </span>
          </div>
          <div style={{ padding: '4px 20px 8px' }}>
            {stageData.map(s => (
              <PipelineStageBar key={s.stage} stage={s.stage} value={s.value} maxValue={maxStageValue} count={s.count} />
            ))}
          </div>
        </div>

        {/* Win / Loss */}
        <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Win / Loss Ratio</span>
          </div>
          <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <DonutChart won={won.length} lost={lost.length} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ background: 'var(--success-dim)', border: '1px solid rgba(0,189,165,0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--success)', marginBottom: '4px' }}>Won Value</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', fontWeight: '600', color: 'var(--success)' }}>{formatCurrency(wonValue)}</div>
              </div>
              <div style={{ background: 'var(--danger-dim)', border: '1px solid rgba(242,84,91,0.2)', borderRadius: 'var(--radius-sm)', padding: '10px 12px' }}>
                <div style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--danger)', marginBottom: '4px' }}>Lost Value</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '14px', fontWeight: '600', color: 'var(--danger)' }}>{formatCurrency(lostValue)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Monthly trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Monthly Performance</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(0,145,174,0.5)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pipeline</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(0,189,165,0.6)' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Closed Won</span>
              </div>
            </div>
          </div>
          <div style={{ padding: '16px 20px 12px' }}>
            <SvgBarChart data={MONTHLY} />
          </div>
        </div>

        {/* Owner leaderboard */}
        <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Rep Performance</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {OWNER_PERF.map((rep, i) => (
              <div key={rep.name} style={{
                padding: '14px 20px',
                borderBottom: i < OWNER_PERF.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'var(--brand-dim)', border: '1px solid var(--brand-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: '700', color: 'var(--brand)', flexShrink: 0,
                  }}>
                    {rep.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{rep.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rep.deals} deals · {rep.winRate}% win rate</div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: '500', color: 'var(--success)' }}>
                    {formatCurrency(rep.won)}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '7px 10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>Pipeline</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                      {formatCurrency(rep.pipeline)}
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', padding: '7px 10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '2px' }}>Lost</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--danger)', fontWeight: '500', opacity: 0.8 }}>
                      {formatCurrency(rep.lost)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Top deals */}
      <div style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Top Open Deals</span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>by value</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 130px 110px 120px', background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
          {['Deal', 'Value', 'Stage', 'Probability', 'Close Date'].map((h, i) => (
            <div key={i} style={{ padding: '9px 16px', fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
              {h}
            </div>
          ))}
        </div>
        {active
          .sort((a, b) => b.value - a.value)
          .slice(0, 6)
          .map((deal, i, arr) => {
            const meta = stageMeta(deal.stage)
            return (
              <div
                key={deal.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 130px 110px 120px',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
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
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '4px', background: 'var(--bg-elevated)', borderRadius: '2px' }}>
                    <div style={{ width: deal.probability + '%', height: '100%', background: meta.color, borderRadius: '2px' }} />
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0 }}>
                    {deal.probability}%
                  </span>
                </div>
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--text-muted)' }}>{deal.closeDate}</span>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
