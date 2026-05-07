import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Statistic, Table, Tag, Avatar, Progress } from 'antd'
import { DEALS, OWNERS, PIPELINE_STAGES, MONTHLY_TARGETS } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'
import { CardHeader } from '../components/CardHeader/CardHeader'
import { MonoValue } from '../components/MonoValue/MonoValue'

const NOW = new Date('2026-05-06')
const YEAR = NOW.getFullYear()
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Donut({ won, lost, size = 132, stroke = 18 }) {
  const total = won + lost
  const wonPct = total ? won / total : 0
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const wonLen = c * wonPct
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="var(--danger-subtle)" strokeWidth={stroke}
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="var(--success)" strokeWidth={stroke}
        strokeDasharray={`${wonLen} ${c - wonLen}`}
        strokeDashoffset={c / 4}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeLinecap="butt"
      />
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="central"
        fontSize="22" fontWeight="700" fill="var(--text-primary)"
        fontFamily="var(--font-mono, ui-monospace, monospace)"
      >
        {Math.round(wonPct * 100)}%
      </text>
    </svg>
  )
}

const CHART_H = 160

export default function ReportsPage() {
  const navigate = useNavigate()
  const [hoveredBar, setHoveredBar] = useState(null)

  const stats = useMemo(() => {
    const active = DEALS.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
    const won = DEALS.filter(d => d.stage === 'closed_won')
    const lost = DEALS.filter(d => d.stage === 'closed_lost')
    const ytdWon = won.filter(d => new Date(d.closeDate).getFullYear() === YEAR)
    const ytdRevenue = ytdWon.reduce((s, d) => s + d.value, 0)
    const pipelineValue = active.reduce((s, d) => s + d.value, 0)
    const weighted = active.reduce((s, d) => s + d.value * (d.probability / 100), 0)
    const closedCount = won.length + lost.length
    const winRate = closedCount ? Math.round((won.length / closedCount) * 100) : 0
    const avgDeal = won.length ? Math.round(won.reduce((s, d) => s + d.value, 0) / won.length) : 0
    return { active, won, lost, ytdRevenue, pipelineValue, weighted, winRate, avgDeal }
  }, [])

  const stageBreakdown = useMemo(() => {
    return PIPELINE_STAGES.filter(s => s.id !== 'closed_won').map(stage => {
      const dealsInStage = stats.active.filter(d => d.stage === stage.id)
      const value = dealsInStage.reduce((s, d) => s + d.value, 0)
      return { ...stage, count: dealsInStage.length, value }
    })
  }, [stats.active])

  const stageMax = Math.max(1, ...stageBreakdown.map(s => s.value))

  const monthly = useMemo(() => {
    const months = MONTH_LABELS.map((label, idx) => {
      const wonInMonth = DEALS.filter(d => {
        if (d.stage !== 'closed_won') return false
        const dt = new Date(d.closeDate)
        return dt.getFullYear() === YEAR && dt.getMonth() === idx
      })
      const value = wonInMonth.reduce((s, d) => s + d.value, 0)
      const target = (MONTHLY_TARGETS[YEAR] || [])[idx] || 0
      return { label, value, target, count: wonInMonth.length }
    })
    return months
  }, [])

  const monthlyMax = Math.max(1, ...monthly.map(m => Math.max(m.value, m.target)))

  const repPerformance = useMemo(() => {
    return OWNERS.map(o => {
      const ownerDeals = DEALS.filter(d => d.owner === o.name)
      const won = ownerDeals.filter(d => d.stage === 'closed_won')
      const lost = ownerDeals.filter(d => d.stage === 'closed_lost')
      const active = ownerDeals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
      const ytdWon = won.filter(d => new Date(d.closeDate).getFullYear() === YEAR)
      const revenue = ytdWon.reduce((s, d) => s + d.value, 0)
      const closedCount = won.length + lost.length
      const winRate = closedCount ? Math.round((won.length / closedCount) * 100) : 0
      return {
        key: o.id,
        name: o.name,
        initials: o.initials,
        quota: o.quota,
        revenue,
        attainment: o.quota ? Math.round((revenue / o.quota) * 100) : 0,
        active: active.length,
        won: won.length,
        winRate,
      }
    }).sort((a, b) => b.revenue - a.revenue)
  }, [])

  const recentDeals = useMemo(() => {
    return [...DEALS]
      .sort((a, b) => new Date(b.closeDate) - new Date(a.closeDate))
      .slice(0, 12)
  }, [])

  const kpis = [
    { label: 'YTD Revenue', value: formatCurrency(stats.ytdRevenue), sub: `${YEAR} closed-won`, accent: 'var(--success)' },
    { label: 'Pipeline Value', value: formatCurrency(stats.pipelineValue), sub: `${stats.active.length} active deals`, accent: 'var(--brand)' },
    { label: 'Weighted Pipeline', value: formatCurrency(stats.weighted), sub: 'Probability adjusted', accent: '#7A5AF8' },
    { label: 'Win Rate', value: stats.winRate + '%', sub: `Avg deal ${formatCurrency(stats.avgDeal)}`, accent: '#06B6D4' },
  ]

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        {kpis.map((kpi, i) => (
          <Card key={kpi.label} className={`anim-fade-up anim-${i + 1}`} styles={{ body: { padding: '20px' } }}>
            <Statistic
              title={<span style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{kpi.label}</span>}
              value={kpi.value}
              valueStyle={{ color: kpi.accent, fontSize: '36px', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1 }}
              formatter={v => v}
            />
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>{kpi.sub}</div>
          </Card>
        ))}
      </div>

      {/* Row 2: Pipeline by Stage + Win/Loss */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title="Pipeline by Stage" />
          <div style={{ padding: '16px 20px 20px' }}>
            {stageBreakdown.map((s, i) => (
              <div key={s.id} style={{ marginBottom: i < stageBreakdown.length - 1 ? '14px' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>· {s.count} {s.count === 1 ? 'deal' : 'deals'}</span>
                  </div>
                  <MonoValue size="13px" color="var(--text-primary)" weight="600">{formatCurrency(s.value)}</MonoValue>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-elevated, #EAF0F6)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(s.value / stageMax) * 100}%`,
                    height: '100%',
                    background: s.color,
                    borderRadius: '4px',
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title="Win / Loss" />
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Donut won={stats.won.length} lost={stats.lost.length} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--success)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Won</span>
                </div>
                <MonoValue size="18px" color="var(--text-primary)" weight="700">{stats.won.length}</MonoValue>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatCurrency(stats.won.reduce((s, d) => s + d.value, 0))}</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--danger)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Lost</span>
                </div>
                <MonoValue size="18px" color="var(--text-primary)" weight="700">{stats.lost.length}</MonoValue>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatCurrency(stats.lost.reduce((s, d) => s + d.value, 0))}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Row 3: Monthly Revenue + Rep Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <Card styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' } }}>
          <CardHeader
            title={`Monthly Revenue · ${YEAR}`}
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--brand)' }} />
                  Closed Won
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'inline-block', width: '14px', borderTop: '2px dashed var(--text-muted)' }} />
                  Target
                </span>
              </div>
            }
          />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '20px 20px 16px' }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
              {monthly.map((m, idx) => {
                const barH = monthlyMax > 0 ? Math.round((m.value / monthlyMax) * CHART_H) : 0
                const targetH = monthlyMax > 0 ? Math.round((m.target / monthlyMax) * CHART_H) : 0
                const isCurrent = idx === NOW.getMonth()
                const isHov = hoveredBar === idx
                return (
                  <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{ height: CHART_H, width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
                    >
                      {/* target line: positioned from bottom */}
                      {m.target > 0 && (
                        <div style={{
                          position: 'absolute',
                          bottom: targetH,
                          left: 0, right: 0,
                          borderTop: '1.5px dashed rgba(153,172,194,0.65)',
                          pointerEvents: 'none',
                        }} />
                      )}
                      {/* bar */}
                      <div
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                        style={{
                          width: '72%',
                          height: Math.max(barH, m.value > 0 ? 4 : 0),
                          background: isCurrent
                            ? 'linear-gradient(180deg, #ff9a80, var(--brand))'
                            : isHov ? '#ff9a80' : 'var(--brand)',
                          opacity: m.value === 0 ? 0.12 : 1,
                          borderRadius: '4px 4px 0 0',
                          transition: 'background 0.15s, transform 0.15s',
                          transform: isHov && m.value > 0 ? 'scaleY(1.03)' : 'none',
                          transformOrigin: 'bottom',
                          cursor: m.value > 0 ? 'pointer' : 'default',
                        }}
                      />
                      {/* hover tooltip */}
                      {isHov && m.value > 0 && (
                        <div style={{
                          position: 'absolute',
                          bottom: Math.max(barH, 4) + 10,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: '#2e3e50',
                          color: '#fff',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                          zIndex: 20,
                          pointerEvents: 'none',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                          lineHeight: 1.6,
                        }}>
                          <div style={{ fontWeight: 600, marginBottom: '3px', color: '#fff' }}>{m.label} {YEAR}</div>
                          <div style={{ color: 'var(--brand)' }}>Revenue &nbsp;{formatCurrency(m.value)}</div>
                          <div style={{ color: 'rgba(255,255,255,0.55)' }}>Target &nbsp;&nbsp;&nbsp;{formatCurrency(m.target)}</div>
                          {m.count > 0 && <div style={{ color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{m.count} deal{m.count !== 1 ? 's' : ''} closed</div>}
                        </div>
                      )}
                    </div>
                    {/* baseline axis */}
                    <div style={{ width: '100%', height: '1px', background: 'var(--border)' }} />
                    <span style={{
                      fontSize: '10px',
                      color: isCurrent ? 'var(--brand)' : 'var(--text-muted)',
                      fontWeight: isCurrent ? 600 : 400,
                      marginTop: '5px',
                    }}>
                      {m.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title="Rep Performance" />
          <div>
            {repPerformance.map((r, i) => (
              <div
                key={r.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 20px',
                  borderBottom: i < repPerformance.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <Avatar
                  size={32}
                  shape="square"
                  style={{
                    background: 'rgba(122,90,248,0.1)',
                    border: '1px solid rgba(122,90,248,0.25)',
                    color: '#7A5AF8',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    flexShrink: 0,
                  }}
                >
                  {r.initials}
                </Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</span>
                    <MonoValue size="12px" color="var(--text-primary)" weight="600">{formatCurrency(r.revenue)}</MonoValue>
                  </div>
                  <Progress
                    percent={Math.min(100, r.attainment)}
                    size="small"
                    showInfo={false}
                    strokeColor={r.attainment >= 100 ? 'var(--success)' : r.attainment >= 60 ? 'var(--brand)' : 'var(--warning)'}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>{r.attainment}% of quota</span>
                    <span>{r.won} won · {r.winRate}% win</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Deals Table */}
      <Card styles={{ body: { padding: 0 } }}>
        <CardHeader title="Recent Deals" />
        <Table
          dataSource={recentDeals}
          rowKey="id"
          pagination={false}
          size="middle"
          onRow={(record) => ({ onClick: () => navigate(`/deals/${record.id}`), style: { cursor: 'pointer' } })}
          columns={[
            {
              title: 'Deal', dataIndex: 'name', key: 'name',
              render: (name, d) => (
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.company}</div>
                </div>
              ),
            },
            {
              title: 'Stage', dataIndex: 'stage', key: 'stage',
              render: (stage) => {
                const m = stageMeta(stage)
                return <Tag style={{ color: m.color, background: m.bg, borderColor: m.border, fontWeight: 500 }}>{m.label}</Tag>
              },
            },
            { title: 'Owner', dataIndex: 'owner', key: 'owner', render: v => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{v}</span> },
            { title: 'Type', dataIndex: 'type', key: 'type', render: v => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{v}</span> },
            {
              title: 'Close Date', dataIndex: 'closeDate', key: 'closeDate', align: 'right',
              render: v => <MonoValue size="12px" color="var(--text-muted)">{v}</MonoValue>,
            },
            {
              title: 'Value', dataIndex: 'value', key: 'value', align: 'right',
              render: v => <MonoValue size="13px" color="var(--brand)" weight="600">{formatCurrency(v)}</MonoValue>,
            },
          ]}
        />
      </Card>
    </div>
  )
}
