import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function getPageTitle(pathname) {
  const map = { '/': 'Dashboard', '/people': 'People', '/companies': 'Companies', '/pipeline': 'Pipeline', '/reports': 'Reports', '/settings': 'Settings' }
  if (map[pathname]) return map[pathname]
  if (pathname.startsWith('/people/')) return 'Contact'
  if (pathname.startsWith('/companies/')) return 'Company'
  if (pathname.startsWith('/deals/')) return 'Deal'
  return 'CRM'
}

const Icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  people: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  companies: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
      <path d="M9 9v.01M9 12v.01M9 15v.01M13 15v.01" />
    </svg>
  ),
  pipeline: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="18" rx="1" /><rect x="10" y="6" width="5" height="15" rx="1" />
      <rect x="17" y="9" width="5" height="12" rx="1" />
    </svg>
  ),
  reports: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" />
    </svg>
  ),
  settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  bell: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  help: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  grid: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  sparkle: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  ),
}

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/', icon: Icons.dashboard, exact: true },
  { label: 'People',    to: '/people',    icon: Icons.people },
  { label: 'Companies', to: '/companies', icon: Icons.companies },
  { label: 'Pipeline',  to: '/pipeline',  icon: Icons.pipeline },
  { label: 'Reports',   to: '/reports',   icon: Icons.reports },
]

function NavItem({ item }) {
  const location = useLocation()
  const isActive = item.exact
    ? location.pathname === item.to
    : location.pathname === item.to || location.pathname.startsWith(item.to + '/')
  const [hovered, setHovered] = useState(false)

  return (
    <NavLink
      to={item.to}
      title={item.label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        margin: '2px auto',
        borderRadius: 'var(--radius-sm)',
        color: isActive ? 'var(--brand)' : hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
        background: isActive ? 'rgba(255,122,89,0.15)' : hovered ? 'rgba(255,255,255,0.07)' : 'transparent',
        transition: 'background 0.12s ease, color 0.12s ease',
        textDecoration: 'none',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.icon}
    </NavLink>
  )
}

export default function Layout({ children }) {
  const location = useLocation()
  const title = getPageTitle(location.pathname)
  const isPipeline = location.pathname === '/pipeline'

  const [searchFocused, setSearchFocused] = useState(false)
  const [assistantHov, setAssistantHov] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Narrow icon-only sidebar */}
      <aside style={{
        width: '56px',
        minWidth: '56px',
        background: '#2e3e50',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{
          height: '56px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M20 7 A9 9 0 1 0 20 19" stroke="#FF7A59" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
          </svg>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, width: '100%', padding: '10px 0', display: 'flex', flexDirection: 'column' }}>
          {NAV_ITEMS.map(item => <NavItem key={item.to} item={item} />)}
        </nav>

        {/* Bottom: settings + avatar */}
        <div style={{ width: '100%', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <NavLink
            to="/settings"
            title="Settings"
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '40px', height: '40px', margin: '0 auto',
              borderRadius: 'var(--radius-sm)',
              color: isActive ? 'var(--brand)' : 'rgba(255,255,255,0.45)',
              background: isActive ? 'rgba(255,122,89,0.15)' : 'transparent',
              textDecoration: 'none',
              transition: 'background 0.12s, color 0.12s',
            })}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
          >
            {Icons.settings}
          </NavLink>

          <div title="Alex Johnson" style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', marginBottom: '4px',
          }}>
            <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>AJ</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ marginLeft: '56px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Topbar */}
        <header style={{
          height: '56px',
          background: '#2e3e50',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0 20px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}>
          {/* Search — prominent, left-aligned, HubSpot style */}
          <div style={{ position: 'relative', flex: '0 1 380px' }}>
            <span style={{
              position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.35)', display: 'flex', pointerEvents: 'none',
            }}>
              {Icons.search}
            </span>
            <input
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Find or Ask..."
              style={{
                width: '100%',
                height: '34px',
                paddingLeft: '32px',
                paddingRight: '52px',
                background: searchFocused ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
                border: `1px solid ${searchFocused ? 'rgba(255,122,89,0.5)' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                color: '#fff',
                outline: 'none',
                boxShadow: searchFocused ? '0 0 0 3px rgba(255,122,89,0.15)' : 'none',
                transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
              }}
            />
            {/* ⌘K badge */}
            <div style={{
              position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
              display: 'flex', alignItems: 'center', gap: '2px',
            }}>
              <kbd style={{
                fontSize: '10px', color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '3px', padding: '1px 4px', lineHeight: '14px',
                fontFamily: 'inherit',
              }}>⌘</kbd>
              <kbd style={{
                fontSize: '10px', color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '3px', padding: '1px 4px', lineHeight: '14px',
                fontFamily: 'inherit',
              }}>K</kbd>
            </div>
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Right-side utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[
              { icon: Icons.grid, label: 'Apps' },
              { icon: Icons.help, label: 'Help' },
              { icon: Icons.settings, label: 'Settings' },
            ].map(({ icon, label }) => (
              <button
                key={label}
                title={label}
                style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
                  border: 'none', background: 'transparent',
                  color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background 0.12s, color 0.12s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >
                {icon}
              </button>
            ))}

            {/* Bell with badge */}
            <button
              title="Notifications"
              style={{
                width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
                border: 'none', background: 'transparent',
                color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', position: 'relative', transition: 'background 0.12s, color 0.12s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
            >
              {Icons.bell}
              <span style={{
                position: 'absolute', top: '5px', right: '4px',
                minWidth: '14px', height: '14px', borderRadius: '7px',
                background: 'var(--danger)', border: '1.5px solid #2e3e50',
                fontSize: '8px', fontWeight: '700', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1, padding: '0 2px',
              }}>
                2
              </span>
            </button>

            <div style={{ width: '1px', height: '22px', background: 'rgba(255,255,255,0.12)', margin: '0 6px' }} />

            {/* ✦ Assistant button */}
            <button
              style={{
                height: '32px', padding: '0 12px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${assistantHov ? 'rgba(180,160,255,0.6)' : 'rgba(180,160,255,0.25)'}`,
                background: assistantHov ? 'rgba(180,160,255,0.12)' : 'rgba(180,160,255,0.07)',
                color: 'rgba(200,185,255,0.9)',
                fontSize: '12px', fontWeight: '600',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={() => setAssistantHov(true)}
              onMouseLeave={() => setAssistantHov(false)}
            >
              {Icons.sparkle}
              Assistant
            </button>

            {/* Avatar + name */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '3px 6px', borderRadius: 'var(--radius-sm)',
              transition: 'background 0.12s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand), var(--brand-hover))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ color: '#fff', fontSize: '10px', fontWeight: '700' }}>AJ</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(255,255,255,0.85)' }}>Builder</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{
          flex: 1,
          padding: isPipeline ? '20px 24px 0' : '28px 28px',
          overflowY: isPipeline ? 'hidden' : 'auto',
        }}>
          {children}
        </main>
      </div>
    </div>
  )
}
