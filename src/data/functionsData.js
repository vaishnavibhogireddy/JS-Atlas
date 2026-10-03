export const FUNCTIONS_CONTENT = {
  meta: {
    title: 'Functions',
    category: 'Functions & Data',
    subtitle: 'Modularize logic with first-class functions, parameters, arrow syntax, and return pipelines.',
    readTime: '6 min read',
    prerequisites: ['Variables', 'Scope'],
  },

  idea: {
    heading: 'The First-Class Engine of JavaScript',
    summary: 'Functions in JavaScript are first-class citizens: they can be assigned to variables, passed as arguments into other functions, and returned from functions just like any other value.',
    bulletPoints: [
      'Input (Parameters / Arguments) → Function Body (Execution) → Output (Return Value).',
      'Function Declarations are hoisted; Arrow Functions and Expressions are not.',
      'Arrow functions provide concise syntax and inherit lexical `this`.',
      'Modern features include default parameters and rest parameters (`...args`).',
    ],
  },

  types: [
    {
      name: 'Function Declaration',
      syntax: 'function add(a, b) { return a + b; }',
      hoisted: 'Yes (Callable before declaration)',
      thisContext: 'Dynamic (Caller determines `this`)',
      desc: 'The traditional named function statement. Hoisted to the top of its scope.',
    },
    {
      name: 'Function Expression',
      syntax: 'const add = function(a, b) { return a + b; };',
      hoisted: 'No (Variable TDZ applies)',
      thisContext: 'Dynamic (Caller determines `this`)',
      desc: 'Anonymous or named function stored inside a variable binding.',
    },
    {
      name: 'Arrow Function',
      syntax: 'const add = (a, b) => a + b;',
      hoisted: 'No (Variable TDZ applies)',
      thisContext: 'Lexical (Inherits `this` from surrounding scope)',
      desc: 'Modern concise syntax introduced in ES6. Implicit return for one-liners.',
    },
  ],

  parametersVsArguments: {
    title: 'Parameters vs. Arguments',
    desc: 'Parameters are the placeholders defined in the function declaration. Arguments are the concrete values passed when invoking the function.',
    code: `// 'x' and 'y' are PARAMETERS (Placeholders)\nfunction multiply(x, y = 1) {\n  return x * y;\n}\n\n// 4 and 5 are ARGUMENTS (Actual runtime values)\nconst result = multiply(4, 5); // 20`,
  },

  importantRules: [
    {
      title: 'Functions Without return Give undefined',
      desc: 'If a function reaches the end of its body without an explicit `return` statement, it automatically returns `undefined`.',
      code: 'function log(msg) { console.log(msg); }\nconst res = log("hi"); // res is undefined',
    },
    {
      title: 'Arrow Functions Have Lexical this',
      desc: 'Arrow functions do not bind their own `this`. They inherit `this` from the enclosing lexical scope, making them ideal for callbacks.',
      code: 'const btn = { count: 0, click: () => { /* this is window/outer */ } };',
    },
    {
      title: 'Rest Parameters Gather Arguments',
      desc: 'Use `...rest` as the last parameter to collect any number of remaining arguments into a clean JavaScript array.',
      code: 'function sumAll(...numbers) { return numbers.reduce((a, b) => a + b, 0); }',
    },
    {
      title: 'Default Parameter Fallback',
      desc: 'Default parameters only kick in when the argument is `undefined` (or omitted). Passing `null` will NOT trigger the default.',
      code: 'function greet(name = "Guest") { ... }\ngreet(undefined); // "Guest"\ngreet(null); // null',
    },
  ],

  mistakes: [
    {
      id: 'missing-return',
      title: '1. Forgetting return in multi-line arrow functions',
      badge: 'Undefined Return',
      badCode: `const double = (n) => {\n  n * 2; // ❌ Wrapped in { braces } but missing return keyword!\n};\nconsole.log(double(5)); // undefined`,
      fixCode: `const double = (n) => {\n  return n * 2; // ✅ Explicit return inside block body\n};\n// OR: const double = (n) => n * 2; (Implicit return)`,
      explanation: 'Arrow functions only have an implicit return when written without curly braces on a single line. When using `{ ... }`, you MUST write return.',
    },
    {
      id: 'arrow-method-this',
      title: '2. Using arrow functions for object methods relying on this',
      badge: 'Context Loss',
      badCode: `const user = {\n  name: "Vaishnavi",\n  greet: () => console.log("Hi, " + this.name), // ⚠️ this.name is undefined!\n};`,
      fixCode: `const user = {\n  name: "Vaishnavi",\n  greet() {\n    console.log("Hi, " + this.name); // ✅ Standard method has proper this\n  }\n};`,
      explanation: 'Arrow functions do not create their own this context. In object literals, an arrow function will inherit this from the outer module or window scope.',
    },
    {
      id: 'invoking-on-definition',
      title: '3. Accidental immediate invocation when passing callbacks',
      badge: 'Callback Execution Bug',
      badCode: `button.addEventListener("click", handleClick()); // ❌ Calls immediately on setup!`,
      fixCode: `button.addEventListener("click", handleClick); // ✅ Passes function reference`,
      explanation: 'Adding parentheses `()` invokes the function immediately. To pass a function as a callback, pass the reference without parentheses.',
    },
  ],

  takeaways: [
    'Functions are first-class: assign them, pass them, and return them freely.',
    'Function declarations are hoisted; expressions and arrow functions are not.',
    'Parameters are the defined variables; arguments are the passed runtime values.',
    'Arrow functions inherit lexical this and support concise single-expression returns.',
    'Default parameters trigger on undefined, and rest parameters (...args) gather values.',
  ],
};
