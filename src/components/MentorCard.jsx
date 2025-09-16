
import React from "react";
import { MdGroups } from "react-icons/md";
import "../styles/MentorCard.css";

function MentorCard({ text }) {
  return (
    <button className="mentor-card">
      <span className="mentor-icon"><MdGroups /></span>
      <span>{text}</span>
    </button>
  );
}

export default MentorCard;
