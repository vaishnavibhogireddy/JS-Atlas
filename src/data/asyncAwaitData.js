export const ASYNC_AWAIT_CONTENT = {
  meta: {
    title: 'Async / Await',
    category: 'Async JavaScript',
    subtitle: 'Syntactic sugar over Promises for readable, synchronous-looking asynchronous code.',
    readTime: '5 min read',
    prerequisites: ['Promises', 'Functions'],
  },

  idea: {
    heading: 'Synchronous Syntax for Asynchronous Flow',
    summary: '`async` and `await` build on top of Promises. Declaring a function with `async` ensures it always returns a Promise. The `await` keyword pauses the execution of THAT specific async function until the awaited Promise settles, allowing you to write sequential async code with standard `try/catch` error handling.',
    bulletPoints: [
      '`async` functions always wrap their return value in a Promise.',
      '`await` can only be used inside async functions (or top-level modules).',
      '`await` pauses the enclosing async function, NOT the main browser thread or UI renderer.',
      'Standard `try { ... } catch (err) { ... }` blocks replace `.catch()` for error handling.',
    ],
  },

  comparison: {
    promiseSyntax: `function loadProfile() {\n  return fetchUser()\n    .then(user => fetchPosts(user.id))\n    .then(posts => render(posts))\n    .catch(err => handleError(err));\n}`,
    asyncSyntax: `async function loadProfile() {\n  try {\n    const user = await fetchUser();\n    const posts = await fetchPosts(user.id);\n    render(posts);\n  } catch (err) {\n    handleError(err);\n  }\n}`,
  },

  importantRules: [
    {
      title: 'await Pauses the Function, NOT the Browser',
      desc: 'When an async function hits `await`, it yields control back to the Event Loop. Other scripts, user clicks, and animations continue running smoothly.',
      code: 'const user = await fetchUser(); // Other browser tasks run in parallel',
    },
    {
      title: 'Parallel vs. Sequential Await',
      desc: 'Awaiting two independent tasks sequentially doubles the waiting time. Use `Promise.all([task1(), task2()])` to run independent async operations concurrently.',
      code: '// Parallel:\nconst [user, settings] = await Promise.all([fetchUser(), fetchSettings()]);',
    },
    {
      title: 'Return Value Wrapping',
      desc: 'Returning a non-promise value like `return 42;` from an async function automatically wraps it in `Promise.resolve(42)`.',
      code: 'async function getNumber() { return 42; }\ngetNumber().then(n => console.log(n)); // 42',
    },
  ],

  mistakes: [
    {
      id: 'missing-await-keyword',
      title: '1. Forgetting the await keyword on a Promise call',
      badge: 'Unresolved Promise Trap',
      badCode: `async function run() {\n  const user = fetchUser(); // ⚠️ Missing await! user holds [object Promise], not data\n  console.log(user.name); // undefined\n}`,
      fixCode: `async function run() {\n  const user = await fetchUser(); // ✅ Waits for resolution\n  console.log(user.name); // "Vaishnavi"\n}`,
      explanation: 'Without await, the function receives the pending Promise object immediately instead of the resolved data payload.',
    },
    {
      id: 'sequential-await-bottleneck',
      title: '2. Unnecessary sequential awaiting of independent requests',
      badge: 'Performance Bottleneck',
      badCode: `// Takes 200ms + 200ms = 400ms\nconst user = await fetchUser();\nconst config = await fetchConfig();`,
      fixCode: `// Takes only 200ms total (Parallel)\nconst [user, config] = await Promise.all([fetchUser(), fetchConfig()]);`,
      explanation: 'If request B does not depend on the result of request A, execute them concurrently using Promise.all to avoid artificial network waterfalls.',
    },
  ],

  takeaways: [
    'async functions automatically wrap their return values in a Promise.',
    'await pauses execution of the local async function until the Promise resolves or rejects.',
    'await does NOT block the main JavaScript thread or freeze user interactions.',
    'Use standard try / catch blocks for clean, readable error handling.',
    'Use Promise.all() to run independent asynchronous operations concurrently.',
  ],
};
