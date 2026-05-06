import { useParams, useNavigate } from 'react-router-dom'
import { COMPANIES, PEOPLE, DEALS } from '../data/crm'
import { formatCurrency, formatARR, stageMeta } from '../utils/crm'
import { Card, Tag, Avatar, Button, Table, Tabs, Breadcrumb, Descriptions, Statistic, Divider } from 'antd'
import { MailOutlined, PlusOutlined } from '@ant-design/icons'

function companyColor(name) {
  const colors = ['#7A5AF8', '#0091AE', '#F5C26B', '#00BDA5', '#F2545B', '#7A5AF8', '#00BDA5', '#FF7A59']
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % colors.length
  return colors[h]
}

const TAG_COLORS = {
  champion: { color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)', border: 'rgba(122,90,248,0.2)' },
  technical: { color: '#0091AE', bg: 'rgba(0,145,174,0.08)', border: 'rgba(0,145,174,0.2)' },
  'decision-maker': { color: '#FF7A59', bg: 'rgba(255,122,89,0.08)', border: 'rgba(255,122,89,0.2)' },
  executive: { color: '#00BDA5', bg: 'rgba(0,189,165,0.08)', border: 'rgba(0,189,165,0.2)' },
}

const COMPANY_ACTIVITIES = [
  { id: 1, type: 'deal', title: 'New deal created', desc: 'Enterprise proposal sent for review to procurement team.', time: '2 days ago', color: '#FF7A59' },
  { id: 2, type: 'email', title: 'Email sent', desc: 'Followed up on technical evaluation results and shared case studies.', time: '1 week ago', color: '#0091AE' },
  { id: 3, type: 'call', title: 'Discovery call', desc: '60-min call with engineering and finance leads. Budget confirmed for Q2.', time: '2 weeks ago', color: '#00BDA5' },
  { id: 4, type: 'note', title: 'Note added', desc: 'Company expanding headcount 40% YoY — strong expansion revenue potential.', time: '3 weeks ago', color: '#F5C26B' },
]

function typeIcon(type) {
  if (type === 'deal') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
    </svg>
  )
  if (type === 'email') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
  if (type === 'call') return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )
}

export default function CompanyPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const company = COMPANIES.find(c => c.id === id)
  if (!company) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
        Company not found.{' '}
        <Button type="link" onClick={() => navigate('/companies')}>Back to Companies</Button>
      </div>
    )
  }

  const color = companyColor(company.name)
  const initials = company.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const ownerInitials = company.owner.split(' ').map(w => w[0]).join('')
  const companyDeals = DEALS.filter(d => d.companyId === id)
  const companyPeople = PEOPLE.filter(p => p.companyId === id)
  const pipelineValue = companyDeals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost').reduce((s, d) => s + d.value, 0)
  const wonDeals = companyDeals.filter(d => d.stage === 'closed_won')

  const dealColumns = [
    {
      title: 'Deal',
      key: 'deal',
      render: (_, deal) => (
        <div>
          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '1px' }}>{deal.name}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{deal.contact}</div>
        </div>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: 110,
      render: v => (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: '500', color: '#FF7A59' }}>
          {formatCurrency(v)}
        </span>
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      width: 140,
      render: stage => {
        const meta = stageMeta(stage)
        return <Tag style={{ color: meta.color, background: meta.bg, borderColor: meta.border, fontWeight: 500 }}>{meta.label}</Tag>
      },
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      width: 110,
      render: (v, deal) => {
        const meta = stageMeta(deal.stage)
        return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: meta.color }}>{v}%</span>
      },
    },
    {
      title: 'Close Date',
      dataIndex: 'closeDate',
      key: 'closeDate',
      width: 110,
      render: v => (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'var(--text-muted)' }}>{v}</span>
      ),
    },
  ]

  const overviewContent = (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '16px', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <Card styles={{ body: { padding: '14px 16px' } }}>
            <Statistic
              title={<span style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>ARR</span>}
              value={formatARR(company.arr)}
              valueStyle={{ color: '#00BDA5', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}
              formatter={v => v}
            />
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>annual recurring revenue</div>
          </Card>
          <Card styles={{ body: { padding: '14px 16px' } }}>
            <Statistic
              title={<span style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Pipeline</span>}
              value={formatCurrency(pipelineValue)}
              valueStyle={{ color: '#FF7A59', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}
              formatter={v => v}
            />
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>active deals</div>
          </Card>
          <Card styles={{ body: { padding: '14px 16px' } }}>
            <Statistic
              title={<span style={{ fontSize: '10px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Deals Won</span>}
              value={wonDeals.length}
              valueStyle={{ color: '#0091AE', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}
            />
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{formatCurrency(wonDeals.reduce((s, d) => s + d.value, 0))} total</div>
          </Card>
        </div>

        {/* Activity */}
        <Card styles={{ body: { padding: 0 } }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>Recent Activity</span>
          </div>
          <div style={{ padding: '4px 0' }}>
            {COMPANY_ACTIVITIES.map((act, i) => (
              <div key={act.id} style={{
                display: 'flex', gap: '12px', padding: '14px 20px',
                borderBottom: i < COMPANY_ACTIVITIES.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                <Avatar
                  size={28}
                  style={{ background: act.color + '1A', border: `1px solid ${act.color}33`, color: act.color, flexShrink: 0, marginTop: '2px' }}
                >
                  {typeIcon(act.type)}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '12.5px', fontWeight: '600', color: 'var(--text-primary)' }}>{act.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <Card style={{ position: 'sticky', top: '80px' }}>
        <div style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Company Details
        </div>
        <Descriptions column={1} size="small" colon={false} styles={{ label: { color: 'var(--text-muted)', fontSize: '10.5px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.07em', width: '100px' } }}>
          <Descriptions.Item label="Industry">
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{company.industry}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Employees">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: 'var(--text-secondary)' }}>{company.employees.toLocaleString()}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Website">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#FF7A59' }}>{company.domain}</span>
          </Descriptions.Item>
          <Descriptions.Item label="ARR">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: '#00BDA5' }}>{formatARR(company.arr)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Contacts">
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{companyPeople.length} person{companyPeople.length !== 1 ? 's' : ''}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Active Deals">
            <span style={{ fontSize: '12.5px', color: '#FF7A59' }}>{company.activeDeals}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Owner">
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{company.owner}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )

  const dealsContent = (
    <Table
      dataSource={companyDeals}
      columns={dealColumns}
      rowKey="id"
      size="middle"
      pagination={false}
      onRow={record => ({ onClick: () => navigate(`/deals/${record.id}`) })}
      locale={{ emptyText: 'No deals yet' }}
    />
  )

  const contactsContent = (
    <Card styles={{ body: { padding: 0 } }}>
      {companyPeople.length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>No contacts yet</div>
      )}
      {companyPeople.map((person, i) => {
        const meta = stageMeta(person.stage)
        return (
          <div
            key={person.id}
            onClick={() => navigate(`/people/${person.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px',
              borderBottom: i < companyPeople.length - 1 ? '1px solid var(--border)' : 'none',
              cursor: 'pointer', transition: 'background 0.12s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Avatar
              size={36}
              style={{
                background: person.color + '22', border: `1.5px solid ${person.color}44`,
                color: person.color, fontSize: '12px', fontWeight: '600', flexShrink: 0,
              }}
            >
              {person.avatar}
            </Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px' }}>{person.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{person.role}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {person.tags.map(tag => {
                const tc = TAG_COLORS[tag] || { color: 'var(--text-secondary)', bg: 'var(--bg-elevated)', border: 'var(--border)' }
                return (
                  <Tag key={tag} style={{ color: tc.color, background: tc.bg, borderColor: tc.border, fontWeight: '500', fontSize: '10.5px' }}>
                    {tag}
                  </Tag>
                )
              })}
            </div>
            <Tag style={{ color: meta.color, background: meta.bg, borderColor: meta.border, fontWeight: 500, flexShrink: 0 }}>
              {meta.label}
            </Tag>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: '500', color: '#FF7A59', flexShrink: 0 }}>
              {formatCurrency(person.dealValue)}
            </div>
          </div>
        )
      })}
    </Card>
  )

  const tabItems = [
    { key: 'Overview', label: 'Overview', children: overviewContent },
    { key: 'Deals', label: 'Deals', children: dealsContent },
    { key: 'Contacts', label: 'Contacts', children: contactsContent },
  ]

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Breadcrumb */}
      <Breadcrumb
        style={{ marginBottom: '20px' }}
        items={[
          { title: <span style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => navigate('/companies')}>Companies</span> },
          { title: company.name },
        ]}
      />

      {/* Header card */}
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Avatar
              size={56}
              shape="square"
              style={{
                background: color + '18', border: `2px solid ${color}44`,
                color: color, fontSize: '18px', fontWeight: '700', flexShrink: 0, borderRadius: '12px',
              }}
            >
              {initials}
            </Avatar>
            <div>
              <h1 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '4px' }}>
                {company.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{company.industry}</span>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <a href={`https://${company.domain}`} style={{ fontSize: '13px', color: '#FF7A59', fontFamily: "'JetBrains Mono', monospace" }}>
                  {company.domain}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Tag style={{ borderRadius: '99px' }}>{company.employees.toLocaleString()} employees</Tag>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Avatar
                    size={20}
                    style={{ background: 'rgba(255,122,89,0.1)', border: '1px solid rgba(255,122,89,0.25)', color: '#FF7A59', fontSize: '8px', fontWeight: '700' }}
                  >
                    {ownerInitials}
                  </Avatar>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{company.owner}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <Button icon={<MailOutlined />}>Send email</Button>
            <Button type="primary" icon={<PlusOutlined />}>New Deal</Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs items={tabItems} defaultActiveKey="Overview" />
    </div>
  )
}
