export const CONDITIONS_CONTENT = {
  meta: {
    title: 'Conditions',
    category: 'Fundamentals',
    subtitle: 'Control execution flow with decision trees, truthy/falsy evaluation, and switch statements.',
    readTime: '4 min read',
    prerequisites: ['Variables', 'Operators'],
  },

  idea: {
    heading: 'The Decision Tree of Code',
    summary: 'Conditions allow programs to make choices. JavaScript evaluates an expression into a boolean context, then branches down the corresponding execution path while skipping others.',
    bulletPoints: [
      'if, else if, else create sequential conditional branches.',
      'JavaScript coerces non-boolean values to truthy or falsy in conditions.',
      'switch statements provide clean matching for discrete, known states.',
    ],
  },

  falsyValues: [
    { value: 'false', desc: 'Boolean false literal' },
    { value: '0', desc: 'Number zero (+0 and -0)' },
    { value: '0n', desc: 'BigInt zero' },
    { value: '""', desc: 'Empty string (single, double, or template)' },
    { value: 'null', desc: 'Explicit empty value' },
    { value: 'undefined', desc: 'Unassigned value' },
    { value: 'NaN', desc: 'Not-a-Number arithmetic result' },
  ],

  truthySurprises: [
    { value: '[]', desc: 'Empty arrays are truthy objects!' },
    { value: '{}', desc: 'Empty plain objects are truthy!' },
    { value: '"0" or "false"', desc: 'Non-empty strings are always truthy' },
    { value: 'function() {}', desc: 'Functions are truthy reference objects' },
  ],

  decisionFlows: [
    {
      title: 'Standard if / else if / else',
      code: `if (score >= 90) {\n  grade = "A";\n} else if (score >= 80) {\n  grade = "B";\n} else {\n  grade = "C";\n}`,
      note: 'Evaluates top-to-bottom and stops at the very first true branch.',
    },
    {
      title: 'Ternary Operator (Inline Expression)',
      code: `const access = role === "admin" ? "full" : "restricted";`,
      note: 'Best for simple binary assignments. Avoid deeply nesting ternaries.',
    },
    {
      title: 'Switch Statement (Exact Value Matching)',
      code: `switch (status) {\n  case "pending":\n    showSpinner();\n    break;\n  case "success":\n    showSuccess();\n    break;\n  default:\n    showError();\n}`,
      note: 'Always include `break;` to prevent fallthrough bugs into the next case.',
    },
  ],

  importantRules: [
    {
      title: 'Only 7 Values are Falsy in JS',
      desc: 'Everything else in JavaScript is Truthy. Empty arrays `[]` and empty objects `{}` are truthy.',
      code: 'if ([]) { /* This ALWAYS executes! */ }',
    },
    {
      title: 'Switch Uses Strict Equality (===)',
      desc: '`switch` compares case values using strict equality. A case of `case 5:` will not match the string `"5"`.',
      code: 'switch("5") { case 5: /* never runs */ }',
    },
    {
      title: 'Guard Clauses / Early Return',
      desc: 'Instead of deeply nesting `if` statements, return early on invalid conditions to keep code readable.',
      code: 'if (!user) return;\n// proceed with happy path',
    },
  ],

  mistakes: [
    {
      id: 'empty-array-check',
      title: '1. Checking an array with if (arr)',
      badge: 'Truthy Trap',
      badCode: `const items = [];\nif (items) {\n  console.log("Found items!"); // ❌ Runs even when array is empty!\n}`,
      fixCode: `const items = [];\nif (items.length > 0) {\n  console.log("Found items!"); // ✅ Check length\n}`,
      explanation: 'Empty arrays and objects are truthy reference objects in JavaScript. Always check `.length > 0` for arrays and `Object.keys(obj).length > 0` for objects.',
    },
    {
      id: 'switch-fallthrough',
      title: '2. Missing break in switch statements',
      badge: 'Fallthrough Bug',
      badCode: `switch (level) {\n  case 1: startLevel1(); // ⚠️ Missing break! Falls into case 2\n  case 2: startLevel2();\n}`,
      fixCode: `switch (level) {\n  case 1: startLevel1(); break; // ✅ Stops execution\n  case 2: startLevel2(); break;\n}`,
      explanation: 'Without a break statement, execution will continue unconditionally into the next case block regardless of whether the condition matches.',
    },
    {
      id: 'assignment-in-if',
      title: '3. Accidental single = assignment inside if',
      badge: 'Syntax Confusion',
      badCode: `if (status = "active") { /* ⚠️ Overwrites status and always evaluates to truthy! */ }`,
      fixCode: `if (status === "active") { /* ✅ Strictly compares status */ }`,
      explanation: 'Using a single `=` inside a condition assigns the value rather than comparing it, usually causing the condition to always evaluate to truthy.',
    },
  ],

  takeaways: [
    'Memorize the 7 falsy values: false, 0, -0, 0n, "", null, undefined, NaN.',
    'Empty collections ([] and {}) are truthy in JavaScript.',
    'Use if/else for range and boolean conditions; use switch for discrete values.',
    'Always add break; to switch cases unless intentional fallthrough is documented.',
    'Use early returns (guard clauses) to avoid deeply nested conditional pyramids.',
  ],
};
