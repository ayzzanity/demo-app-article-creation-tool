import React from "react"
import { Typography } from "antd"

const { Title } = Typography

function ExactTitle({ text, ...rest }) {
  return (
    <div className="exact-title">
      <Title {...rest}>{text}</Title>
    </div>
  )
}

export default ExactTitle
