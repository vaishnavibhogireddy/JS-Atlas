export const SCOPE_CONTENT = {
  meta: {
    title: 'Scope',
    category: 'JavaScript Behavior',
    subtitle: 'Where variables live, lexical environments, and the outward scope chain lookup mechanism.',
    readTime: '5 min read',
    prerequisites: ['Variables', 'Functions'],
  },

  idea: {
    heading: 'The Boundary of Variable Visibility',
    summary: 'Scope determines where variables, functions, and objects can be accessed in your code. JavaScript uses Lexical Scoping: the location where a variable or function is physically written in code determines its scope boundary.',
    bulletPoints: [
      'Global Scope: Accessible anywhere throughout the entire program.',
      'Function Scope: Variables created with `var` or inside a function exist only inside that function.',
      'Block Scope: Variables declared with `let` and `const` exist only inside `{ curly braces }`.',
      'Scope Chain: JavaScript resolves identifiers by searching current scope first, then walking outward to parent scopes up to Global.',
    ],
  },

  scopeLevels: [
    {
      level: '1. Global Scope',
      badge: 'Outer Boundary',
      desc: 'Top-level execution environment. Variables declared outside any function or block are accessible everywhere.',
      code: 'const APP_NAME = "Atlas"; // Accessible in any function or block',
    },
    {
      level: '2. Function Scope',
      badge: 'Function Boundary',
      desc: 'Every function call creates a new execution context. Variables declared inside cannot be accessed from outside.',
      code: 'function calculate() {\n  const secret = 42;\n}\n// secret is not accessible here (ReferenceError)',
    },
    {
      level: '3. Block Scope (ES6)',
      badge: 'Curly Brace { } Boundary',
      desc: 'Created by if statements, for loops, and standalone `{ }` blocks. Applies strictly to `let` and `const`.',
      code: 'if (true) {\n  let blockItem = "shielded";\n  var leakedItem = "leaked";\n}\n// blockItem is not accessible; leakedItem is accessible!',
    },
  ],

  scopeLookupVisual: {
    title: 'The Outward Scope Chain Rule',
    desc: 'When an identifier is used, the JavaScript engine searches the immediate local scope. If not found, it steps out to the parent scope, repeating up to the Global scope. It NEVER searches inward into sibling or child scopes.',
  },

  importantRules: [
    {
      title: 'let & const are Block Scoped',
      desc: '`let` and `const` respect `{ ... }` blocks of all kinds (if, for, while, switch). `var` completely ignores blocks and attaches to the outer function.',
      code: '{ let x = 1; } console.log(x); // ReferenceError',
    },
    {
      title: 'Variable Shadowing',
      desc: 'An inner scope can declare a variable with the exact same name as an outer scope. The inner declaration "shadows" (hides) the outer variable inside its block.',
      code: 'let user = "Global";\nfunction test() {\n  let user = "Local"; // Shadows outer variable\n}',
    },
    {
      title: 'Lexical vs Dynamic Scoping',
      desc: 'JavaScript scope is determined at author/compile time based on where functions are written in the file, NOT where they are invoked.',
      code: 'const x = 10;\nfunction f() { console.log(x); }\nfunction g() { const x = 20; f(); } // Logs 10, not 20!',
    },
  ],

  mistakes: [
    {
      id: 'accidental-global',
      title: '1. Accidental Global Variable (Missing let/const)',
      badge: 'Pollution Bug',
      badCode: `function setTotal() {\n  total = 100; // ⚠️ Missing let/const! Attaches to global window in non-strict mode\n}`,
      fixCode: `function setTotal() {\n  const total = 100; // ✅ Confined to function scope\n}`,
      explanation: 'Assigning a value to an undeclared identifier in non-strict JavaScript automatically creates a global variable on the window object, causing collisions.',
    },
    {
      id: 'var-leak-for-loop',
      title: '2. Variable leakage from for loops with var',
      badge: 'Leakage Bug',
      badCode: `for (var i = 0; i < 5; i++) { ... }\nconsole.log(i); // 5 (var leaked outside the loop!)`,
      fixCode: `for (let i = 0; i < 5; i++) { ... }\nconsole.log(i); // ReferenceError: i is not defined (Safely trapped)`,
      explanation: 'Because var is not block scoped, loop counters declared with var bleed into the surrounding function and can overwrite other variables.',
    },
    {
      id: 'inward-lookup-assumption',
      title: '3. Expecting parent scope to access child variables',
      badge: 'Lookup Confusion',
      badCode: `function outer() {\n  function inner() { const token = "abc"; }\n  console.log(token); // ❌ ReferenceError (Cannot look inward!)\n}`,
      fixCode: `function outer() {\n  let token;\n  function inner() { token = "abc"; }\n  inner();\n  console.log(token); // ✅ Shared in outer lexical scope\n}`,
      explanation: 'Scope resolution is strictly one-way: inward scopes can look outward, but outer scopes can never inspect variables defined inside child functions or blocks.',
    },
  ],

  takeaways: [
    'Scope is lexical: determined by where code is written in the file.',
    'let and const are block scoped to { ... } curly braces.',
    'var is function scoped and leaks out of if statements and loops.',
    'The scope chain resolution searches outward from local to global, never inward.',
    'Avoid global variables to eliminate naming collisions and memory leaks.',
  ],
};
