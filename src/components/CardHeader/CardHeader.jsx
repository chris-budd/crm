import './CardHeader.scss'

export function CardHeader({ title, right }) {
  return (
    <div className="card-header">
      <span className="card-header__title">{title}</span>
      {right !== undefined && <div>{right}</div>}
    </div>
  )
}
