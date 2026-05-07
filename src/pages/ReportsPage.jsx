import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Statistic, Table, Tag, Progress, Segmented } from 'antd'
import { DEALS, OWNERS, PIPELINE_STAGES, MONTHLY_TARGETS } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'
import { CardHeader } from '../components/CardHeader/CardHeader'
import { MonoValue } from '../components/MonoValue/MonoValue'
import { OwnerAvatar } from '../components/OwnerAvatar/OwnerAvatar'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { DownloadOutlined } from '@ant-design/icons'
// in the CardHeader right prop:

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function ReportsPage() {
  const navigate = useNavigate()
  const [year, setYear] = useState(2026)

  const stats = useMemo(() => {
    const active = DEALS.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost')
    const won = DEALS.filter(d => d.stage === 'closed_won')
    const lost = DEALS.filter(d => d.stage === 'closed_lost')
    const closed = won.length + lost.length
    const wonValue = won.reduce((s, d) => s + d.value, 0)
    const pipelineValue = active.reduce((s, d) => s + d.value, 0)
    const winRate = closed ? Math.round((won.length / closed) * 100) : 0
    const avgWon = won.length ? Math.round(wonValue / won.length) : 0
    return { active, won, lost, pipelineValue, wonValue, winRate, avgWon }
  }, [])

  const pipelineByStage = useMemo(() => {
    return PIPELINE_STAGES.filter(s => s.id !== 'closed_won').map(s => {
      const deals = DEALS.filter(d => d.stage === s.id)
      const total = deals.reduce((sum, d) => sum + d.value, 0)
      return { ...s, count: deals.length, total }
    })
  }, [])
  const pipelineMax = Math.max(...pipelineByStage.map(s => s.total), 1)

  const monthlyRevenue = useMemo(() => {
    const buckets = Array(12).fill(0)
    DEALS.forEach(d => {
      if (d.stage !== 'closed_won') return
      const y = parseInt(d.closeDate.slice(0, 4))
      const m = parseInt(d.closeDate.slice(5, 7)) - 1
      if (y === year) buckets[m] += d.value
    })
    return buckets
  }, [year])
  const monthlyMax = Math.max(...monthlyRevenue, ...(MONTHLY_TARGETS[year] || []), 1)

  const repPerformance = useMemo(() => {
    return OWNERS.map(o => {
      const wonDeals = DEALS.filter(d => d.owner === o.name && d.stage === 'closed_won')
      const lostDeals = DEALS.filter(d => d.owner === o.name && d.stage === 'closed_lost')
      const activeDeals = DEALS.filter(d => d.owner === o.name && d.stage !== 'closed_won' && d.stage !== 'closed_lost')
      const wonValue = wonDeals.reduce((s, d) => s + d.value, 0)
      const total = wonDeals.length + lostDeals.length
      const winRate = total ? Math.round((wonDeals.length / total) * 100) : 0
      const attainment = Math.round((wonValue / o.quota) * 100)
      return { ...o, wonValue, wonCount: wonDeals.length, activeCount: activeDeals.length, winRate, attainment }
    }).sort((a, b) => b.wonValue - a.wonValue)
  }, [])

  const recentClosed = useMemo(() => {
    return DEALS
      .filter(d => d.stage === 'closed_won' || d.stage === 'closed_lost')
      .sort((a, b) => new Date(b.closeDate) - new Date(a.closeDate))
      .slice(0, 12)
  }, [])

  const winLossTotal = stats.won.length + stats.lost.length

  const kpis = [
    { label: 'Won Revenue', value: formatCurrency(stats.wonValue), sub: `${stats.won.length} deals`, accent: 'var(--success)' },
    { label: 'Pipeline Value', value: formatCurrency(stats.pipelineValue), sub: `${stats.active.length} open deals`, accent: 'var(--brand)' },
    { label: 'Win Rate', value: stats.winRate + '%', sub: `${stats.won.length} won / ${stats.lost.length} lost`, accent: '#06B6D4' },
    { label: 'Avg Won Deal', value: formatCurrency(stats.avgWon), sub: 'All-time average', accent: '#7A5AF8' },
  ]

  return (
    <div style={{ maxWidth: '100%' }}>
      <PageHeader
        title="Reports"
        subtitle="Sales performance, pipeline health, and rep activity"
        action={
          <Segmented
            value={year}
            onChange={setYear}
            options={[{ label: '2024', value: 2024 }, { label: '2025', value: 2025 }, { label: '2026', value: 2026 }]}
          />
        }
      />

      {/* KPI row */}
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

      {/* Pipeline by stage + Win/Loss */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title="Pipeline by Stage" right={<MonoValue size="12px" color="var(--text-muted)">{formatCurrency(stats.pipelineValue)} total</MonoValue>} />
          <div style={{ padding: '16px 20px 20px' }}>
            {pipelineByStage.map((s, i) => {
              const pct = (s.total / pipelineMax) * 100
              return (
                <div key={s.id} style={{ marginBottom: i < pipelineByStage.length - 1 ? '14px' : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
                      <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{s.label}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.count} deals</span>
                    </div>
                    <MonoValue size="13px" color="var(--text-primary)">{formatCurrency(s.total)}</MonoValue>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: s.color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title="Win / Loss" />
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <WinLossDonut won={stats.won.length} lost={stats.lost.length} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <LegendRow color="var(--success)" label="Won" count={stats.won.length} pct={winLossTotal ? Math.round((stats.won.length / winLossTotal) * 100) : 0} value={formatCurrency(stats.wonValue)} />
              <LegendRow color="var(--danger)" label="Lost" count={stats.lost.length} pct={winLossTotal ? Math.round((stats.lost.length / winLossTotal) * 100) : 0} value={formatCurrency(stats.lost.reduce((s, d) => s + d.value, 0))} />
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                Based on {winLossTotal} closed deals
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly revenue + Rep performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px', marginBottom: '24px' }}>
        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title={`Monthly Revenue · ${year}`} right={<MonoValue size="12px" color="var(--text-muted)">{formatCurrency(monthlyRevenue.reduce((a, b) => a + b, 0))}</MonoValue>} />
          <div style={{ padding: '20px' }}>
            <RevenueChart data={monthlyRevenue} targets={MONTHLY_TARGETS[year] || []} max={monthlyMax} />
          </div>
        </Card>

        <Card styles={{ body: { padding: 0 } }}>
          <CardHeader title="Rep Performance" />
          <div>
            {repPerformance.map((r, i) => (
              <div
                key={r.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 20px',
                  borderBottom: i < repPerformance.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <OwnerAvatar name={r.name} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{r.name}</span>
                    <MonoValue size="12px" color="var(--text-primary)">{formatCurrency(r.wonValue)}</MonoValue>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Progress
                      percent={Math.min(r.attainment, 100)}
                      size="small"
                      showInfo={false}
                      strokeColor={r.attainment >= 100 ? 'var(--success)' : 'var(--brand)'}
                      style={{ flex: 1, margin: 0 }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', width: '64px', textAlign: 'right' }}>
                      {r.attainment}% of quota
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {r.wonCount} won · {r.activeCount} open · {r.winRate}% win rate
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent closed deals */}
      <Card styles={{ body: { padding: 0 } }}>
        <CardHeader title="Recent Closed Deals" right={<Button size="small" icon={<DownloadOutlined />}
  onClick={() => {}}>
  Export
</Button>} />
        <Table
          dataSource={recentClosed}
          rowKey="id"
          pagination={false}
          size="middle"
          onRow={(record) => ({ onClick: () => navigate(`/deals/${record.id}`), style: { cursor: 'pointer' } })}
          columns={[
            {
              title: 'Deal',
              dataIndex: 'name',
              render: (name, r) => (
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.company}</div>
                </div>
              ),
            },
            {
              title: 'Owner',
              dataIndex: 'owner',
              width: 160,
              render: (owner) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <OwnerAvatar name={owner} size={22} />
                  <span style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>{owner}</span>
                </div>
              ),
            },
            {
              title: 'Stage',
              dataIndex: 'stage',
              width: 130,
              render: (stage) => {
                const meta = stageMeta(stage)
                return <Tag style={{ color: meta.color, background: meta.bg, borderColor: meta.border, fontWeight: 500 }}>{meta.label}</Tag>
              },
            },
            {
              title: 'Type',
              dataIndex: 'type',
              width: 130,
              render: (t) => <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t}</span>,
            },
            {
              title: 'Close Date',
              dataIndex: 'closeDate',
              width: 120,
              render: (d) => <MonoValue size="12px" color="var(--text-muted)">{d}</MonoValue>,
            },
            {
              title: 'Value',
              dataIndex: 'value',
              width: 110,
              align: 'right',
              render: (v, r) => (
                <MonoValue size="13px" color={r.stage === 'closed_won' ? 'var(--success)' : 'var(--text-muted)'}>
                  {formatCurrency(v)}
                </MonoValue>
              ),
            },
          ]}
        />
      </Card>
    </div>
  )
}

function LegendRow({ color, label, count, pct, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: color, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500 }}>
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
          <span>{count} deals</span>
          <MonoValue size="11px" color="var(--text-muted)">{value}</MonoValue>
        </div>
      </div>
    </div>
  )
}

function WinLossDonut({ won, lost }) {
  const total = won + lost
  const size = 120
  const r = 46
  const c = 2 * Math.PI * r
  const wonPct = total ? won / total : 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth="14" />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="var(--success)" strokeWidth="14" strokeLinecap="butt"
        strokeDasharray={`${wonPct * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text-primary)">
        {Math.round(wonPct * 100)}%
      </text>
      <text x={size / 2} y={size / 2 + 16} textAnchor="middle" fontSize="10" fill="var(--text-muted)" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Win rate
      </text>
    </svg>
  )
}

function RevenueChart({ data, targets, max }) {
  const height = 200
  const barWidth = 28
  const gap = 16
  const width = data.length * (barWidth + gap)
  const padBottom = 24

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg width={width} height={height + padBottom} style={{ display: 'block' }}>
        {[0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1="0" x2={width} y1={height - height * t} y2={height - height * t}
            stroke="var(--border)" strokeDasharray="3 3" />
        ))}
        {data.map((v, i) => {
          const h = max ? (v / max) * height : 0
          const tH = max && targets[i] ? (targets[i] / max) * height : 0
          const x = i * (barWidth + gap) + gap / 2
          return (
            <g key={i}>
              {tH > 0 && (
                <line
                  x1={x - 4} x2={x + barWidth + 4}
                  y1={height - tH} y2={height - tH}
                  stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4 3"
                />
              )}
              <rect
                x={x} y={height - h} width={barWidth} height={h}
                rx="3"
                fill="var(--brand)"
              />
              <text x={x + barWidth / 2} y={height + 16} textAnchor="middle" fontSize="11" fill="var(--text-muted)">
                {MONTHS[i]}
              </text>
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--brand)' }} />
          Closed Won
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '14px', height: '0', borderTop: '1.5px dashed var(--text-muted)' }} />
          Monthly target
        </span>
      </div>
    </div>
  )
}
