/* eslint-disable */
const overrides = {
  "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],   // Allow importing devDependencies
  "no-param-reassign": ["error", { "props": false }],                            // Allow modifying properties of parameters
  "no-underscore-dangle": "off",                                                 // Allow names like _a
  "global-require": "off",                                                       // Allow require() in local scope
  "object-curly-newline": ["error", { "consistent": true }],                     // Either both braces have newlines or neither does
  "import/no-webpack-loader-syntax": "off",                                      // Allow webpack loader syntax (with !)
  "import/newline-after-import": "off",                                          // Allow code right after import statements
  "import/extensions": "off",                                                    // Allow importing modules without specifying extensions
  "import/order": "off",                                                         // Allow importing modules in any order
  "jsx-a11y/anchor-is-valid": "off",                                             // In Next.js the href goes on the Link wrapper, not on the a tag
  "react/no-danger": "off",                                                      // Allow using dangerouslySetInnerHTML
  "react/jsx-fragments": "off",                                                  // Allow either React Fragment syntax
  "react/jsx-props-no-spreading": "off",                                         // Allow spreading props (like <Component {...props} />)
  "react/jsx-props-no-multi-spaces": "off",                                      // Allow multiple newlines in between props
  "react/no-array-index-key": "off",                                             // Allow using index as key in array
  "no-multiple-empty-lines": ["error", { "max": 2, "maxBOF": 0, "maxEOF": 0 }],  // Allow up to 2 empty lines in a row
  "no-empty": ["error", { "allowEmptyCatch": true }],                            // Allow empty blocks when it's for a catch statement
  "react/forbid-prop-types": "off",                                              // Allow vague prop-types like “object”
  "prefer-const": ["error", { "destructuring": "all" }],                         // For destructured declarations where only some variables get reassigned, don’t require const for the others
  "jsx-a11y/label-has-associated-control": ["error", { "assert": "either" }],    // Allow associating form labels by nesting
  "react/jsx-one-expression-per-line": "off",                                    // Allow multiple JSX expressions on a line
  "no-continue": "off",                                                          // Allow continue statements
  "no-restricted-exports": ["error", { "restrictedNamedExports": ["then"] } ],   // Allow `export { default }` syntax
  "import/prefer-default-export": "off",                                         // Allow modules to have a single named export
  "lines-between-class-members": "off",                                          // Allow omitting an empty line between class members
  "max-classes-per-file": "off",                                                 // Allow more than one class per file
  "react/jsx-filename-extension": ["error", { "extensions": [".jsx", ".tsx"] }], // Allow JSX in .tsx files
  "react/require-default-props": ["error", { "forbidDefaultForRequired": true, "classes": "defaultProps", "functions": "defaultArguments" }]
};

module.exports = {
  "extends": ["airbnb", "airbnb/hooks", "next"],
  "plugins": ["react-hooks", "@next/next", "jsx-a11y", "react", "import", "@typescript-eslint/eslint-plugin"],
  "env": { "browser": true },
  // Override some rules
  "rules": overrides,

  "globals": {
    "globalThis": false                                                           // Allow referencing globalThis
  },

  // disable some rules that are redundant in typescript environment
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        ...overrides,

        "no-undef": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        "import/no-unresolved": "off",

        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }
        ],

        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error", "never"],
        "no-spaced-func": "off",

        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error", { "ignoreTypeReferences": false }],
      },
      "extends": ["airbnb", "airbnb/hooks", "next"],
    },
    {
      "files": ["*.d.ts"],
      "rules": {
        "no-unused-vars": "off"
      }
    }
  ]
}
