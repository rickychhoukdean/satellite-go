import React from "react"
import "./MessageCard.css"

export default function MessageCard({ text, loading }) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    )
  }
  return (
    <div className="message-text">{text}</div>
  )
}