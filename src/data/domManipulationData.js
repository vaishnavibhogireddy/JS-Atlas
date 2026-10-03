export const DOM_MANIPULATION_CONTENT = {
  meta: {
    title: 'DOM Manipulation',
    category: 'Browser',
    subtitle: 'Select, read, update, style, create, and remove document elements dynamically.',
    readTime: '6 min read',
    prerequisites: ['DOM', 'Functions'],
  },

  idea: {
    heading: 'The 4-Step DOM Lifecycle',
    summary: 'DOM manipulation allows JavaScript to update webpage content, toggle styles, and construct interactive user interfaces without full page reloads.',
    bulletPoints: [
      '1. SELECT: `document.querySelector(".card")` or `document.getElementById("btn")`.',
      '2. READ / UPDATE: `.textContent`, `.innerHTML`, `.getAttribute()`, `.setAttribute()`.',
      '3. STYLE: `.classList.add()`, `.classList.toggle()`, `.style.color = "blue"`.',
      '4. CREATE / REMOVE: `document.createElement("li")`, `.append()`, `.remove()`.',
    ],
  },

  selectionMethods: [
    {
      method: 'document.querySelector(selector)',
      returns: 'First matching Element (or null)',
      desc: 'Accepts any standard CSS selector (.class, #id, tag, [attr]). Modern standard.',
    },
    {
      method: 'document.querySelectorAll(selector)',
      returns: 'Static NodeList of all matching elements',
      desc: 'Can be iterated directly with .forEach() or converted to Array with [...list].',
    },
    {
      method: 'document.getElementById(id)',
      returns: 'Single Element by ID (or null)',
      desc: 'Fast lookup optimized specifically for unique ID attributes.',
    },
  ],

  mutationPatterns: [
    {
      action: 'Update Text Content',
      code: 'element.textContent = "New Heading";',
      note: 'Safe from XSS injection attacks. Replaces text inside element.',
    },
    {
      action: 'Toggle CSS Classes',
      code: 'element.classList.toggle("active");\nelement.classList.add("highlight");',
      note: 'Best practice for styling: toggle classes rather than inline style strings.',
    },
    {
      action: 'Create and Mount Elements',
      code: 'const item = document.createElement("li");\nitem.textContent = "New Item";\nlist.append(item);',
      note: 'Constructs a node in memory before mounting it onto the DOM tree.',
    },
    {
      action: 'Remove Elements',
      code: 'element.remove();',
      note: 'Directly unmounts the element and its children from the live document.',
    },
  ],

  importantRules: [
    {
      title: 'Prefer textContent over innerHTML for User Data',
      desc: '`innerHTML` parses strings as HTML, exposing your app to dangerous Cross-Site Scripting (XSS) attacks if user input is injected. Use `textContent` for plain text.',
      code: '// Safe:\nuserCard.textContent = userInput;\n// Danger (XSS Risk):\n// userCard.innerHTML = userInput;',
    },
    {
      title: 'classList vs. inline styles',
      desc: 'Prefer `element.classList.add("dark")` over `element.style.background = "#000"`. Keeping visual styling rules inside CSS files maintains separation of concerns.',
      code: 'button.classList.toggle("is-active");',
    },
    {
      title: 'Batch DOM Updates / Reflow Cost',
      desc: 'Repeatedly appending elements in a loop triggers multiple browser layout recalculations (reflows). Use `DocumentFragment` or batch append `container.append(...items)`.',
      code: 'const frag = document.createDocumentFragment();',
    },
  ],

  mistakes: [
    {
      id: 'innerhtml-xss-security',
      title: '1. Using innerHTML with unescaped user input',
      badge: 'Security Vulnerability (XSS)',
      badCode: `const comment = getCommentFromUser();\nbox.innerHTML = "<p>" + comment + "</p>"; // 💥 Allows malicious <script> or <img onerror> injection!`,
      fixCode: `const p = document.createElement("p");\np.textContent = getCommentFromUser(); // ✅ Safely treated strictly as characters\nbox.append(p);`,
      explanation: 'innerHTML evaluates raw strings as executable markup. Malicious users can inject scripts that steal session cookies or credentials.',
    },
    {
      id: 'queryselectorall-array-methods',
      title: '2. Assuming NodeList has all Array methods (.map, .filter)',
      badge: 'TypeError on NodeList',
      badCode: `const buttons = document.querySelectorAll("button");\nbuttons.map(b => b.textContent); // ❌ TypeError: buttons.map is not a function`,
      fixCode: `const buttons = [...document.querySelectorAll("button")]; // ✅ Spread into real Array\nbuttons.map(b => b.textContent);`,
      explanation: 'querySelectorAll returns a NodeList (not an Array). NodeList has .forEach(), but lacks .map, .filter, .reduce. Convert with `Array.from()` or spread `[...list]`.',
    },
  ],

  takeaways: [
    'Use querySelector and querySelectorAll with standard CSS selectors.',
    'Use textContent for safe text insertion to prevent XSS injection vulnerabilities.',
    'Use classList (add, remove, toggle) for clean class-driven style mutations.',
    'Create elements in memory with document.createElement() before calling .append().',
    'Spread NodeList [...nodes] when you need full array methods like .map and .filter.',
  ],
};
