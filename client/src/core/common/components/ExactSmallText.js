import React from "react"

function ExactSmallText({ text, ...res }) {
  return <small className={`exact-small-text ${res.className}`}>{text}</small>
}

export default ExactSmallText
