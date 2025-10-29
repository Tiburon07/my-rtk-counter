// src/components/ProfileHeader.tsx
import { memo } from 'react'

import { useAppSelector } from '../hook'
import { selectDisplayLabel } from '../features/profile/selector'

 
 
// React.memo + selector mirato = re-render solo quando serve
function ProfileHeaderBase() {
  const label = useAppSelector(selectDisplayLabel)
  return (
    <header style={headerStyle}>
      <h2 style={{ margin: 0 }}>{label}</h2>
    </header>
  )
}
 
const headerStyle: React.CSSProperties = {
  padding: 12,
  borderBottom: '1px solid #e5e7eb',
}
 
export default memo(ProfileHeaderBase)