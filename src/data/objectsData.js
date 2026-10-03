export const OBJECTS_CONTENT = {
  meta: {
    title: 'Objects',
    category: 'Functions & Data',
    subtitle: 'Store structured entities with key-value dictionaries, methods, and destructuring.',
    readTime: '6 min read',
    prerequisites: ['Data Types', 'Functions'],
  },

  idea: {
    heading: 'The Core Dictionary of JavaScript',
    summary: 'Objects are collections of key-value pairs (properties and methods). Keys are strings or symbols, and values can be any JavaScript data type. Objects represent complex real-world entities and are the foundation of almost everything in JavaScript.',
    bulletPoints: [
      'Dot notation (`obj.key`) for known static keys; Bracket notation (`obj[key]`) for dynamic variables.',
      'Objects are reference types: assigning an object assigns a pointer, not a clone.',
      'Modern syntax includes property shorthand, destructuring, and Object static utilities.',
    ],
  },

  accessPatterns: [
    {
      title: 'Dot Notation',
      syntax: 'user.name',
      useCase: 'Cleanest syntax when property name is a known, valid identifier.',
      code: 'const user = { name: "Vaishnavi" };\nconsole.log(user.name); // "Vaishnavi"',
    },
    {
      title: 'Bracket Notation',
      syntax: 'user[dynamicKey]',
      useCase: 'Mandatory when key contains spaces, special characters, or comes from a variable.',
      code: 'const key = "city";\nconst user = { city: "Bhimavaram", "user-role": "admin" };\nconsole.log(user[key]); // "Bhimavaram"\nconsole.log(user["user-role"]); // "admin"',
    },
    {
      title: 'Destructuring & Renaming',
      syntax: 'const { name, age: userAge } = user;',
      useCase: 'Extracts properties directly into local variables with optional renaming and defaults.',
      code: 'const { name, role = "user" } = { name: "Sam" };',
    },
  ],

  staticUtilities: [
    {
      name: 'Object.keys(obj)',
      returns: 'Array of property keys: ["name", "age", "city"]',
      desc: 'Extracts all own enumerable string-keyed property names.',
    },
    {
      name: 'Object.values(obj)',
      returns: 'Array of values: ["Vaishnavi", 19, "Bhimavaram"]',
      desc: 'Extracts all own property values in iteration order.',
    },
    {
      name: 'Object.entries(obj)',
      returns: 'Array of [key, value] pairs: [["name", "Vaishnavi"], ...]',
      desc: 'Ideal for iterating through objects with for...of or Object.fromEntries.',
    },
    {
      name: 'Object.assign(target, ...sources)',
      returns: 'Mutated target object with copied properties',
      desc: 'Merges sources into target (or spread `{ ...obj1, ...obj2 }`).',
    },
  ],

  importantRules: [
    {
      title: 'Objects are Stored by Reference',
      desc: 'Comparing two objects `{}` === `{}` is always `false` because they occupy different addresses in memory.',
      code: 'const a = { id: 1 }; const b = { id: 1 };\na === b; // false (Different memory addresses)',
    },
    {
      title: 'const Objects are Still Mutable',
      desc: '`const` prevents reassigning the variable pointer to a new object, but internal properties can still be modified, added, or deleted.',
      code: 'const config = { mode: "dev" };\nconfig.mode = "prod"; // ✅ Allowed\n// config = {}; ❌ TypeError',
    },
    {
      title: 'Property Shorthand',
      desc: 'When variable name matches the property key name, you can omit the redundant value declaration.',
      code: 'const name = "Dan"; const user = { name }; // Same as { name: name }',
    },
  ],

  mistakes: [
    {
      id: 'shallow-copy-nesting',
      title: '1. Assuming Spread ({...obj}) is a Deep Clone',
      badge: 'Shallow Clone Bug',
      badCode: `const user = { name: "Alex", settings: { theme: "dark" } };\nconst clone = { ...user };\nclone.settings.theme = "light"; // ⚠️ Mutates original user.settings too!`,
      fixCode: `const user = { name: "Alex", settings: { theme: "dark" } };\nconst deepClone = structuredClone(user); // ✅ True deep clone\ndeepClone.settings.theme = "light";`,
      explanation: 'The spread operator `{ ...obj }` creates a shallow copy. Nested child objects still share the exact same memory references.',
    },
    {
      id: 'dot-notation-variable',
      title: '2. Using dot notation with dynamic variable keys',
      badge: 'Key Lookup Bug',
      badCode: `const prop = "score";\nconst stats = { score: 100 };\nconsole.log(stats.prop); // ❌ Looks for literal key "prop", returns undefined!`,
      fixCode: `const prop = "score";\nconst stats = { score: 100 };\nconsole.log(stats[prop]); // ✅ Looks up value of variable prop ("score") -> 100`,
      explanation: 'Dot notation treats the word after the dot as a literal string key name. To use a variable dynamically as a key, use bracket notation `obj[varName]`.',
    },
    {
      id: 'checking-property-existence',
      title: '3. Checking property existence with if (obj.prop)',
      badge: 'Falsy Property Bug',
      badCode: `const item = { count: 0 };\nif (item.count) { /* ❌ Fails because 0 is falsy! */ }`,
      fixCode: `const item = { count: 0 };\nif ("count" in item) { /* ✅ Accurately tests property existence */ }`,
      explanation: 'Checking truthiness fails if the property exists but holds a falsy value (0, "", false, null). Use the `"key" in obj` operator or `Object.hasOwn(obj, "key")`.',
    },
  ],

  takeaways: [
    'Objects store structured data as key-value pairs where keys are strings/symbols.',
    'Use dot notation for static property names; use bracket notation for dynamic variable keys.',
    'const objects prevent reassignment of the binding, not mutation of internal properties.',
    'Objects are compared and assigned by memory reference, never by shape or contents.',
    'Use structuredClone() for deep copies and Object.entries() for object iteration.',
  ],
};
