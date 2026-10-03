export const EVENT_LOOP_CONTENT = {
  meta: {
    title: 'Event Loop',
    category: 'Async JavaScript',
    subtitle: 'How single-threaded JavaScript executes non-blocking asynchronous operations.',
    readTime: '6 min read',
    prerequisites: ['Callbacks', 'Promises', 'Async / Await'],
  },

  idea: {
    heading: 'The Non-Blocking Concurrency Model',
    summary: 'JavaScript has a single Call Stack and executes one command at a time. The Event Loop is the background conductor that constantly monitors the Call Stack: when the stack is empty, it pulls pending callbacks from the Task Queue and Microtask Queue and pushes them onto the Call Stack to execute.',
    bulletPoints: [
      'Call Stack: Synchronous LIFO (Last-In-First-Out) execution frame where functions run.',
      'Web APIs: Browser background threads handling timers, network requests (fetch), and DOM events.',
      'Microtask Queue (High Priority): Promise callbacks (.then, .catch, queueMicrotask). Checked immediately after every stack frame.',
      'Macrotask Queue (Standard Priority): setTimeout, setInterval, I/O, UI rendering events.',
    ],
  },

  components: [
    {
      name: '1. Call Stack',
      role: 'Synchronous Execution',
      desc: 'Single thread where JavaScript code executes sequentially. When a function is called, it is pushed onto the stack; when it returns, it is popped off.',
    },
    {
      name: '2. Web APIs',
      role: 'Browser Background Workers',
      desc: 'Provided by the browser environment (not JS engine itself) to handle timers, network requests, and DOM listeners in parallel background threads.',
    },
    {
      name: '3. Microtask & Task Queues',
      role: 'Waiting Room for Callbacks',
      desc: 'Completed background tasks deposit their callbacks here. Microtasks (Promises) always have strict priority over Macrotasks (setTimeout).',
    },
    {
      name: '4. The Event Loop',
      role: 'Queue-to-Stack Dispatcher',
      desc: 'A continuous loop that checks: "Is the Call Stack empty?". If yes, it dequeues the next callback and pushes it onto the Call Stack.',
    },
  ],

  classicExample: {
    code: `console.log("A");\n\nsetTimeout(() => {\n  console.log("B");\n}, 0);\n\nconsole.log("C");`,
    output: `A\nC\nB`,
    explanation: '1. "A" logs synchronously. 2. setTimeout schedules the timer with Web APIs and immediately pops off the stack. 3. "C" logs synchronously. 4. Call Stack becomes empty. 5. Event Loop pulls "B" from the task queue into the stack. 6. "B" logs.',
  },

  importantRules: [
    {
      title: 'Microtasks (Promises) Always Beat Macrotasks (Timers)',
      desc: 'Before the event loop processes any `setTimeout` or `setInterval` task, it completely drains the entire Microtask Queue (Promise `.then` callbacks).',
      code: 'setTimeout(() => console.log("Timeout"), 0);\nPromise.resolve().then(() => console.log("Promise"));\n// Logs: "Promise" then "Timeout"',
    },
    {
      title: 'setTimeout(fn, 0) Does Not Mean Immediate',
      desc: '0ms is the minimum delay before the callback is placed into the task queue. It will NEVER execute until the Call Stack has completely cleared.',
      code: '// Even with 0ms, it waits for all current synchronous code',
    },
    {
      title: 'Never Block the Call Stack',
      desc: 'Running a heavy synchronous loop (e.g. while(true)) freezes the Call Stack. The Event Loop cannot run, blocking UI rendering, clicks, and animations.',
      code: '// Keep compute tasks lightweight or offload to Web Workers',
    },
  ],

  mistakes: [
    {
      id: 'blocking-the-event-loop',
      title: '1. Heavy synchronous computation freezing the page',
      badge: 'UI Freeze Crash',
      badCode: `function processHugeArray() {\n  // ❌ Blocks the single thread for 5 seconds:\n  for (let i = 0; i < 1e9; i++) { ... }\n}`,
      fixCode: `// ✅ Split across ticks with requestAnimationFrame or Web Workers\nfunction processChunked() { ... }`,
      explanation: 'Because JavaScript is single-threaded, a long-running synchronous function locks the Call Stack and prevents the Event Loop from servicing UI repaints or user clicks.',
    },
    {
      id: 'settimeout-delay-assumption',
      title: '2. Assuming setTimeout guarantees exact millisecond timing',
      badge: 'Timing Drift',
      badCode: `// Expecting exact execution at 1000ms:\nsetTimeout(renderClock, 1000);`,
      fixCode: `// Understand that 1000ms is the MINIMUM delay before queueing.`,
      explanation: 'The timer parameter specifies the minimum wait time before the callback is enqueued. If the Call Stack is busy, execution will be delayed.',
    },
  ],

  takeaways: [
    'JavaScript is single-threaded: it has one Call Stack and runs one task at a time.',
    'Asynchronous tasks (timers, fetch) are handled in parallel by Browser Web APIs.',
    'Microtasks (Promises) always execute before Macrotasks (setTimeout / setInterval).',
    'The Event Loop only pushes callbacks to the stack when the Call Stack is completely empty.',
    'Never run heavy synchronous loops on the main thread to avoid freezing the browser.',
  ],
};
