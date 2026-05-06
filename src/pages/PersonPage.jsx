import { useParams, useNavigate, Link } from 'react-router-dom'
import { PEOPLE, DEALS } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'
import { Card, Tag, Avatar, Button, Table, Timeline, Breadcrumb, Descriptions, Divider } from 'antd'
import { CardHeader } from '../components/CardHeader/CardHeader'
import { MonoValue } from '../components/MonoValue/MonoValue'
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'

const PERSON_ACTIVITIES = [
  { id: 1, type: 'email', title: 'Follow-up email sent', desc: 'Sent detailed breakdown of enterprise tier pricing and onboarding timeline.', time: '2 days ago', color: '#0091AE' },
  { id: 2, type: 'call', title: 'Discovery call', desc: '45-minute call covering technical requirements and integration needs. Very engaged.', time: '1 week ago', color: 'var(--success)' },
  { id: 3, type: 'note', title: 'Note added', desc: 'Champion confirmed budget approved. Procurement review scheduled for next week.', time: '2 weeks ago', color: 'var(--warning)' },
]

const TAG_COLORS = {
  champion: { color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)', border: 'rgba(122,90,248,0.2)' },
  technical: { color: '#0091AE', bg: 'rgba(0,145,174,0.08)', border: 'rgba(0,145,174,0.2)' },
  'decision-maker': { color: 'var(--brand)', bg: 'var(--brand-subtle)', border: 'rgba(255,122,89,0.2)' },
  executive: { color: 'var(--success)', bg: 'rgba(0,189,165,0.08)', border: 'rgba(0,189,165,0.2)' },
}

export default function PersonPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const person = PEOPLE.find(p => p.id === id)
  if (!person) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Contact not found.{' '}
        <Button type="link" onClick={() => navigate('/people')}>Back to People</Button>
      </div>
    )
  }

  const personDeals = DEALS.filter(d => d.contactId === person.id)

  const dealColumns = [
    {
      title: 'Deal',
      dataIndex: 'name',
      key: 'name',
      render: v => <span style={{ fontSize: '12.5px', fontWeight: '500', color: 'var(--text-primary)' }}>{v}</span>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 100,
      render: v => (
        <MonoValue weight="500" color="var(--brand)">{formatCurrency(v)}</MonoValue>
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      width: 100,
      render: stage => {
        const meta = stageMeta(stage)
        return <Tag style={{ color: meta.color, background: meta.bg, borderColor: meta.border, fontWeight: 500 }}>{meta.label}</Tag>
      },
    },
    {
      title: 'Close Date',
      dataIndex: 'closeDate',
      key: 'closeDate',
      width: 110,
      render: v => (
        <MonoValue size="11.5px" color="var(--text-muted)">{v}</MonoValue>
      ),
    },
  ]

  const timelineItems = PERSON_ACTIVITIES.map(act => ({
    color: act.color,
    children: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
          <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)' }}>{act.title}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{act.desc}</p>
      </div>
    ),
  }))

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Breadcrumb */}
      <Breadcrumb
        style={{ marginBottom: '20px' }}
        items={[
          { title: <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => navigate('/people')}>People</span> },
          { title: person.name },
        ]}
      />

      {/* Header */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          <Avatar
            size={64}
            style={{
              background: person.color + '22',
              border: `2px solid ${person.color}55`,
              color: person.color,
              fontSize: '20px',
              fontWeight: '600',
              flexShrink: 0,
            }}
          >
            {person.avatar}
          </Avatar>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontFamily: "'Lexend', sans-serif", fontSize: '28px', fontWeight: '700',
              color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '4px', lineHeight: 1.1,
            }}>
              {person.name}
            </h1>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              {person.role}{' · '}
              <span style={{ color: 'var(--brand)', cursor: 'pointer' }}>{person.company}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {person.tags.map(tag => {
                const tc = TAG_COLORS[tag] || { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.06)', border: 'var(--border)' }
                return (
                  <Tag key={tag} style={{ color: tc.color, background: tc.bg, borderColor: tc.border, fontWeight: 500 }}>
                    {tag}
                  </Tag>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Deals */}
          <Card styles={{ body: { padding: 0 } }}>
            <CardHeader
              title="Deals"
              right={<Tag style={{ color: 'var(--brand)', background: 'var(--brand-subtle)', borderColor: 'var(--brand-border)' }}>{personDeals.length}</Tag>}
            />
            {personDeals.length > 0 ? (
              <Table
                dataSource={personDeals}
                columns={dealColumns}
                rowKey="id"
                size="middle"
                pagination={false}
                onRow={record => ({ onClick: () => navigate(`/deals/${record.id}`) })}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No deals yet</div>
            )}
          </Card>

          {/* Activity */}
          <Card title={<span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Activity</span>}>
            <Timeline items={timelineItems} />
          </Card>
        </div>

        {/* Sidebar */}
        <Card style={{ position: 'sticky', top: '80px' }}>
          <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Contact Details
          </div>
          <Descriptions column={1} size="small" colon={false} styles={{ label: { color: 'var(--text-muted)', fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', width: '100px' } }}>
            <Descriptions.Item label="Email">
              <a href={`mailto:${person.email}`} style={{ textDecoration: 'none', wordBreak: 'break-all' }}>
              <MonoValue size="11.5px" color="var(--brand)">
                {person.email}
              </MonoValue></a>
            </Descriptions.Item>
            <Descriptions.Item label="Company">
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{person.company}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{person.role}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Last Activity">
              <MonoValue size="11.5px" color="var(--text-muted)">{person.lastActivity}</MonoValue>
            </Descriptions.Item>
            <Descriptions.Item label="Deal Value">
              <MonoValue size="12.5px" weight="500" color="var(--brand)">{formatCurrency(person.dealValue)}</MonoValue>
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: '16px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button type="primary" icon={<MailOutlined />} block>Send email</Button>
            <Button icon={<PhoneOutlined />} block>Log call</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
