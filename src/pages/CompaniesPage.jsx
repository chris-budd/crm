import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPANIES } from '../data/crm'
import { formatARR } from '../utils/crm'
import { Button, Input, Table, Avatar } from 'antd'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { OwnerAvatar } from '../components/OwnerAvatar/OwnerAvatar'
import { MonoValue } from '../components/MonoValue/MonoValue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

function companyColor(name) {
  const colors = ['#7A5AF8', '#0091AE', '#F5C26B', '#00BDA5', '#F2545B', '#7A5AF8', '#00BDA5', '#FF7A59']
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % colors.length
  return colors[h]
}

export default function CompaniesPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const filtered = COMPANIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.domain.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    {
      title: 'Company',
      key: 'company',
      width: 200,
      render: (_, co) => {
        const color = companyColor(co.name)
        const initials = co.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar
              size={28}
              shape="square"
              style={{
                background: color + '22',
                border: `1.5px solid ${color}44`,
                color: color,
                fontSize: '10px',
                fontWeight: '700',
                borderRadius: '6px',
                flexShrink: 0,
              }}
            >
              {initials}
            </Avatar>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{co.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{co.domain}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      width: 140,
      render: v => <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{v}</span>,
    },
    {
      title: 'Employees',
      dataIndex: 'employees',
      key: 'employees',
      width: 100,
      render: v => (
        <MonoValue color="var(--text-secondary)">{v.toLocaleString()}</MonoValue>
      ),
    },
    {
      title: 'ARR',
      dataIndex: 'arr',
      key: 'arr',
      width: 120,
      render: (v) => (
        <MonoValue weight="500" color={v >= 5000000 ? 'var(--success)' : 'var(--text-secondary)'}>{formatARR(v)}</MonoValue>
      ),
    },
    {
      title: 'Active Deals',
      dataIndex: 'activeDeals',
      key: 'activeDeals',
      width: 110,
      render: v => (
        <MonoValue size="13px" weight="600" color={v > 0 ? 'var(--brand)' : 'var(--text-muted)'}>{v}</MonoValue>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 140,
      render: (owner) => {
        const ownerInitials = owner.split(' ').map(w => w[0]).join('')
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <OwnerAvatar name={owner} size={22} />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{owner}</span>
          </div>
        )
      },
    },
    {
      title: '',
      key: 'actions',
      width: 80,
      render: (_, co) => (
        <div onClick={e => e.stopPropagation()}>
          <Button size="small" onClick={() => navigate(`/companies/${co.id}`)}>View</Button>
        </div>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: '100%' }}>
      {/* Header */}
      <PageHeader
        title="Companies"
        subtitle={`${COMPANIES.length} companies`}
        action={<Button type="primary" icon={<PlusOutlined />}>Add company</Button>}
      />

      {/* Search */}
      <Input
        prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />}
        placeholder="Search companies..."
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
        onRow={record => ({ onClick: () => navigate(`/companies/${record.id}`) })}
        locale={{ emptyText: 'No companies found' }}
      />
    </div>
  )
}
