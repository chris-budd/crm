import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PEOPLE } from '../data/crm'
import { formatCurrency, stageMeta } from '../utils/crm'
import { Button, Input, Table, Tag, Avatar } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { MonoValue } from '../components/MonoValue/MonoValue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

const TAG_COLORS = {
  champion: { color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)', border: 'rgba(122,90,248,0.2)' },
  technical: { color: '#0091AE', bg: 'rgba(0,145,174,0.08)', border: 'rgba(0,145,174,0.2)' },
  'decision-maker': { color: 'var(--brand)', bg: 'rgba(255,122,89,0.08)', border: 'rgba(255,122,89,0.2)' },
  executive: { color: 'var(--success)', bg: 'rgba(0,189,165,0.08)', border: 'rgba(0,189,165,0.2)' },
}

const COMPANY_DOMAINS = {
  'Axiom Labs': 'axiom.io', 'Stride Labs': 'stridelabs.com', 'Draftbit': 'draftbit.co',
  'Loop AI': 'loopai.com', 'Fable': 'fableapp.io', 'Planet HQ': 'planethq.com',
  'Routebase': 'routebase.io', 'Crest Data': 'crestdata.ai',
}

export default function PeoplePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = PEOPLE.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    {
      title: 'Name',
      key: 'name',
      width: 220,
      render: (_, person) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar
            size={28}
            style={{
              background: person.color + '22',
              border: `1.5px solid ${person.color}44`,
              color: person.color,
              fontSize: '10px',
              fontWeight: '600',
              flexShrink: 0,
            }}
          >
            {person.avatar}
          </Avatar>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{person.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{person.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Company',
      key: 'company',
      width: 160,
      render: (_, person) => (
        <div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-primary)' }}>{person.company}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{COMPANY_DOMAINS[person.company] || ''}</div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 140,
      render: v => <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{v}</span>,
    },
    {
      title: 'Stage',
      key: 'stage',
      width: 120,
      render: (_, person) => {
        const meta = stageMeta(person.stage)
        return (
          <Tag style={{ color: meta.color, background: meta.bg, borderColor: meta.border, fontWeight: 500 }}>
            {meta.label}
          </Tag>
        )
      },
    },
    {
      title: 'Deal Value',
      key: 'dealValue',
      width: 110,
      render: (_, person) => (
        <MonoValue color="var(--brand)">{formatCurrency(person.dealValue)}</MonoValue>
      ),
    },
    {
      title: 'Last Activity',
      key: 'lastActivity',
      width: 110,
      render: (_, person) => (
        <MonoValue size="11.5px" color="var(--text-muted)">{person.lastActivity}</MonoValue>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
      width: 160,
      render: (_, person) => (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {person.tags.slice(0, 2).map(tag => {
            const tc = TAG_COLORS[tag] || { color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.06)', border: 'var(--border)' }
            return (
              <Tag key={tag} style={{ color: tc.color, background: tc.bg, borderColor: tc.border, fontSize: '10px', fontWeight: '500' }}>
                {tag}
              </Tag>
            )
          })}
        </div>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 80,
      render: (_, person) => (
        <div onClick={e => e.stopPropagation()}>
          <Button size="small" onClick={() => navigate(`/people/${person.id}`)}>View</Button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Header */}
      <PageHeader
        title="People"
        subtitle={`${PEOPLE.length} contacts`}
        action={<Button type="primary" icon={<PlusOutlined />}>Add contact</Button>}
      />

      {/* Search */}
      <Input
        prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />}
        placeholder="Search contacts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '16px' }}
      />

      {/* Table */}
      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        size="middle"
        pagination={false}
        onRow={record => ({ onClick: () => navigate(`/people/${record.id}`) })}
        locale={{ emptyText: 'No contacts found' }}
      />
    </div>
  )
}
