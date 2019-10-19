import React from "react"
import "./ErrorCard.css"

export default function ErrorCard({ text }) {
  return (
    <div className="error-text">{text}</div>
  )
}