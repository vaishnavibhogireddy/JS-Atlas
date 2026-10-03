export const DATA_TYPES_CONTENT = {
  meta: {
    title: 'Data Types',
    category: 'Fundamentals',
    subtitle: 'Understand primitives, reference objects, and dynamic typing in JavaScript.',
    readTime: '5 min read',
    prerequisites: ['Variables'],
  },

  idea: {
    heading: 'The Dual Nature of JS Values',
    summary: 'Every value in JavaScript belongs to one of two fundamental categories: Primitives (stored directly by value, strictly immutable) or Objects (stored by memory reference, mutable collections).',
    bulletPoints: [
      '7 Primitive types: String, Number, BigInt, Boolean, Undefined, Null, Symbol.',
      '1 Reference type: Object (including Arrays, Functions, Dates, and plain Objects).',
      'JavaScript is dynamically typed: variables hold values, and the value determines the type at runtime.',
    ],
  },

  primitives: [
    {
      name: 'String',
      example: '"Hello, Atlas"',
      desc: 'Textual character sequences wrapped in quotes or backticks.',
      type: 'primitive',
    },
    {
      name: 'Number',
      example: '42 or 3.14',
      desc: '64-bit floating-point numbers. Also includes NaN and Infinity.',
      type: 'primitive',
    },
    {
      name: 'BigInt',
      example: '9007199254740991n',
      desc: 'Arbitrary-precision integers beyond the Number safe integer limit.',
      type: 'primitive',
    },
    {
      name: 'Boolean',
      example: 'true or false',
      desc: 'Logical flags representing truth or falsity.',
      type: 'primitive',
    },
    {
      name: 'undefined',
      example: 'undefined',
      desc: 'A declared variable that has not yet been assigned any value.',
      type: 'primitive',
    },
    {
      name: 'null',
      example: 'null',
      desc: 'Intentional absence of any object value. Represents an intentional "empty" state.',
      type: 'primitive',
    },
    {
      name: 'Symbol',
      example: 'Symbol("id")',
      desc: 'Unique, immutable primitive identifier used primarily as object property keys.',
      type: 'primitive',
    },
    {
      name: 'Object',
      example: '{ name: "Atlas" }, [1, 2]',
      desc: 'Reference type that groups key-value pairs or ordered collections.',
      type: 'reference',
    },
  ],

  typeofTable: [
    { input: '"Vaishnavi"', result: 'string', note: 'Textual primitive' },
    { input: '42', result: 'number', note: 'Numeric primitive' },
    { input: 'true', result: 'boolean', note: 'Logical boolean' },
    { input: 'undefined', result: 'undefined', note: 'Unassigned variable' },
    { input: 'null', result: 'object', note: '⚠️ Famous JS bug from 1995 (persists for compatibility)' },
    { input: '100n', result: 'bigint', note: 'Arbitrary precision integer' },
    { input: 'Symbol("k")', result: 'symbol', note: 'Unique identifier' },
    { input: '{ id: 1 }', result: 'object', note: 'Standard reference object' },
    { input: '[1, 2, 3]', result: 'object', note: 'Arrays are objects underneath (use Array.isArray)' },
    { input: 'function() {}', result: 'function', note: 'Callable objects return "function"' },
  ],

  importantRules: [
    {
      title: 'Primitives are Immutable',
      desc: 'You cannot alter a primitive string or number in memory. Methods like .toUpperCase() return a brand new string rather than modifying the original.',
      code: 'let str = "hi"; str.toUpperCase(); // str is still "hi"',
    },
    {
      title: 'Objects are Reference Types',
      desc: 'Variables holding objects store a memory pointer. Assigning one object variable to another shares the same memory reference.',
      code: 'const a = { x: 1 }; const b = a; b.x = 2; // a.x is now 2',
    },
    {
      title: 'typeof null is "object"',
      desc: 'In the original JS implementation, values were represented as a type tag and a value. The null pointer type tag was 000, which matched object.',
      code: 'typeof null === "object"; // true (Historical quirk)',
    },
    {
      title: 'Dynamic Variable Typing',
      desc: 'Variables do not have static types in JavaScript; values have types. A variable can hold a string, then a number later.',
      code: 'let val = "text"; val = 42; // Valid dynamic reassignment',
    },
    {
      title: 'NaN is of Type "number"',
      desc: 'NaN stands for "Not a Number", but its technical JavaScript data type is still number.',
      code: 'typeof NaN; // "number"',
    },
    {
      title: 'Array Identification',
      desc: 'Because typeof [] returns "object", always use Array.isArray(value) to reliably verify an array.',
      code: 'Array.isArray([1, 2]); // true',
    },
  ],

  mistakes: [
    {
      id: 'null-vs-undefined',
      title: '1. Confusing null vs. undefined',
      badge: 'Logic Bug',
      badCode: `let user;\n// Checking strictly for null misses undefined:\nif (user === null) { /* never runs! */ }`,
      fixCode: `let user;\n// Use nullish check or loose equality:\nif (user == null) { /* catches both null and undefined */ }`,
      explanation: 'undefined means a variable has been declared but not given a value yet. null is an explicit value assigned by a developer to mean "intentionally empty".',
    },
    {
      id: 'nan-comparison',
      title: '2. Comparing NaN with ===',
      badge: 'Comparison Trap',
      badCode: `const result = "abc" / 2; // NaN\nif (result === NaN) { /* ❌ Always false! NaN is not equal to itself */ }`,
      fixCode: `const result = "abc" / 2;\nif (Number.isNaN(result)) { /* ✅ Correct way to detect NaN */ }`,
      explanation: 'NaN is the only value in JavaScript that is not strictly equal to itself. Always use Number.isNaN(val) to check for NaN.',
    },
    {
      id: 'object-mutation-surprise',
      title: '3. Accidental Object Mutation via Shared Reference',
      badge: 'Mutation Bug',
      badCode: `const original = { theme: "dark" };\nconst copy = original;\ncopy.theme = "light"; // ⚠️ Mutates original too!`,
      fixCode: `const original = { theme: "dark" };\nconst copy = { ...original }; // ✅ Shallow copy with spread\ncopy.theme = "light";`,
      explanation: 'Variables containing objects only hold memory pointers. Copying the variable copies the address, not the underlying data.',
    },
  ],

  takeaways: [
    '7 Primitive types (String, Number, BigInt, Boolean, undefined, null, Symbol) + 1 Reference type (Object).',
    'Primitives are copied by value and are completely immutable.',
    'Objects and Arrays are copied by memory reference and are mutable.',
    'typeof null returns "object" due to a historical 1995 engine quirk.',
    'undefined = uninitialized default; null = intentional empty assignment.',
    'Use Number.isNaN(val) to check for NaN and Array.isArray(val) for arrays.',
    'JavaScript is dynamically typed: types belong to values, not variables.',
  ],
};
