import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { getAllStrategy } from '../services/operations/getAllRulesAPI';

const Strategies = () => {
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllStrategy();
      setStrategies(data);
      console.log(data)
    };

    fetchData();
  }, []);

  // Animation spring
  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
  });

  return (
    <div className="flex flex-wrap justify-center">
      {strategies.map((strategy, index) => (
        <animated.div key={index} style={cardSpring}>
          <div className="w-64 h-40 mx-4 my-4 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="p-4 text-white">
              <h6 className="text-xl font-bold">{strategy.name}</h6>
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
};

export default Strategies;
