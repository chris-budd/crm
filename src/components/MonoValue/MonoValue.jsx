import './MonoValue.scss'

export function MonoValue({ children, color = 'var(--text-secondary)', size = '12px', weight = '500', style: extraStyle }) {
  return (
    <span className="mono-value" style={{ fontSize: size, fontWeight: weight, color, ...extraStyle }}>
      {children}
    </span>
  )
}
