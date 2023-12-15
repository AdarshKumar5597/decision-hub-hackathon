import React, { useEffect, useState } from 'react';
import { getAllRules } from '../services/operations/getAllRulesAPI';
import { matchPath, useLocation } from 'react-router-dom';
import { modifyRule } from '../services/operations/modifyRuleAPI';
import { useForm } from 'react-hook-form';

const RulesList = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const [rules, setAllRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onClicked, setOnClicked] = useState(false);
  const [oldRule, setOldRule] = useState(null);

  const matchRoute = (route) => {
    return matchPath(location.pathname, { path: route });
  };

  const operate = async (oldRuleDesc, newRuleDesc) => {
    if (onClicked || matchRoute("/modify")) {
      let oldRuleDescription = oldRuleDesc;
      let newRuleDescription = newRuleDesc;
      let result = await modifyRule(oldRuleDescription, newRuleDescription);
      return result;
    }
  };

  function changeOldRuleOnClick(rule) {
    setOnClicked(!onClicked);
    setOldRule(rule);
  }




  const onSubmit = async (data) => {
    setLoading(true);
    let result = await operate(data.oldruleDesc, data.newruleDesc);
    if (result) {
      changeOldRuleOnClick(result);
      getAllRulesFunc();
    }
    setLoading(false);
  };





  const getAllRulesFunc = async () => {
    setLoading(true);
    let rulesData = await getAllRules();
    if (rulesData) {
      setAllRules(rulesData);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllRulesFunc();
  }, []);

  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10 gap-y-4 flex flex-col items-center justify-center overflow-y-scroll max-h-[80vh] mt-10 rounded-md'>
      {onClicked ? (
        <div>
          <form
            className="flex flex-col gap-y-4 absolute left-[50%] translate-x-[-50%] items-center justify-center py-10 bg-white rounded-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-x-4 w-full gap-y-4 p-6">
              <label className='flex flex-col ' htmlFor='oldruleDesc'>
                <p className="mb-1 text-[2rem] font-bold leading-[1.375rem] text-green-950">
                  Old Rule Description <sup className="text-green-950">*</sup>
                </p>
              </label>
              <input
                required
                type="text"
                id="oldruleDesc"
                value={oldRule.name}
                placeholder="Enter Old Rule Description"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                {...register("oldruleDesc", { required: true })}
              />

              {errors.oldruleDesc && (
                <span className="ml-2 text-xs tracking-wide text-red-600">
                  Old Rule Description is required
                </span>
              )}

              <label className='flex flex-col ' htmlFor='newruleDesc'>
                <p className="mb-1 text-[2rem] font-bold leading-[1.375rem] text-green-950">
                  New Rule Description <sup className="text-white">*</sup>
                </p>
              </label>
              <input
                required
                type="text"
                id="newruleDesc"
                placeholder="Enter New Rule Description"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[calc(0.9*1000px)] h-[calc(0.15*600px)] rounded-[0.5rem] bg-gradient-to-r from-emerald-500 to-emerald-900 p-[12px] text-white font-bold"
                {...register("newruleDesc", { required: true })}
              />

              {errors.newruleDesc && (
                <span className="ml-2 text-xs tracking-wide text-red-600">
                  New Rule Description is required
                </span>
              )}

              <button type='submit' className=' bg-green-900 text-white font-bold p-5 rounded-md w-[calc(0.2*1000px)] mx-auto'>
                submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className='flex flex-col gap-y-5'>
          {rules.length > 0 ? (
            rules.map((rule, key) => (
              <div
                key={key}
                className='flex flex-col items-start px-5 justify-center rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 w-full shadow-md shadow-green-900 hover:cursor-pointer'
                onClick={() => changeOldRuleOnClick(rule)}
              >
                <p className='flex gap-x-2 items-center font-semibold text-green-950 py-3'>
                  <span className='flex items-center justify-start rounded-md bg-green-500 text-white p-1 pl-3 w-40'>Rule :</span> {rule.name}
                </p>
                <p className='flex gap-x-2 items-center font-semibold text-green-950 pb-3'>
                  <span className='flex items-center justify-start rounded-md bg-green-500 text-white p-1 pl-3 w-40'>SQL Query : </span> {rule.correspondingRule}
                </p>
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-12'>
              <p className='font-bold text-green-950'>No Rules</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RulesList;
