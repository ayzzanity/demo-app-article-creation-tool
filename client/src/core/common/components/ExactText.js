import React from "react"

import { Typography } from "antd"

const { Text } = Typography

function ExactText({ text, ...rest }) {
  return (
    <div className="exact-text">
      <Text {...rest}>{text}</Text>
    </div>
  )
}

export default ExactText
