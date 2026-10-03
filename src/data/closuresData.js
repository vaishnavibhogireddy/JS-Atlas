export const CLOSURES_CONTENT = {
  meta: {
    title: 'Closures',
    category: 'JavaScript Behavior',
    subtitle: 'How functions retain living references to their enclosing lexical state even after execution completes.',
    readTime: '6 min read',
    prerequisites: ['Functions', 'Scope'],
  },

  idea: {
    heading: 'The Memory Backpack of Functions',
    summary: 'A closure is the combination of a function bundled together with references to its surrounding lexical environment. In JavaScript, every inner function automatically forms a closure over the variables in its parent scopes.',
    bulletPoints: [
      'An inner function remembers and has access to variables from its outer function even AFTER the outer function has finished executing and returned.',
      'Closures enable private variables and data encapsulation without classes.',
      'Functions retain a living reference to the outer variable, not a static copy.',
    ],
  },

  lifecycleSteps: [
    {
      step: '1. Outer Function Runs',
      code: 'function createCounter() {\n  let count = 0; // Local variable allocated\n  return function() { count++; return count; };\n}',
      desc: 'The outer function allocates memory for `count` and returns the inner function reference.',
    },
    {
      step: '2. Outer Returns, Scope Survives',
      code: 'const counter = createCounter();',
      desc: 'Normally local variables are garbage collected when a function exits. But because the returned inner function references `count`, JavaScript keeps the memory alive.',
    },
    {
      step: '3. Invoking the Closure',
      code: 'counter(); // 1\ncounter(); // 2\ncounter(); // 3',
      desc: 'Each call to `counter()` reads and mutates the private enclosed `count` variable in memory.',
    },
  ],

  useCases: [
    {
      title: 'Data Encapsulation & Private State',
      desc: 'Hide internal implementation details from external modification.',
      code: `function createBankAccount(initial) {\n  let balance = initial; // Private variable\n  return {\n    deposit: (amt) => { balance += amt; },\n    getBalance: () => balance\n  };\n}`,
    },
    {
      title: 'Function Factories',
      desc: 'Generate customized functions with pre-configured parameters.',
      code: `function multiplier(factor) {\n  return (num) => num * factor;\n}\nconst double = multiplier(2);\nconst triple = multiplier(3);\nconsole.log(double(5)); // 10\nconsole.log(triple(5)); // 15`,
    },
    {
      title: 'Event Handlers & Callbacks with State',
      desc: 'Attach handlers that preserve specific IDs or data in their closure scope.',
      code: `function setupButton(id) {\n  document.getElementById(id).onclick = () => {\n    console.log("Clicked button " + id); // Retains id\n  };\n}`,
    },
  ],

  importantRules: [
    {
      title: 'Closures Hold Living References, Not Snapshots',
      desc: 'A closure does not freeze or snapshot the value at creation time. It holds a pointer to the variable in memory. If the variable updates, the closure sees the updated value.',
      code: 'let name = "Dan";\nconst fn = () => console.log(name);\nname = "Sam";\nfn(); // Logs "Sam"!',
    },
    {
      title: 'Multiple Instances Have Independent State',
      desc: 'Calling the outer function multiple times creates separate, completely independent closure environments in memory.',
      code: 'const counterA = createCounter();\nconst counterB = createCounter();\ncounterA(); // 1\ncounterB(); // 1 (Completely independent)',
    },
    {
      title: 'Memory Considerations',
      desc: 'Because variables referenced by active closures cannot be garbage collected, keep closure scopes lean and avoid retaining huge unused data buffers.',
      code: '// Be mindful of heavy closures in long-lived event listeners',
    },
  ],

  mistakes: [
    {
      id: 'closure-in-var-loop',
      title: '1. Creating closures in loops with var',
      badge: 'Classic Closure Bug',
      badCode: `const funcs = [];\nfor (var i = 0; i < 3; i++) {\n  funcs.push(() => console.log(i)); // ⚠️ All closures point to the same single i\n}\nfuncs[0](); // 3\nfuncs[1](); // 3`,
      fixCode: `const funcs = [];\nfor (let i = 0; i < 3; i++) {\n  funcs.push(() => console.log(i)); // ✅ 'let' creates a new lexical i per iteration\n}\nfuncs[0](); // 0\nfuncs[1](); // 1`,
      explanation: 'With var, all closures capture the exact same shared variable, which ends up at 3 when the loop finishes. With let, each iteration creates a brand new binding.',
    },
    {
      id: 'accidental-closure-leak',
      title: '2. Retaining large objects in long-lived closures',
      badge: 'Memory Leak Risk',
      badCode: `function attachHandler() {\n  const hugeDataset = new Array(1000000).fill("data");\n  window.addEventListener("resize", () => {\n    console.log("Resized"); // ⚠️ Retains entire hugeDataset in scope!\n  });\n}`,
      fixCode: `function attachHandler() {\n  window.addEventListener("resize", () => {\n    console.log("Resized"); // ✅ Keep closure scope clean\n  });\n}`,
      explanation: 'Any variable in the enclosing scope can be retained in memory as long as the inner closure remains reachable by an event listener.',
    },
    {
      id: 'expecting-isolated-reassignment',
      title: '3. Modifying enclosed state affecting other sibling closures',
      badge: 'Shared State Bug',
      badCode: `function createPair() {\n  let val = 0;\n  return [\n    () => val++, // Mutates shared val\n    () => val    // Reads shared val\n  ];\n}`,
      fixCode: `// Understand that sibling functions from the SAME invocation share the exact same variable.`,
      explanation: 'Functions returned from the same outer function invocation share the exact same lexical environment and see each other mutations.',
    },
  ],

  takeaways: [
    'A closure is a function combined with references to its surrounding lexical environment.',
    'Inner functions retain access to outer variables even after the outer function finishes executing.',
    'Closures enable private state and data encapsulation in JavaScript.',
    'Closures capture living references to variables, not static value copies.',
    'Each call to the outer function creates a new, independent closure instance in memory.',
    'Use `let` in loops so each iteration receives its own closure binding.',
  ],
};
