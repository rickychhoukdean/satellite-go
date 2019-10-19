import React from "react"
import "./FindCard.css"

export default function FindCard({ getLocation, text }) {
  return (
    <button className="find-button" onClick={getLocation}>
      Find Satellites
    </button>
  )
}