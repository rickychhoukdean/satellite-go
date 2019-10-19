import React from "react"
import "./FindCard.css"

export default function FindCard({ getLocation }) {
  return (
    <button className="find-button" onClick={getLocation}>
      Find Satellites
    </button>
  )
}