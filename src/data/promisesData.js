export const PROMISES_CONTENT = {
  meta: {
    title: 'Promises',
    category: 'Async JavaScript',
    subtitle: 'Stateful containers for future values: pending, fulfilled, and rejected.',
    readTime: '6 min read',
    prerequisites: ['Callbacks', 'Functions'],
  },

  idea: {
    heading: 'The 3-State Container for Future Values',
    summary: 'A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. It frees asynchronous code from callback nesting by providing chainable .then() and .catch() pipelines.',
    bulletPoints: [
      '3 Immutable States: Pending (in flight) → Settled into either Fulfilled (resolved) or Rejected (failed).',
      'Once a Promise settles, its state and value become permanently locked and can never change.',
      'Chaining: Every .then() returns a brand new Promise, allowing linear sequential async workflows.',
    ],
  },

  states: [
    {
      name: 'PENDING',
      badge: 'Initial State',
      color: 'border-amber-500/40 text-amber-300 bg-amber-950/40',
      desc: 'The asynchronous operation has started but has not completed or failed yet.',
    },
    {
      name: 'FULFILLED',
      badge: 'Success',
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40',
      desc: '`resolve(value)` was called. The promise successfully holds its final data value.',
    },
    {
      name: 'REJECTED',
      badge: 'Failure',
      color: 'border-rose-500/40 text-rose-300 bg-rose-950/40',
      desc: '`reject(error)` was called or an exception was thrown. The promise holds an error reason.',
    },
  ],

  chainingPipeline: {
    title: 'Promise Chaining Pipeline',
    code: `fetchUserData(userId)\n  .then(user => fetchUserPosts(user.id)) // Returns next Promise\n  .then(posts => renderFeed(posts))      // Runs after posts return\n  .catch(err => showError(err))          // Catches errors anywhere in the chain\n  .finally(() => hideSpinner());         // Always runs at the very end`,
    desc: 'Each .then() receives the resolved value of the previous promise and passes its own return value to the next link in the chain.',
  },

  importantRules: [
    {
      title: 'Promises Settle Only Once',
      desc: 'Calling `resolve()` or `reject()` multiple times has no effect. Once transitioned out of pending, the outcome is immutable.',
      code: 'new Promise((resolve, reject) => {\n  resolve("First");\n  resolve("Second"); // Ignored!\n});',
    },
    {
      title: 'Always Return Inside .then()',
      desc: 'To pass data down the chain, you must explicitly `return` a value or next promise inside your `.then()` callback.',
      code: 'promise.then(data => { return data.id; }).then(id => console.log(id));',
    },
    {
      title: 'Single .catch() Covers Entire Chain',
      desc: 'An error thrown at any step skips all subsequent `.then()` handlers and jumps directly to the nearest `.catch()`.',
      code: 'step1().then(step2).then(step3).catch(handleAnyError);',
    },
  ],

  mistakes: [
    {
      id: 'nesting-then-pyramid',
      title: '1. Nesting .then() calls instead of returning and chaining',
      badge: 'Anti-Pattern',
      badCode: `getData().then(a => {\n  getMore(a).then(b => {\n    // ❌ Recreating callback hell inside promises!\n  });\n});`,
      fixCode: `getData()\n  .then(a => getMore(a))\n  .then(b => { /* ✅ Flat, readable chain */ });`,
      explanation: 'Nesting `.then()` defeats the core purpose of Promises. Return the inner promise from `.then()` to keep the chain flat and linear.',
    },
    {
      id: 'missing-catch-handler',
      title: '2. Unhandled Promise Rejections',
      badge: 'Silent Crash',
      badCode: `fetch("/api/data").then(res => res.json()); // ⚠️ If network fails, throws UnhandledPromiseRejection`,
      fixCode: `fetch("/api/data")\n  .then(res => res.json())\n  .catch(err => console.error("Failed:", err)); // ✅ Always handle rejection`,
      explanation: 'Uncaught promise rejections can crash Node.js processes and lead to silent failures in browsers. Always attach `.catch()` or handle with `try/catch`.',
    },
  ],

  takeaways: [
    'A Promise has 3 states: Pending, Fulfilled (resolved), and Rejected (error).',
    'Promises are immutable: once resolved or rejected, their state never changes.',
    'Chain operations using .then() and catch errors cleanly with .catch().',
    '.finally() executes cleanup logic regardless of whether the promise succeeded or failed.',
    'Always return values or nested promises inside .then() to pass data down the chain.',
  ],
};
