import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { getAllStrategy } from '../services/operations/getAllRulesAPI';
import TestForm from '../components/TestRule';

const Strategies = () => {
  const [strategies, setStrategies] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [rules, setRules] = useState([]);
  const [str, setStr] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStrategy();
      setStrategies(data);
      console.log('Strategy:', data);
    };
    fetchData();
  }, []);

  // Animation spring
  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
  });

  useEffect(() => {
    // This useEffect runs whenever rules state changes
    let json = JSON.stringify(rules);
    setStr(json);
    console.log('Rules in JSON:', str);
  }, [rules, str]);

  const handleToggle = (strategy) => {
    setRules(strategy.rules);
    setToggle(!toggle);
  };

  return (
    <div className="flex flex-wrap justify-start p-5 gap-5">
      {strategies.map((strategy, index) => (
        <div key={index}>
          <animated.div style={cardSpring}>
            <div
              className="w-full h-40 mx-4 my-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onClick={() => handleToggle(strategy)}
            >
              <div className="p-4 text-white">
                <h6 className="text-xl font-bold">{strategy.name}</h6>
              </div>
            </div>
          </animated.div>
          {toggle && (
            <div className="z-50 absolute w-screen h-full top-0 left-0">
              <TestForm handleToggle={handleToggle} id={strategy._id} rules={str} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Strategies;
