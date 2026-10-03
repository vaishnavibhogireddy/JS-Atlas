export const CALLBACKS_CONTENT = {
  meta: {
    title: 'Callbacks',
    category: 'Async JavaScript',
    subtitle: 'Functions passed into other functions to orchestrate deferred and asynchronous execution.',
    readTime: '5 min read',
    prerequisites: ['Functions'],
  },

  idea: {
    heading: 'The Foundational Async Pattern',
    summary: 'A callback is a function passed as an argument into another function, which is then invoked inside the outer function to complete an action. Because functions are first-class values in JavaScript, callbacks allow code to defer execution until a task finishes.',
    bulletPoints: [
      'Synchronous Callbacks: Execute immediately during the outer function execution (e.g. Array.map, forEach).',
      'Asynchronous Callbacks: Execute after a non-blocking operation completes (e.g. setTimeout, Event Listeners).',
      'Error-First Convention: In Node.js / classic JS, callbacks take `(err, data)` where `err` is null on success.',
    ],
  },

  syncVsAsync: [
    {
      title: 'Synchronous Callback',
      desc: 'Executes immediately on the current call stack without pausing or delegating to the browser queue.',
      code: `const numbers = [1, 2, 3];\n// The callback (n => n * 2) runs immediately for each element\nconst doubled = numbers.map(n => n * 2); \nconsole.log(doubled); // [2, 4, 6]`,
      timing: 'Blocking / Immediate',
    },
    {
      title: 'Asynchronous Callback',
      desc: 'Scheduled in the browser Web APIs environment and runs only after the call stack clears.',
      code: `console.log("Start");\n// The callback runs 1000ms later\nsetTimeout(() => {\n  console.log("Timer Finished");\n}, 1000);\nconsole.log("End");`,
      timing: 'Non-blocking / Delayed',
    },
  ],

  importantRules: [
    {
      title: 'Pass Function References, Do Not Invoke',
      desc: 'Pass the function identifier without parentheses `()`. Adding `()` invokes the function immediately on setup rather than passing it as a callback.',
      code: 'button.addEventListener("click", handleClick); // ✅ Correct\nbutton.addEventListener("click", handleClick()); // ❌ Bug!',
    },
    {
      title: 'Callback Hell & Inversion of Control',
      desc: 'Nesting multiple async callbacks creates deeply indented "pyramid of doom" code and gives third-party libraries control over when/if your callback is invoked. Promises were introduced to solve this.',
      code: 'step1(() => step2(() => step3(() => { ... }))); // Pyramid of doom',
    },
    {
      title: 'Error-First Convention',
      desc: 'In traditional Node.js/async callbacks, the first argument is reserved for an error object. Always check `if (err)` before processing data.',
      code: 'fs.readFile("file.txt", (err, data) => {\n  if (err) return handleError(err);\n  console.log(data);\n});',
    },
  ],

  mistakes: [
    {
      id: 'invoking-callback-immediately',
      title: '1. Invoking the callback during registration',
      badge: 'Immediate Execution Bug',
      badCode: `setTimeout(fetchData(), 2000); // ❌ Runs fetchData immediately; setTimeout gets undefined!`,
      fixCode: `setTimeout(fetchData, 2000); // ✅ Passes the function reference\n// Or with arguments: setTimeout(() => fetchData(id), 2000);`,
      explanation: 'Adding parentheses `()` executes the function right away and passes its return value into setTimeout instead of the function itself.',
    },
    {
      id: 'synchronous-assumption-on-async',
      title: '2. Trying to return values synchronously from async callbacks',
      badge: 'Undefined Return Trap',
      badCode: `function getUser() {\n  let name;\n  setTimeout(() => { name = "Vaishnavi"; }, 1000);\n  return name; // ❌ Returns undefined before timer runs!\n}`,
      fixCode: `function getUser(callback) {\n  setTimeout(() => { callback("Vaishnavi"); }, 1000); // ✅ Invoke callback with data\n}`,
      explanation: 'Asynchronous callbacks run in the future. The enclosing function returns immediately before the timer or network event has fired.',
    },
  ],

  takeaways: [
    'A callback is a function passed as an argument to another function for later execution.',
    'Synchronous callbacks run immediately (like array methods); async callbacks run after background tasks.',
    'Pass function references without () when attaching callbacks.',
    'Deeply nested callbacks cause "Callback Hell", which Promises and Async/Await modernize.',
  ],
};
