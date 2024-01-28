import React from "react";

const Upgrade =({ cost, multiplier, unlocked, onClick }) => (
    <div className={`upgrade ${unlocked ? 'unlocked' : 'locked'}`} onClick={onClick}>
    <p>Cost: {cost}</p>
    <p>Multiplier: {multiplier}</p>
  </div>
);

export default Upgrade;