import React from "react"
import "./FindCard.css"
import Title from "../Title/Title"

export default function FindCard({ getLocation, text, title }) {
  return (
    <>
    <Title title={title} />
    <button className="find-button" onClick={getLocation}>
      Find Satellites
    </button>
    </>
  )
}