export const WEB_APIS_CONTENT = {
  meta: {
    title: 'Web APIs',
    category: 'Browser',
    subtitle: 'Browser-provided platform capabilities: Fetch, Web Storage, Timers, and URL utilities.',
    readTime: '6 min read',
    prerequisites: ['Promises', 'Async / Await', 'DOM'],
  },

  idea: {
    heading: 'The Platform Beyond JavaScript Core',
    summary: 'The ECMAScript specification defines JavaScript language syntax (variables, functions, objects), but features like network requests (`fetch`), persistent storage (`localStorage`), and timers (`setTimeout`) are Web APIs provided by the host browser environment.',
    bulletPoints: [
      'Fetch API: Modern Promise-based HTTP client for requesting data from REST/JSON endpoints.',
      'Web Storage API: Client-side key-value persistence across sessions (`localStorage` vs `sessionStorage`).',
      'Timers & Scheduling: `setTimeout`, `setInterval`, and `requestAnimationFrame`.',
      'URL API: Parse, construct, and query URL parameters without manual string manipulation.',
    ],
  },

  apiCatalog: [
    {
      name: 'Fetch API (Networking)',
      syntax: 'fetch(url, options)',
      desc: 'Performs asynchronous HTTP requests. Returns a Promise resolving to a Response object.',
      example: `const res = await fetch("https://api.example.com/data");\nconst data = await res.json();`,
    },
    {
      name: 'localStorage (Persistent Storage)',
      syntax: 'localStorage.setItem(key, value)',
      desc: 'Stores key-value strings on the device with NO expiration date until explicitly cleared.',
      example: `localStorage.setItem("theme", "dark");\nconst theme = localStorage.getItem("theme");`,
    },
    {
      name: 'sessionStorage (Tab-Scoped Storage)',
      syntax: 'sessionStorage.setItem(key, value)',
      desc: 'Stores key-value strings for the duration of the browser tab session (cleared when tab closes).',
      example: `sessionStorage.setItem("cartId", "c123");`,
    },
    {
      name: 'setTimeout (Timers)',
      syntax: 'setTimeout(callback, delay)',
      desc: 'Schedules a callback to run after a minimum delay; it does not run immediately or block JavaScript.',
      example: `setTimeout(() => console.log("Later"), 0);\nconsole.log("Now");`,
    },
    {
      name: 'URL & URLSearchParams',
      syntax: 'new URLSearchParams(window.location.search)',
      desc: 'Clean object-oriented manipulation of query parameters (?q=js&sort=new).',
      example: `const params = new URLSearchParams("?category=fundamentals");\nconsole.log(params.get("category")); // "fundamentals"`,
    },
    {
      name: 'Console API (Debugging)',
      syntax: 'console.log(value)',
      desc: 'Writes diagnostic messages and structured data to the browser developer console.',
      example: `console.log("Loaded", { count: 3 });\nconsole.error("Request failed");`,
    },
  ],

  importantRules: [
    {
      title: 'Fetch Does NOT Reject on HTTP 404/500 Errors',
      desc: 'A fetch Promise only rejects on network failure (e.g. offline, DNS failure). It resolves normally for HTTP 404 or 500 status codes. Always check `if (!response.ok)`!',
      code: 'const res = await fetch("/api");\nif (!res.ok) throw new Error(`HTTP Error ${res.status}`);',
    },
    {
      title: 'localStorage Stores Strings Only',
      desc: 'Attempting to store an object directly converts it to the string `"[object Object]"`. Always serialize with `JSON.stringify()` and deserialize with `JSON.parse()`.',
      code: 'localStorage.setItem("user", JSON.stringify({ name: "Vaishnavi" }));\nconst user = JSON.parse(localStorage.getItem("user"));',
    },
    {
      title: '5MB Storage Quota per Domain',
      desc: 'Web Storage is synchronous and capped at approximately 5MB per origin. For large offline data, use IndexedDB instead.',
      code: '// Keep localStorage lean: tokens, settings, preferences',
    },
  ],

  mistakes: [
    {
      id: 'fetch-not-checking-ok',
      title: '1. Assuming fetch rejected on HTTP 404 or 500',
      badge: 'Silent Network Bug',
      badCode: `try {\n  const res = await fetch("/non-existent");\n  const data = await res.json(); // ⚠️ Runs anyway and attempts to parse 404 HTML body!\n} catch (err) { /* Not reached on 404 */ }`,
      fixCode: `const res = await fetch("/non-existent");\nif (!res.ok) throw new Error("HTTP error " + res.status); // ✅ Explicit check\nconst data = await res.json();`,
      explanation: 'The fetch specification only rejects when the network request cannot physically complete (e.g. device offline). HTTP error status codes are valid HTTP responses.',
    },
    {
      id: 'storing-objects-in-localstorage',
      title: '2. Storing objects in localStorage without JSON.stringify',
      badge: 'Data Corruption',
      badCode: `localStorage.setItem("profile", { id: 1 });\nconsole.log(localStorage.getItem("profile")); // "[object Object]" 😱`,
      fixCode: `localStorage.setItem("profile", JSON.stringify({ id: 1 })); // ✅ Serialized\nconst profile = JSON.parse(localStorage.getItem("profile"));`,
      explanation: 'Web Storage only accepts string values. Passing an object invokes .toString(), permanently destroying the properties.',
    },
  ],

  takeaways: [
    'Web APIs are browser platform capabilities provided in addition to core JS syntax.',
    'Always verify response.ok when using the Fetch API before parsing JSON.',
    'localStorage persists indefinitely; sessionStorage clears when the tab is closed.',
    'Always use JSON.stringify() when saving objects into Web Storage.',
    'Use URLSearchParams to safely inspect and manipulate query parameters.',
  ],
};
