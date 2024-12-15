import React, { useState } from "react";

const ToggleButton = ({onClick, props}) => {
  const [active, setActive] = useState("Today");

  const handleClick = (option) => {
    setActive(option);
    onClick(option);
  };

  return (
    <div className="toggle-button">
      <div className={`slider ${active === "Today" ? "left" : "right"}`}></div>
      <button
        className={`toggle-option ${active === "Today" ? "active" : ""}`}
        onClick={() => handleClick("Today")}
      >
        Today
      </button>
      <button
        className={`toggle-option ${active === "This Week" ? "active" : ""}`}
        onClick={() => handleClick("This Week")}
      >
        This Week
      </button>
    </div>
  );
};

export default ToggleButton;
