import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DEALS, PEOPLE } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'
import { Card, Tag, Avatar, Button, Progress, Breadcrumb, Descriptions, Divider, Input } from 'antd'
import { OwnerAvatar } from '../components/OwnerAvatar/OwnerAvatar'
import { MonoValue } from '../components/MonoValue/MonoValue'
import { CheckOutlined } from '@ant-design/icons'

const { TextArea } = Input

const DEAL_ACTIVITIES = [
  { id: 1, type: 'call', title: 'Discovery call completed', desc: 'Discussed pain points and technical requirements. Strong fit for enterprise tier.', time: '2 days ago', person: 'Sam Pierce', personColor: 'var(--brand)' },
  { id: 2, type: 'email', title: 'Proposal sent', desc: 'Sent full proposal document with pricing breakdown and implementation timeline.', time: '5 days ago', person: 'Sam Pierce', personColor: 'var(--brand)' },
  { id: 3, type: 'meeting', title: 'Meeting scheduled', desc: 'Technical evaluation call booked with engineering team. 60 min slot confirmed.', time: '8 days ago', person: 'Sam Pierce', personColor: 'var(--brand)' },
  { id: 4, type: 'note', title: 'Deal created', desc: 'Initial qualification complete. Budget confirmed, timeline Q2.', time: '14 days ago', person: 'Sam Pierce', personColor: 'var(--brand)' },
]

const typeColor = { call: '#00BDA5', email: '#0091AE', meeting: '#7A5AF8', note: '#F5C26B' }

const typeIconSvg = (type) => {
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

export default function DealPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState('')

  const deal = DEALS.find(d => d.id === id)
  if (!deal) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Deal not found.{' '}
        <Button type="link" onClick={() => navigate('/pipeline')}>Back to Pipeline</Button>
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
      <Breadcrumb
        style={{ marginBottom: '20px' }}
        items={[
          { title: <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => navigate('/pipeline')}>Pipeline</span> },
          { title: deal.company },
          { title: deal.name },
        ]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}>
        {/* Main column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header card */}
          <Card>
            <div style={{
              fontFamily: "'Lexend', sans-serif", fontSize: '24px', fontWeight: '700',
              color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '14px', lineHeight: 1.2,
            }}>
              {deal.name}
            </div>

            {/* Company + contact */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Avatar
                size={28}
                shape="square"
                style={{
                  background: 'var(--brand-dim)', border: '1px solid var(--brand-border)',
                  color: 'var(--brand)', fontSize: '10px', fontWeight: '700', borderRadius: '6px',
                }}
              >
                {deal.company.slice(0, 2).toUpperCase()}
              </Avatar>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{deal.company}</span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              {contact && (
                <>
                  <Avatar
                    size={22}
                    style={{ background: contact.color + '22', color: contact.color, fontSize: '8px', fontWeight: '600' }}
                  >
                    {contact.avatar}
                  </Avatar>
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
              <Tag style={{ color: meta.color, background: meta.bg, borderColor: meta.border, fontWeight: 500, borderRadius: '99px', padding: '4px 12px' }}>
                {meta.label}
              </Tag>
              <Tag style={{ borderRadius: '99px', padding: '4px 12px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
                {deal.probability}% probability
              </Tag>
              <Tag style={{ borderRadius: '99px', padding: '4px 12px' }}>
                {deal.activity}
              </Tag>
            </div>
          </Card>

          {/* Activity timeline */}
          <Card title={<span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Activity</span>}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {DEAL_ACTIVITIES.map((act, i) => {
                const color = typeColor[act.type] || '#7A5AF8'
                const isLast = i === DEAL_ACTIVITIES.length - 1
                return (
                  <div key={act.id} style={{ display: 'flex', gap: '14px' }}>
                    {/* Icon + line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: color + '1A', border: `1.5px solid ${color}33`,
                        color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {typeIconSvg(act.type)}
                      </div>
                      {!isLast && <div style={{ width: '1px', flexGrow: 1, background: 'var(--border)', margin: '4px 0' }} />}
                    </div>
                    {/* Content */}
                    <div style={{ paddingBottom: isLast ? 0 : '20px', flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{act.title}</span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '12px' }}>{act.time}</span>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 6px 0' }}>{act.desc}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <OwnerAvatar name={act.person} size={16} />
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{act.person}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Notes */}
          <Card>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>Notes</div>
            <TextArea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add a note about this deal..."
              rows={4}
              style={{ resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button type="primary" size="small">Save note</Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <Card style={{ position: 'sticky', top: '80px' }}>
          {/* Value */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Deal Value
            </div>
            <div style={{
              fontFamily: "'Lexend', sans-serif", fontSize: '28px', fontWeight: '700',
              color: 'var(--brand)', letterSpacing: '-1px',
            }}>
              {formatCurrency(deal.value)}
            </div>
          </div>

          <Divider style={{ margin: '0 0 16px 0' }} />

          {/* Details */}
          <Descriptions column={1} size="small" colon={false} style={{ marginBottom: '16px' }} styles={{ label: { color: 'var(--text-muted)', fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', width: '90px' } }}>
            <Descriptions.Item label="Close Date">
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: 'var(--text-secondary)' }}>{closeFmt}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Owner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <OwnerAvatar name={deal.owner} size={20} />
                <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{deal.owner}</span>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Company">
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{deal.company}</span>
            </Descriptions.Item>
            {contact && (
              <Descriptions.Item label="Contact">
                <Link
                  to={`/people/${contact.id}`}
                  style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--brand)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {contact.name}
                </Link>
              </Descriptions.Item>
            )}
          </Descriptions>

          {/* Probability */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>Probability</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: meta.color }}>{deal.probability}%</span>
            </div>
            <Progress
              percent={deal.probability}
              showInfo={false}
              strokeColor={meta.color}
              size={['100%', 6]}
              trailColor="var(--bg-elevated)"
            />
          </div>

          <Divider style={{ margin: '0 0 16px 0' }} />

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button
              block
              icon={<CheckOutlined />}
              style={{
                background: 'var(--success-subtle)', borderColor: 'rgba(0,189,165,0.3)',
                color: 'var(--success)', fontWeight: '500',
              }}
            >
              Mark as Won
            </Button>
            <Button block>Edit Deal</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
