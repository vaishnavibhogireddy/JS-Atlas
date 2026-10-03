export const OPERATORS_CONTENT = {
  meta: {
    title: 'Operators',
    category: 'Fundamentals',
    subtitle: 'Compute values, evaluate expressions, and master strict equality in JavaScript.',
    readTime: '5 min read',
    prerequisites: ['Variables', 'Data Types'],
  },

  idea: {
    heading: 'The Expression Engine',
    summary: 'Operators take one or more operands (values or variables) and produce a new computed value. Mastering equality, logical short-circuiting, and modern safe navigation (optional chaining, nullish coalescing) prevents the most common bugs in web development.',
    bulletPoints: [
      'Always prefer strict equality (===) over loose equality (==) to avoid implicit coercion traps.',
      'Logical operators (&&, ||) short-circuit and return the actual evaluating operand.',
      'Modern operators like ?? and ?. provide safe handling for nullish and deeply nested data.',
    ],
  },

  categories: [
    {
      name: 'Arithmetic',
      symbols: ['+', '-', '*', '/', '%', '**'],
      example: '10 % 3 // 1 (Remainder), 2 ** 3 // 8 (Exponent)',
      desc: 'Standard mathematical calculations and exponentiation.',
    },
    {
      name: 'Assignment',
      symbols: ['=', '+=', '-=', '*=', '/='],
      example: 'score += 5 // Same as score = score + 5',
      desc: 'Assigns computed results back into variable bindings.',
    },
    {
      name: 'Comparison & Relational',
      symbols: ['>', '<', '>=', '<='],
      example: 'age >= 18 // Returns true or false',
      desc: 'Evaluates numeric and lexicographical order.',
    },
    {
      name: 'Equality (Strict vs Loose)',
      symbols: ['===', '!==', '==', '!='],
      example: '5 === "5" // false (Strict), 5 == "5" // true (Coerced)',
      desc: '=== compares value AND type without coercion. == performs dangerous type conversions.',
    },
    {
      name: 'Logical & Short-Circuit',
      symbols: ['&&', '||', '!'],
      example: 'isLoggedIn && renderDashboard() // Short-circuits if false',
      desc: '&& returns the first falsy or last truthy value; || returns first truthy value.',
    },
    {
      name: 'Nullish Coalescing (??)',
      symbols: ['??'],
      example: 'count ?? 10 // Falls back ONLY on null or undefined',
      desc: 'Unlike ||, ?? preserves legitimate falsy values like 0, "", and false.',
    },
    {
      name: 'Optional Chaining (?.)',
      symbols: ['?.'],
      example: 'user?.profile?.avatar // Returns undefined instead of throwing TypeError',
      desc: 'Safely reads nested object properties without crashing when references are nullish.',
    },
    {
      name: 'Ternary Operator ( ? : )',
      symbols: ['condition ? val1 : val2'],
      example: 'isMember ? "$10" : "$25"',
      desc: 'Compact inline three-part conditional expression.',
    },
  ],

  equalityComparisons: [
    { left: '5', operator: '===', right: '"5"', result: false, reason: 'Different types (Number !== String)' },
    { left: '5', operator: '==', right: '"5"', result: true, reason: '⚠️ Coerces string "5" into number 5' },
    { left: '0', operator: '===', right: 'false', result: false, reason: 'Different types (Number !== Boolean)' },
    { left: '0', operator: '==', right: 'false', result: true, reason: '⚠️ Coerces false into 0' },
    { left: '""', operator: '==', right: '0', result: true, reason: '⚠️ Empty string coerces into 0' },
    { left: 'null', operator: '===', right: 'undefined', result: false, reason: 'Different primitive types' },
    { left: 'null', operator: '==', right: 'undefined', result: true, reason: 'Special loose equality rule' },
    { left: '[1,2]', operator: '===', right: '[1,2]', result: false, reason: 'Different memory addresses (Reference inequality)' },
  ],

  importantRules: [
    {
      title: 'Never Use == In Production',
      desc: 'Always default to === (strict equality) and !==. Loose equality has dozens of bizarre coercion edge cases.',
      code: '0 == "" // true 😱; 0 === "" // false ✅',
    },
    {
      title: '?? vs || Difference',
      desc: '|| treats 0, "", false as falsy and triggers fallback. ?? only triggers fallback for null and undefined.',
      code: 'const qty = 0; qty || 10 // 10 (Bug!); qty ?? 10 // 0 (Correct)',
    },
    {
      title: 'Optional Chaining Prevents Crashes',
      desc: 'Reading a property on null/undefined throws a fatal TypeError. ?. short-circuits to undefined safely.',
      code: 'const city = user?.address?.city;',
    },
    {
      title: 'Operator Precedence Basics',
      desc: 'Parentheses () have highest priority, followed by member access (.), then arithmetic (*, / before +, -), then comparisons, then equality, then logical operators.',
      code: '2 + 3 * 4 // 14 (multiplication first); (2 + 3) * 4 // 20',
    },
  ],

  mistakes: [
    {
      id: 'or-fallback-zero',
      title: '1. Using || for default numbers (The 0 Trap)',
      badge: 'Falsy Trap',
      badCode: `function setVolume(v) {\n  const volume = v || 50; // If v is 0, volume becomes 50!\n}`,
      fixCode: `function setVolume(v) {\n  const volume = v ?? 50; // ✅ Preserves 0 as a valid volume\n}`,
      explanation: '0 is a falsy value in JavaScript. Using || causes 0 to be treated as missing, forcing the fallback. Use the nullish coalescing operator (??) instead.',
    },
    {
      id: 'loose-equality-chaos',
      title: '2. Relying on loose equality (==)',
      badge: 'Coercion Bug',
      badCode: `if (input == false) { /* Matches false, 0, "", and [] */ }`,
      fixCode: `if (input === false) { /* Only matches actual boolean false */ }`,
      explanation: 'Loose equality attempts complex type conversion according to the ECMAScript spec, causing unexpected truthy/falsy matches.',
    },
    {
      id: 'unsafe-nested-property',
      title: '3. Unsafe deep property traversal without ?.',
      badge: 'Fatal TypeError',
      badCode: `const name = res.data.user.name; // 💥 Cannot read properties of undefined`,
      fixCode: `const name = res?.data?.user?.name; // ✅ Returns undefined safely`,
      explanation: 'If any intermediate property is null or undefined, standard dot notation throws an uncaught TypeError that halts program execution.',
    },
  ],

  takeaways: [
    'Always use strict equality (=== and !==) to eliminate type coercion bugs.',
    'Use ?? (Nullish Coalescing) when default values should preserve 0, false, and "".',
    'Use ?. (Optional Chaining) for safe deep property access on API payloads.',
    '&& and || return the actual evaluating value, enabling short-circuit idioms.',
    'Ternary (a ? b : c) is an expression and returns a value inline.',
    'Use parentheses () to make operator precedence explicit and unambiguous.',
  ],
};
