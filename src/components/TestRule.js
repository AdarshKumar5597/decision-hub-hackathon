import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSpring, animated } from 'react-spring';
import { getAllParameters, getAllRules } from '../services/operations/getAllRulesAPI';
import { testRule } from '../services/operations/testRuleAPI';

const TestForm = (props) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [parameterList, setParameterList] = useState([])
  const { register, handleSubmit, setValue } = useForm();
  const [message, setMessage] = useState(null);

  const rules = props.rules ? props.rules : '';

  const handleToggle = props.handleToggle

  const fetchData = async () => {
    let result = await getAllParameters()
    if (result) {
      console.log(result)
      setParameterList(result)
      result.forEach((param) => setValue(param, ''));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  function evaluateRules(rules, formData) {
    const results = {};

    for (const rule of rules) {
      const ruleId = rule['id'];
      const conditions = rule['conditions'];

      let correct = true;
      let reason = null;

      for (const condition of conditions) {
        const field = condition['field'];
        const operator = condition['operator'];
        const value = condition['value'];

        if (!(field in formData)) {
          correct = false;
          reason = `Missing field: ${field}`;
          break;
        }

        const fieldValue = formData[field];

        if (operator === '==') {
          if (fieldValue != value) {
            correct = false;
            reason = `${field} should be equal to ${value}`;
            break;
          }
        } else if (operator === '>') {
          if (fieldValue <= value) {
            correct = false;
            reason = `${field} should be greater than ${value}`;
            break;
          }
        } else if (operator === '<') {
          if (fieldValue >= value) {
            correct = false;
            reason = `${field} should be less than ${value}`;
            break;
          }
        }
      }

      results[`Rule${ruleId}`] = correct ? true : `False: ${reason}`;
    }

    return results;
  }

  const propsAnimation = useSpring({
    opacity: showConfirmation ? 1 : 0,
    transform: showConfirmation ? 'translateY(0)' : 'translateY(20px)',
  });

  const onSubmit = async (data) => {
    console.log(data)
    data = JSON.stringify(data);
    console.log(data)
    let result = await testRule(data, rules);
    if (result) setMessage(result);
    // let res = evaluateRules(rules, data)
    // console.log(res)
    setShowConfirmation(result);
  };

  return (
    <div className="container mx-auto mt-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {parameterList.map((param, index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={param}
            >
              {param}
            </label>
            <input
              type="text"
              id={param}
              name={param}
              {...register(param)} // Use react-hook-form register function
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button onClick={handleToggle} className='bg-red-200 hover:bg-red-700 hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Close </button>
        </div>
      </form>

      {/* Confirmation message with animation */}
      {showConfirmation && (
        <animated.div
          style={propsAnimation}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4"
        >
          {message}
        </animated.div>
      )}
    </div>
  );
};

export default TestForm;
