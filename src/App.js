import './App.css';
import React, { useState, useEffect } from 'react';
import Button from './components/Button';
import Building from './components/Building';
import Upgrade from './components/Upgrade';
import Statistics from './components/Statistics';
import { useSpring, animated } from 'react-spring';



const App = () => {
  const [currency, setCurrency] = useState(0);
  const [perSecond, setPerSecond] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [buildings ] = useState([
    { id: 1, cost: 10, perClick: 1 },
  ]);

  const [upgrades, setUpgrades] = useState([
    { id: 1, cost: 50, multiplier: 2, unlocked: false },

  ]);

  const [achievements, setAchievements] = useState(0);

  const currencySpring = useSpring({ number: currency, from: { number: 0 } });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrency((prevCurrency) => prevCurrency + perSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [perSecond]);

  const handleClick = () => {
    setCurrency((prevCurrency) => prevCurrency + clickMultiplier);
  };

  const purchaseBuilding = (building) => {
    if (currency >= building.cost) {
      setCurrency((prevCurrency) => prevCurrency - building.cost);
      setPerSecond((prevPerSecond) => prevPerSecond + building.perClick);
      building.cost *= 1.2;
    }
  };

      const purchaseUpgrade = (upgrade) => {
        if (currency >= upgrade.cost && !upgrade.unlocked) {
          setUpgrades((prevUpgrades) =>
            prevUpgrades.map((u) => (u.id === upgrade.id ? { ...u, unlocked: true } : u))
            );
            setClickMultiplier((prevMultiplier) => prevMultiplier * upgrade.multiplier);
          }
        };

        useEffect(() => {
          if (currency >= 1000 && achievements === 0) {
            setAchievements(1);

          }
        }, [currency, achievements]);
      
        return (

          <div className="App">
      <Button onClick={handleClick} />
      <animated.div>{currencySpring.number.to((val) => Math.floor(val))}</animated.div>
      <Statistics currency={currency} perSecond={perSecond} achievements={achievements} />

      <div className="buildings">
        {buildings.map((building) => (
          <Building
          key={building.id}
          cost={building.cost}
          perClick={building.perClick}
          onClick={() => purchaseBuilding(building)}
        />
      ))}
    </div>
    <div className="upgrades">
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            cost={upgrade.cost}
            multiplier={upgrade.multiplier}
            unlocked={upgrade.unlocked}
            onClick={() => purchaseUpgrade(upgrade)}
          />
        ))}
      </div>
    </div>
  );
};


export default App;
