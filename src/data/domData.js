export const DOM_CONTENT = {
  meta: {
    title: 'DOM',
    category: 'Browser',
    subtitle: 'The Document Object Model: the living in-memory tree representation of HTML.',
    readTime: '5 min read',
    prerequisites: ['Objects'],
  },

  idea: {
    heading: 'The Tree Representation of HTML',
    summary: 'When a web browser loads an HTML document, it parses the markup and constructs an interactive, object-oriented tree structure called the Document Object Model (DOM). JavaScript uses this tree to query, inspect, and modify the content and structure of the page.',
    bulletPoints: [
      'The DOM is a hierarchy of Node and Element objects starting from the root `document`.',
      'Nodes include Elements (`<h1>`, `<button>`), Text nodes ("Hello"), and Comments.',
      'The DOM is NOT the static HTML file; it is the living, interactive in-memory browser representation.',
    ],
  },

  domHierarchy: [
    {
      level: 'window',
      desc: 'The global browser execution context and parent of the document.',
    },
    {
      level: 'document',
      desc: 'The entry point and root object representing the loaded webpage.',
    },
    {
      level: '<html> (document.documentElement)',
      desc: 'The root HTML element containing <head> and <body>.',
    },
    {
      level: '<body> (document.body)',
      desc: 'The visible container containing all visible headings, paragraphs, and components.',
    },
  ],

  nodeTypes: [
    {
      name: 'Element Nodes (nodeType 1)',
      desc: 'HTML tags like <div>, <button>, <h1>. Can contain attributes and child nodes.',
      example: 'document.querySelector("h1")',
    },
    {
      name: 'Text Nodes (nodeType 3)',
      desc: 'The literal text content inside HTML elements or between tags.',
      example: 'element.firstChild // Holds text characters',
    },
    {
      name: 'Document Node (nodeType 9)',
      desc: 'The root document interface providing query methods and element creators.',
      example: 'window.document',
    },
  ],

  importantRules: [
    {
      title: 'Nodes vs. Elements',
      desc: 'All Elements are Nodes, but not all Nodes are Elements. Nodes include whitespace text and comments. `children` returns only Element nodes; `childNodes` includes text and comments.',
      code: 'elem.children; // Elements only\nelem.childNodes; // All node types including whitespace',
    },
    {
      title: 'HTML vs. DOM Difference',
      desc: 'HTML is the initial static text string sent from the server. The DOM is the live object graph in browser memory that JavaScript dynamically mutates.',
      code: '// DevTools Elements tab displays the live DOM, not source HTML',
    },
    {
      title: 'Entry Point: document',
      desc: 'All selection and element creation starts at the `document` object.',
      code: 'const btn = document.querySelector("#submit");',
    },
  ],

  mistakes: [
    {
      id: 'running-script-before-dom-ready',
      title: '1. Accessing DOM elements before HTML has parsed',
      badge: 'Null Selector Bug',
      badCode: `<head>\n  <script>\n    // ❌ document.body is not parsed yet, returns null!\n    document.querySelector("h1").textContent = "Hi";\n  </script>\n</head>`,
      fixCode: `<head>\n  <!-- ✅ Use defer or place at end of <body> -->\n  <script defer src="app.js"></script>\n</head>`,
      explanation: 'If a script executes before the browser has parsed the corresponding HTML tags, `querySelector` returns null and attempting to set properties throws a TypeError.',
    },
    {
      id: 'children-vs-childnodes-confusion',
      title: '2. Confusing childNodes (with whitespace) with children',
      badge: 'Whitespace Node Trap',
      badCode: `const first = container.childNodes[0]; // ⚠️ Often returns a text node representing newline whitespace!`,
      fixCode: `const first = container.firstElementChild; // ✅ Always returns the first HTML element tag`,
      explanation: 'Newlines and spaces between HTML tags create Text nodes. Use `firstElementChild` and `children` to target real HTML tags.',
    },
  ],

  takeaways: [
    'The DOM is an object-oriented tree model of HTML parsed into browser memory.',
    'document is the root entry point for finding and creating nodes.',
    'Elements are HTML tags; Nodes also include text content and comments.',
    'Use defer on script tags to ensure the DOM tree is constructed before JavaScript runs.',
  ],
};
