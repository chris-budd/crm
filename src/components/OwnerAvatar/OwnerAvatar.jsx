import { Avatar } from 'antd'
import './OwnerAvatar.scss'

export function OwnerAvatar({ name, size = 22 }) {
  const initials = name.split(' ').map(w => w[0]).join('')
  const fontSize = size <= 16 ? '7px' : size <= 20 ? '8px' : size <= 24 ? '9px' : '11px'
  return (
    <Avatar size={size} className="owner-avatar" style={{ fontSize }}>
      {initials}
    </Avatar>
  )
}
