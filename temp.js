const strategy1 = {
  id: 1,
  array: [
    [
      {
        id: 1,
        criteria: "all",
      },
      {
        id: 2634646264,
        field: "Rule2",
        operator: "<",
        value: "100",
        parentId: 1,
      },
      {
        id: 36236262462,
        field: "Rule3",
        operator: "<",
        value: "100",
        parentId: 1,
      },
      {
        id: 2,
        criteria: "any",
        parentId: 1,
      },
      {
        id: 45355325326,
        field: "Rule4",
        operator: "<",
        value: "100",
        parentId: 2,
      },
    ],
    [
      {
        id: 1,
        criteria: "all",
      },
      {
        id: 2634646265,
        field: "Rule2",
        operator: "<",
        value: "100",
        parentId: 1,
      },
      {
        id: 36236262461,
        field: "Rule3",
        operator: "<",
        value: "100",
        parentId: 1,
      },
      {
        id: 2,
        criteria: "any",
        parentId: 1,
      },
      {
        id: 45355325324,
        field: "Rule4",
        operator: "<",
        value: "100",
        parentId: 2,
      },
    ],
  ],
}

let rule = []

function parser(strategy1) {
  let temp = strategy1.array
  let n = Object.keys(temp).length
  for (let i = 0; i < n; i++) {
    let len = Object.keys(temp[i]).length
    let str
    let rule_temp = []

    for (let j = 0; j < len; j++) {
      if ("field" in temp[i][j]) {
        rule_temp.push({
          array_num: i + 1,
          id: temp[i][j].id,
          field: temp[i][j].field,
          operator: temp[i][j].operator,
          value: temp[i][j].value,
          parentId: temp[i][j].parentId,
          criteria: str,
        })
      } else str = temp[i][j].criteria
    }
    rule.push(rule_temp)
    rule_temp = []
  }
}

parser(strategy1)
console.log(rule)

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
