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
