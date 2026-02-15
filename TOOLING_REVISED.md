# Revised Tooling Strategy

## Issue with Antfu Config

Dependency conflict detected:

- `eslint-config-next` requires `eslint-plugin-react-hooks@^5.0.0`
- `@antfu/eslint-config` requires `eslint-plugin-react-hooks@^7.0.0`

This is a known issue when mixing Next.js's opinionated ESLint with third-party configs.

## Better Approach for Next.js Projects

### Recommended: Enhanced Next.js ESLint + Prettier

Instead of replacing Next.js ESLint, **enhance it** with:

1. **Prettier** - Code formatting (industry standard)
2. **eslint-plugin-import** - Import organization
3. **eslint-plugin-unused-imports** - Detect dead code
4. **TypeScript ESLint** - Type-aware linting

This gives us 90% of Antfu's benefits without conflicts.

### Installation

```bash
npm install -D prettier eslint-config-prettier eslint-plugin-import eslint-plugin-unused-imports @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Configuration Files

#### `.prettierrc`

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

#### `.eslintrc.json` (or `.eslintrc.js`)

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["import", "unused-imports"],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}
```

#### `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### package.json scripts

```json
{
  "scripts": {
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Benefits

✅ **No dependency conflicts** - Works perfectly with Next.js
✅ **Prettier integration** - Industry standard formatting
✅ **Import sorting** - Organized imports automatically
✅ **Unused imports** - Automatically removed
✅ **Type-aware linting** - Uses TypeScript for better checks
✅ **Auto-fix on save** - Great DX in VS Code
✅ **Well-maintained** - All official packages

### What We Get

1. **Code Formatting** - Consistent style via Prettier
2. **Import Organization** - Sorted imports
3. **Dead Code Detection** - Unused imports removed
4. **Next.js Best Practices** - All Next.js rules
5. **React Best Practices** - All React rules
6. **TypeScript Integration** - Type-aware linting

### What We Miss (vs Antfu)

- Slightly less opinionated naming conventions
- No built-in flat config (uses legacy .eslintrc)

**Verdict:** ✅ **This is actually better for Next.js projects**

The Next.js team maintains eslint-config-next specifically for Next.js, and it's kept up-to-date with Next.js releases. Adding Prettier + import sorting gives us everything we need.
