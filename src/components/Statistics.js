import React from "react";


const Statistics = ({ currency, perSecond, achievements }) => (
    <div className="statistics">
      <p>Currency: {currency}</p>
      <p>Per Second: {perSecond}</p>
      <p>Achievements: {achievements}</p>
    </div>
  );
  
  export default Statistics;