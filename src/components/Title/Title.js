import React from "react";
import "./Title.css";
import logo from "../../satellite.png";

export default function Title({ title }) {
  return (
    <div className="title-container">
      <img className="logo-nav" src={logo} alt="Satellite logo" />
      <div className="title">{title}</div>
    </div>
  );
}
