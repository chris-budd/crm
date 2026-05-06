export function formatCurrency(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'K'
  return '$' + n.toLocaleString()
}

export function formatARR(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M ARR'
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'K ARR'
  return '$' + n
}

export function stageMeta(stage) {
  const map = {
    prospect:    { label: 'Prospect',    color: '#516F90', bg: 'rgba(81,111,144,0.08)',    border: 'rgba(81,111,144,0.2)' },
    qualified:   { label: 'Qualified',   color: '#0091AE', bg: 'rgba(0,145,174,0.08)',     border: 'rgba(0,145,174,0.2)' },
    proposal:    { label: 'Proposal',    color: '#FF7A59', bg: 'rgba(255,122,89,0.08)',    border: 'rgba(255,122,89,0.2)' },
    negotiation: { label: 'Negotiation', color: '#7A5AF8', bg: 'rgba(122,90,248,0.08)',    border: 'rgba(122,90,248,0.2)' },
    closed_won:  { label: 'Closed Won',  color: '#00BDA5', bg: 'rgba(0,189,165,0.08)',     border: 'rgba(0,189,165,0.2)' },
    closed_lost: { label: 'Closed Lost', color: '#F2545B', bg: 'rgba(242,84,91,0.08)',     border: 'rgba(242,84,91,0.2)' },
  }
  return map[stage] || map.prospect
}
