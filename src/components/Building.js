import React from "react";

const Building = ({ cost, perClick, onClick }) => (
    <div className="building" onClick={onClick}>
        <p>Cost: {cost} </p>
        <p>Per Click:{ perClick}</p>
    </div>
);
export default Building;