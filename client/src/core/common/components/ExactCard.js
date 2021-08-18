import React from "react"

import { Card } from "antd"

function ExactCard({ children, ...res }) {
  return (
    <Card {...res} className="exact-card shadow-sm">
      {children}
    </Card>
  )
}

export default ExactCard
