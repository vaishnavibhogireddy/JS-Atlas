export const HOISTING_CONTENT = {
  meta: {
    title: 'Hoisting',
    category: 'JavaScript Behavior',
    subtitle: 'How the compilation creation phase allocates memory before running a single line of code.',
    readTime: '5 min read',
    prerequisites: ['Variables', 'Scope'],
  },

  idea: {
    heading: 'The 2-Phase Execution Engine',
    summary: 'Before JavaScript executes your code, the JS engine performs a compilation/setup phase where it scans for all declarations and allocates memory slots. This mechanism makes declarations appear to be "hoisted" to the top of their scope.',
    bulletPoints: [
      'Phase 1: Creation Phase (Memory is allocated for declarations).',
      'Phase 2: Execution Phase (Code is run line by line, assigning values and calling functions).',
      'Function declarations are hoisted with their entire implementation.',
      '`var` declarations are hoisted and initialized to `undefined`.',
      '`let` and `const` declarations are hoisted into memory but remain uninitialized in the Temporal Dead Zone (TDZ).',
    ],
  },

  comparisonTable: [
    {
      construct: 'Function Declaration',
      syntax: 'function greet() {}',
      creationPhase: 'Allocated in memory with full body',
      beforeDeclaration: '✅ Fully callable before definition line',
    },
    {
      construct: 'var variable',
      syntax: 'var score = 10;',
      creationPhase: 'Allocated and initialized to `undefined`',
      beforeDeclaration: '⚠️ Returns `undefined` (No error, but causes logic bugs)',
    },
    {
      construct: 'let / const variable',
      syntax: 'let score = 10;',
      creationPhase: 'Allocated into Temporal Dead Zone (TDZ)',
      beforeDeclaration: '❌ Throws `ReferenceError: Cannot access before initialization`',
    },
    {
      construct: 'Function Expression / Arrow',
      syntax: 'const greet = () => {}',
      creationPhase: 'Follows variable rules (TDZ for const)',
      beforeDeclaration: '❌ Throws `ReferenceError` (Not callable yet)',
    },
  ],

  importantRules: [
    {
      title: 'let and const ARE Hoisted',
      desc: 'A common myth is that let/const are not hoisted. In truth, they are hoisted during the creation phase, but the JS engine actively forbids reading them until the execution reaches the declaration line (TDZ).',
      code: 'let x = "outer";\n{ \n  // TDZ for inner x starts here!\n  console.log(x); // ReferenceError (Not "outer"!)\n  let x = "inner";\n}',
    },
    {
      title: 'Function Declarations Beat Variable Declarations',
      desc: 'Function declarations are hoisted before variable declarations during the compilation phase.',
      code: 'console.log(typeof foo); // "function"\nvar foo = "hello";\nfunction foo() {}',
    },
    {
      title: 'Always Declare Before Use',
      desc: 'Even though hoisting exists in the JS engine spec, write code as if hoisting does not exist. Always declare variables and functions before invoking them.',
      code: '// Best practice: top-of-scope declarations',
    },
  ],

  mistakes: [
    {
      id: 'hoisted-var-undefined',
      title: '1. Reading var before assignment expecting a value',
      badge: 'Undefined Surprise',
      badCode: `console.log(user); // ⚠️ Prints undefined!\nvar user = "Vaishnavi";`,
      fixCode: `const user = "Vaishnavi";\nconsole.log(user); // ✅ Always declare first`,
      explanation: 'Only the declaration `var user` is hoisted to the top and initialized to `undefined`. The assignment `= "Vaishnavi"` remains on the original line of code.',
    },
    {
      id: 'calling-function-expression-early',
      title: '2. Calling arrow functions or expressions before definition',
      badge: 'TDZ ReferenceError',
      badCode: `calculateTax(); // ❌ ReferenceError: Cannot access 'calculateTax' before initialization\nconst calculateTax = () => { ... };`,
      fixCode: `const calculateTax = () => { ... };\ncalculateTax(); // ✅ Call after declaration`,
      explanation: 'Unlike function declarations (`function name() {}`), function expressions stored in `const` or `let` live in the TDZ until initialized.',
    },
    {
      id: 'tdz-shadowing-trap',
      title: '3. TDZ blocking access to outer variable with same name',
      badge: 'TDZ Trap',
      badCode: `const count = 10;\nfunction run() {\n  console.log(count); // 💥 ReferenceError (Inner count is in TDZ!)\n  let count = 20;\n}`,
      fixCode: `const count = 10;\nfunction run() {\n  let count = 20;\n  console.log(count); // ✅ 20\n}`,
      explanation: 'The inner `let count` creates an inner TDZ that shadows the outer variable from the very top of the function down to its declaration line.',
    },
  ],

  takeaways: [
    'Hoisting happens during Phase 1 (Creation / Setup phase) of JavaScript execution.',
    'Function declarations are fully hoisted with their implementations and can be called anywhere.',
    'var is hoisted and initialized to undefined, leading to silent bugs.',
    'let and const are hoisted into the Temporal Dead Zone (TDZ) and throw a ReferenceError if read early.',
    'Function expressions and arrow functions follow the hoisting rules of their variable declaration (let/const).',
  ],
};
