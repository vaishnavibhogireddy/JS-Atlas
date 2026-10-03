export const VARIABLES_CONTENT = {
  meta: {
    title: 'Variables',
    category: 'Fundamentals',
    subtitle: 'Store, name, and change values in JavaScript.',
    readTime: '4 min read',
    prerequisites: ['None — Starting point'],
  },

  // 1. Quick Idea
  idea: {
    heading: 'The idea',
    summary: 'A variable is a named label pointing to a slot in computer memory where a value is stored. Instead of remembering the raw memory location or repeating values everywhere, you give the value a meaningful name and refer to it whenever needed.',
    metaphor: {
      label: 'name',
      pointer: 'points to',
      value: '"Vaishnavi"',
      type: 'String',
      memoryAddr: '0x7FFD2B',
    },
    bulletPoints: [
      'Variables act as labeled containers for data.',
      'Code reads from or writes to the memory slot using this label.',
      'The label remains constant, but the stored value can change (if permitted).'
    ]
  },

  // 2. Declaration vs Assignment
  declarationVsAssignment: {
    heading: 'Declaration vs. Assignment',
    subtitle: 'Two distinct phases that can happen separately or together.',
    steps: [
      {
        id: 'declaration',
        title: '1. Declaration',
        code: 'let age;',
        badge: 'Reserves Name',
        explanation: 'Tells the JavaScript engine to allocate memory and reserve the identifier `age`. Before any value is stored, its value is automatically `undefined`.',
        memoryState: { name: 'age', value: 'undefined', status: 'declared' },
      },
      {
        id: 'assignment',
        title: '2. Assignment',
        code: 'age = 20;',
        badge: 'Stores Value',
        explanation: 'Uses the assignment operator (`=`) to place a concrete value into the already declared memory slot.',
        memoryState: { name: 'age', value: '20', status: 'assigned' },
      },
      {
        id: 'combined',
        title: '3. Declaration + Assignment',
        code: 'let age = 20;',
        badge: 'Initialization',
        explanation: 'The most common idiom: declares the variable and assigns its initial value in a single, clean statement.',
        memoryState: { name: 'age', value: '20', status: 'initialized' },
      },
    ],
  },

  // 3. Let / Const / Var
  keywords: [
    {
      keyword: 'let',
      badge: 'Modern Standard',
      badgeColor: 'border-sky-500/50 text-sky-400 bg-sky-950/60',
      tagline: 'Use when the value is expected to change over time.',
      properties: [
        { label: 'Scope', value: 'Block scoped ({ ... })', status: 'good' },
        { label: 'Reassignment', value: 'Allowed (age = 21)', status: 'good' },
        { label: 'Redeclaration', value: 'Forbidden in same scope', status: 'safe' },
        { label: 'TDZ / Hoisting', value: 'Temporal Dead Zone enforced', status: 'safe' },
      ],
      codeExample: `let score = 0;\nscore = 10; // ✅ Allowed`,
      recommendation: 'Use when you know the variable value will update (counters, state, accumulators).',
    },
    {
      keyword: 'const',
      badge: 'Default Choice (Recommended)',
      badgeColor: 'border-emerald-500/50 text-emerald-400 bg-emerald-950/60',
      tagline: 'Use by default for every variable unless you explicitly need reassignment.',
      properties: [
        { label: 'Scope', value: 'Block scoped ({ ... })', status: 'good' },
        { label: 'Reassignment', value: 'Forbidden (TypeError)', status: 'strict' },
        { label: 'Redeclaration', value: 'Forbidden in same scope', status: 'safe' },
        { label: 'Must Initialize', value: 'Required at declaration time', status: 'strict' },
      ],
      codeExample: `const apiKey = "xyz-123";\n// apiKey = "new"; ❌ TypeError`,
      recommendation: 'Make const your default choice to prevent accidental reassignments and keep code predictable.',
    },
    {
      keyword: 'var',
      badge: 'Legacy (Avoid in new code)',
      badgeColor: 'border-rose-500/50 text-rose-400 bg-rose-950/60',
      tagline: 'Original JavaScript keyword from 1995 with confusing scoping quirks.',
      properties: [
        { label: 'Scope', value: 'Function or Global (Ignores blocks)', status: 'warn' },
        { label: 'Reassignment', value: 'Allowed', status: 'good' },
        { label: 'Redeclaration', value: 'Allowed (silently overwrites)', status: 'warn' },
        { label: 'Hoisting', value: 'Hoisted as undefined (causes bugs)', status: 'warn' },
      ],
      codeExample: `var user = "Dan";\nvar user = "Sam"; // ⚠️ Silently allowed!`,
      recommendation: 'Avoid in modern codebases. Prefer let and const for safer lexical scoping.',
    },
  ],

  // 5. Naming Variables
  naming: {
    heading: 'Naming Variables',
    rules: [
      {
        rule: 'Use camelCase for standard variables and functions',
        good: 'userName, totalPrice, studentCount, isActive',
        bad: 'user_name, TotalPrice, student_count',
      },
      {
        rule: 'Must start with a letter, underscore (_), or dollar sign ($)',
        good: '_privateId, $element, userCount',
        bad: '123user, 9lives, @email',
      },
      {
        rule: 'Names are strictly case-sensitive',
        note: '`myVariable` and `myvariable` are two completely different variables in memory.',
      },
      {
        rule: 'Avoid single-letter or cryptic names outside short loop counters',
        good: 'const orderItems = [...]',
        bad: 'const x = [...]',
      },
      {
        rule: 'Never use JavaScript reserved keywords',
        bad: 'let, const, function, return, class, typeof',
      }
    ],
  },

  // 6. Important Rules
  importantRules: [
    {
      title: 'Block Scoped',
      desc: '`let` and `const` only exist inside the `{ curly braces }` where they were declared.',
      code: 'if (true) { let local = 5; } // local is not accessible outside',
    },
    {
      title: 'const Prevents Rebinding',
      desc: '`const` locks the identifier binding. (Note: objects declared with `const` can still have their internal properties mutated).',
      code: 'const list = [1, 2]; list.push(3); // ✅ Mutating items is allowed',
    },
    {
      title: 'Case-Sensitive Identifiers',
      desc: '`score`, `Score`, and `SCORE` are three distinct variables.',
      code: 'let score = 10; let Score = 20; // Two different memory slots',
    },
    {
      title: 'Dynamic Typing',
      desc: 'A variable created with `let` can hold a number now and a string later, although keeping types consistent is best practice.',
      code: 'let val = 42; val = "now a string"; // Valid JS',
    },
    {
      title: 'Descriptive Intent',
      desc: 'Variable names should clearly reveal what value they hold and their business purpose.',
      code: 'const daysUntilDeadline = 14; // Intent is obvious',
    },
    {
      title: 'Default to const',
      desc: 'Declare everything with `const` first. Change to `let` only when you need reassignment.',
      code: 'const PI = 3.14159; let currentLap = 1;',
    },
  ],

  // 7. Common Mistakes
  mistakes: [
    {
      id: 'reassign-const',
      title: '1. Reassigning a const variable',
      badge: 'TypeError',
      severity: 'high',
      badCode: `const age = 20;\nage = 21; // ❌ TypeError: Assignment to constant variable.`,
      fixCode: `let age = 20;\nage = 21; // ✅ Use 'let' when the value needs to change.`,
      explanation: 'Once a `const` variable is bound to a memory address, you cannot reassign it to a new value. If a value is dynamic, use `let`.',
    },
    {
      id: 'tdz-access',
      title: '2. Accessing a variable before its declaration (TDZ)',
      badge: 'ReferenceError',
      severity: 'high',
      badCode: `console.log(score); // ❌ ReferenceError: Cannot access 'score' before initialization\nlet score = 10;`,
      fixCode: `let score = 10;\nconsole.log(score); // ✅ Always declare variables before reading them.`,
      explanation: 'Variables declared with `let` and `const` enter the Temporal Dead Zone (TDZ) from the start of the block until the declaration line is executed.',
    },
    {
      id: 'var-leak',
      title: '3. Leaking variable scope with var',
      badge: 'Bug Hazard',
      severity: 'medium',
      badCode: `if (true) {\n  var secret = "leaked";\n}\nconsole.log(secret); // ⚠️ "leaked" (var escapes block scope!)`,
      fixCode: `if (true) {\n  let secret = "shielded";\n}\n// secret is safely contained inside the if-block.`,
      explanation: '`var` ignores `{ block }` boundaries and attaches to the outer function or global window, causing unpredictable bugs and variable collisions.',
    },
    {
      id: 'uninitialized-const',
      title: '4. Declaring const without an initial value',
      badge: 'SyntaxError',
      severity: 'high',
      badCode: `const total; // ❌ SyntaxError: Missing initializer in const declaration`,
      fixCode: `const total = 100; // ✅ const must always receive a value immediately.`,
      explanation: 'Because `const` can never be reassigned later, JavaScript strictly requires an initial value at the time of declaration.',
    },
  ],

  // 8. Mini Example Walkthrough
  miniExample: {
    code: `const name = "Vaishnavi";\nlet age = 19;\n\nage = 20;`,
    steps: [
      {
        line: 1,
        code: 'const name = "Vaishnavi";',
        action: 'Creates an immutable binding `name` holding the string "Vaishnavi". This binding cannot be reassigned.',
        memory: [
          { name: 'name', type: 'const (string)', val: '"Vaishnavi"', status: 'locked' }
        ]
      },
      {
        line: 2,
        code: 'let age = 19;',
        action: 'Creates a mutable binding `age` initialized with number 19. It can be modified later.',
        memory: [
          { name: 'name', type: 'const (string)', val: '"Vaishnavi"', status: 'locked' },
          { name: 'age', type: 'let (number)', val: '19', status: 'mutable' }
        ]
      },
      {
        line: 3,
        code: 'age = 20;',
        action: 'Reassigns the existing `age` memory slot to 20. The name variable remains untouched.',
        memory: [
          { name: 'name', type: 'const (string)', val: '"Vaishnavi"', status: 'locked' },
          { name: 'age', type: 'let (number)', val: '20', status: 'updated' }
        ]
      }
    ],
    explanation: 'In 3 concise lines: we define an unchangeable identity (`name`) using `const`, track a dynamic attribute (`age`) using `let`, and then update that state over time with reassignment.',
  },

  // 9. Know This Before Moving On
  takeaways: [
    'A variable is a human-friendly name pointing to a value in memory.',
    'Declaration reserves the identifier name; Assignment stores the value.',
    'Use `const` by default for predictable, reassign-proof bindings.',
    'Use `let` only when you explicitly need to update or reassign a variable.',
    'Avoid `var` in modern JavaScript to eliminate scope leakage bugs.',
    '`let` and `const` are block scoped to `{ ... }` curly braces.',
    'Follow camelCase naming rules and choose clear, descriptive names.',
  ],
};
