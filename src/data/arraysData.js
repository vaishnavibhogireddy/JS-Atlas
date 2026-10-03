export const ARRAYS_CONTENT = {
  meta: {
    title: 'Arrays',
    category: 'Functions & Data',
    subtitle: 'Ordered data collections, zero-based indexing, and essential higher-order transformations.',
    readTime: '6 min read',
    prerequisites: ['Data Types', 'Functions'],
  },

  idea: {
    heading: 'Indexed Sequential Memory',
    summary: 'Arrays in JavaScript are ordered lists of values indexed by integers starting at 0. They are dynamic, can hold any combination of data types, and come with powerful built-in methods for data transformation.',
    bulletPoints: [
      'Zero-indexed: first element is at index 0, last element is at array.length - 1.',
      'Immutable transformation methods (.map, .filter, .reduce, .slice) produce new arrays.',
      'Mutating methods (.push, .pop, .shift, .unshift, .splice, .sort) modify the original array in place.',
    ],
  },

  methodGroups: [
    {
      group: 'Adding & Removing Elements (Mutating)',
      methods: [
        { name: 'push(val)', desc: 'Appends to end of array (returns new length)' },
        { name: 'pop()', desc: 'Removes and returns the last element' },
        { name: 'unshift(val)', desc: 'Prepends to beginning of array' },
        { name: 'shift()', desc: 'Removes and returns the first element' },
        { name: 'splice(start, count, ...items)', desc: 'Adds/removes elements at specific index' },
      ],
    },
    {
      group: 'Transformations (Non-Mutating / Pure)',
      methods: [
        { name: 'map(fn)', desc: 'Transforms every element into a new array of same length' },
        { name: 'filter(fn)', desc: 'Keeps elements that pass a boolean test condition' },
        { name: 'reduce(fn, init)', desc: 'Accumulates array elements into a single computed value' },
        { name: 'slice(start, end)', desc: 'Extracts a shallow copy slice without modifying original' },
        { name: 'concat(arr2)', desc: 'Merges arrays together into a new array' },
      ],
    },
    {
      group: 'Searching & Querying',
      methods: [
        { name: 'includes(val)', desc: 'Returns true if element exists in array' },
        { name: 'indexOf(val)', desc: 'Returns first index of item, or -1 if missing' },
        { name: 'find(fn)', desc: 'Returns first element matching predicate function' },
        { name: 'findIndex(fn)', desc: 'Returns index of first element matching predicate' },
        { name: 'some(fn) / every(fn)', desc: 'Checks if at least one / all elements pass test' },
      ],
    },
  ],

  transformations: [
    {
      name: 'map() — 1-to-1 Transform',
      input: '[1, 2, 3]',
      operation: 'x => x * 2',
      output: '[2, 4, 6]',
      desc: 'Creates a new array of identical length by calling a transform callback on every item.',
    },
    {
      name: 'filter() — Conditional Subset',
      input: '[1, 2, 3, 4]',
      operation: 'x => x % 2 === 0',
      output: '[2, 4]',
      desc: 'Creates a new array containing only the elements that return truthy from the test callback.',
    },
    {
      name: 'reduce() — Accumulate into Single Value',
      input: '[1, 2, 3]',
      operation: '(acc, cur) => acc + cur, 0',
      output: '6',
      desc: 'Passes an accumulator value across the array to produce a single aggregated number, object, or string.',
    },
  ],

  importantRules: [
    {
      title: 'Array.prototype.sort() Converts to Strings by Default',
      desc: 'Without a comparator function, `.sort()` converts numbers to strings. `[10, 2, 5].sort()` gives `[10, 2, 5]` because "10" comes before "2" alphabetically.',
      code: '[10, 2, 5].sort((a, b) => a - b); // ✅ Correct numeric sort [2, 5, 10]',
    },
    {
      title: 'Distinguish Mutating vs. Pure Methods',
      desc: 'In modern state architectures (like React), avoid mutating methods (.push, .splice, .reverse). Use non-mutating methods or the spread operator `[...arr]`.',
      code: 'const updated = [...items, newItem]; // Pure append',
    },
    {
      title: 'Array.isArray() Verification',
      desc: 'Remember that `typeof []` returns `"object"`. Always use `Array.isArray(arr)` to test for array types.',
      code: 'Array.isArray([1, 2]); // true\nArray.isArray({}); // false',
    },
  ],

  mistakes: [
    {
      id: 'default-sort-bug',
      title: '1. Sorting numbers without a comparator function',
      badge: 'Sorting Bug',
      badCode: `const scores = [100, 25, 5, 1];\nscores.sort(); // ❌ Returns [1, 100, 25, 5] (Alphabetical order!)`,
      fixCode: `const scores = [100, 25, 5, 1];\nscores.sort((a, b) => a - b); // ✅ Returns [1, 5, 25, 100]`,
      explanation: 'Array.prototype.sort converts all elements to strings before comparing their UTF-16 code unit values. Always supply `(a, b) => a - b` for numbers.',
    },
    {
      id: 'mutating-state-array',
      title: '2. Mutating arrays directly in state management',
      badge: 'Reference Immutability',
      badCode: `const items = ["a", "b"];\nitems.push("c"); // ⚠️ Mutates original array in place`,
      fixCode: `const items = ["a", "b"];\nconst newItems = [...items, "c"]; // ✅ Creates clean new reference`,
      explanation: 'Mutating an array does not create a new memory reference. React or state watchers will fail to detect updates when memory pointers are identical.',
    },
    {
      id: 'empty-slot-sparse-array',
      title: '3. Creating sparse arrays with empty slots',
      badge: 'Sparse Array Trap',
      badCode: `const arr = new Array(3); // [ <3 empty slots> ] (map & forEach will skip these!)`,
      fixCode: `const arr = Array.from({ length: 3 }, () => 0); // ✅ [0, 0, 0] properly initialized`,
      explanation: '`new Array(3)` creates empty slots rather than initialized undefined entries. Array traversal methods like map() and forEach() completely skip empty slots.',
    },
  ],

  takeaways: [
    'Arrays are zero-indexed ordered collections with a dynamic .length property.',
    'Prefer non-mutating methods (.map, .filter, .slice, spread [...arr]) for predictability.',
    'Always provide a comparator callback `(a, b) => a - b` when sorting numbers with .sort().',
    'Use .reduce() for aggregation, .map() for 1-to-1 transforms, and .filter() for subsets.',
    'Use Array.isArray(val) instead of typeof to reliably detect arrays.',
  ],
};
