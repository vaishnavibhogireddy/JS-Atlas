export const LOOPS_CONTENT = {
  meta: {
    title: 'Loops',
    category: 'Fundamentals',
    subtitle: 'Iterate efficiently over ranges, arrays, and objects with for, while, and iteration protocols.',
    readTime: '4 min read',
    prerequisites: ['Variables', 'Conditions'],
  },

  idea: {
    heading: 'Automated Repetition',
    summary: 'Loops repeat a block of code as long as a specified condition remains true. JavaScript offers indexed counters (`for`), condition-driven loops (`while`), and modern item iterators (`for...of` and `for...in`).',
    bulletPoints: [
      '`for` loop: Ideal when the exact number of iterations or an index counter is known.',
      '`for...of`: Modern, clean loop for iterating through values of iterable collections (Arrays, Strings, Sets).',
      '`for...in`: Iterates over the keys / property names of an Object.',
      '`break` exits the loop immediately; `continue` skips directly to the next iteration.',
    ],
  },

  loopTypes: [
    {
      name: 'Classic for Loop',
      syntax: 'for (let i = 0; i < limit; i++)',
      useCase: 'Numbered iteration, indexed arrays, performance-critical loops.',
      example: `for (let i = 0; i < 5; i++) {\n  console.log(i); // 0, 1, 2, 3, 4\n}`,
    },
    {
      name: 'for...of (Iterates VALUES)',
      syntax: 'for (const item of iterable)',
      useCase: 'Best for Arrays, Strings, Sets, Maps. Direct access to elements.',
      example: `const colors = ["red", "green", "blue"];\nfor (const color of colors) {\n  console.log(color); // "red", "green", "blue"\n}`,
    },
    {
      name: 'for...in (Iterates KEYS)',
      syntax: 'for (const key in object)',
      useCase: 'Best for plain Object properties. (Avoid on Arrays due to index order quirks).',
      example: `const user = { name: "Vaishnavi", age: 19 };\nfor (const key in user) {\n  console.log(key, user[key]);\n}`,
    },
    {
      name: 'while Loop',
      syntax: 'while (condition)',
      useCase: 'Repeats while condition is true when step count is unknown in advance.',
      example: `let balance = 100;\nwhile (balance > 0) {\n  balance -= 25;\n}`,
    },
    {
      name: 'do...while Loop',
      syntax: 'do { ... } while (condition);',
      useCase: 'Guarantees the loop body runs AT LEAST ONCE before condition check.',
      example: `let input;\ndo {\n  input = promptUser();\n} while (!isValid(input));`,
    },
  ],

  importantRules: [
    {
      title: 'for...of vs. for...in Rule',
      desc: 'Use `for...of` for iterable values (Arrays). Use `for...in` for Object property keys.',
      code: 'for (const val of ["a", "b"]) // "a", "b"\nfor (const key in ["a", "b"]) // "0", "1"',
    },
    {
      title: 'Declare Counter with let',
      desc: 'Always declare the counter variable with `let` in a for loop so each iteration receives its own block scope binding.',
      code: 'for (let i = 0; i < 3; i++) { ... }',
    },
    {
      title: 'break vs. continue',
      desc: '`break` terminates the loop entirely. `continue` skips the remaining lines of the current iteration and jumps to the next cycle.',
      code: 'if (item === "skip") continue;\nif (item === "stop") break;',
    },
  ],

  mistakes: [
    {
      id: 'infinite-loop',
      title: '1. Infinite Loop (Missing Increment)',
      badge: 'Crash Risk',
      badCode: `let i = 0;\nwhile (i < 5) {\n  console.log(i); // 💥 i is never incremented, freezes browser tab\n}`,
      fixCode: `let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++; // ✅ Increments counter toward termination condition\n}`,
      explanation: 'A while loop without a state modification that eventually falsifies the condition will execute infinitely and freeze the browser JavaScript thread.',
    },
    {
      id: 'for-in-array',
      title: '2. Using for...in to iterate over Array elements',
      badge: 'String Index Bug',
      badCode: `const numbers = [10, 20, 30];\nfor (const n in numbers) {\n  console.log(n + 1); // ⚠️ Prints "01", "11", "21" (n is a string index!)\n}`,
      fixCode: `const numbers = [10, 20, 30];\nfor (const num of numbers) {\n  console.log(num + 1); // ✅ Prints 11, 21, 31 (num is the actual value)\n}`,
      explanation: 'for...in iterates over keys as strings, not values. For arrays, use for...of or array methods like .forEach().',
    },
    {
      id: 'var-in-async-loop',
      title: '3. Using var in a loop counter with closures/timers',
      badge: 'Closure Bug',
      badCode: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // Prints 3, 3, 3!\n}`,
      fixCode: `for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100); // ✅ Prints 0, 1, 2\n}`,
      explanation: 'Because var is function scoped, all setTimeout callbacks share the same single mutated i variable. let creates a fresh lexical binding per iteration.',
    },
  ],

  takeaways: [
    'Use for loops when you need numeric indexes or controlled step counts.',
    'Use for...of for clean traversal of Array values and strings.',
    'Use for...in for iterating over key-value properties of plain Objects.',
    'Always declare loop counters with let to prevent variable leaking and closure bugs.',
    'Use break to exit loops early and continue to skip to the next iteration.',
  ],
};
