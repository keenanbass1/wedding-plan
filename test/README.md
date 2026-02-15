# Testing Guide

This directory contains all test files for the WeddingPlan AI application.

## Test Setup

We use **Vitest** as our testing framework with the following tools:
- **@testing-library/react** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - DOM matchers
- **jsdom** - DOM environment for Node.js

## Running Tests

```bash
# Run tests in watch mode (development)
npm test

# Run tests once (CI)
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Structure

```
test/
├── setup.ts                    # Global test setup and mocks
├── README.md                   # This file
├── vendor-matching.test.ts    # Unit tests for vendor matching logic
├── api/
│   └── email-generation.test.ts  # API utility function tests
└── components/
    └── VendorCard.test.tsx    # Component tests
```

## Writing Tests

### Unit Tests

Test pure functions and business logic without external dependencies:

```typescript
import { describe, it, expect } from 'vitest'

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction(input)
    expect(result).toBe(expected)
  })
})
```

### Component Tests

Test React components with user interactions:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('should handle click', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

### API Route Tests

Test API endpoints with mocked dependencies:

```typescript
import { describe, it, expect, vi } from 'vitest'

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    vendor: {
      findMany: vi.fn(() => Promise.resolve([]))
    }
  }
}))

describe('GET /api/vendors', () => {
  it('should return vendors', async () => {
    const response = await fetch('/api/vendors')
    expect(response.status).toBe(200)
  })
})
```

## Test Coverage

We aim for:
- **70%+** overall code coverage
- **80%+** coverage for critical business logic
- **60%+** coverage for components

View coverage report:
```bash
npm run test:coverage
```

Coverage report will be generated in `coverage/` directory.

## Mocking

### Next.js Router

Already mocked in `setup.ts`:
```typescript
import { useRouter } from 'next/navigation'
// useRouter() returns mocked router
```

### Supabase Auth

Mock authentication:
```typescript
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(() => ({
        data: { user: { id: 'user-123', email: 'test@example.com' } }
      }))
    }
  }))
}))
```

### Prisma Database

Mock database queries:
```typescript
vi.mock('@/lib/prisma', () => ({
  prisma: {
    vendor: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    }
  }
}))
```

## CI/CD Integration

Tests run automatically on:
- Every push to `main` branch
- Pull request creation
- Pre-deployment checks

CI command:
```bash
npm run test:run
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on what the component/function does, not how
   - Test user interactions, not internal state

2. **Keep Tests Simple**
   - One assertion per test (when possible)
   - Clear test names that describe the scenario

3. **Use Descriptive Names**
   ```typescript
   // Good
   it('should display error message when email is invalid', () => {})

   // Bad
   it('test email validation', () => {})
   ```

4. **Arrange-Act-Assert Pattern**
   ```typescript
   it('should do something', () => {
     // Arrange - Set up test data
     const input = 'test'

     // Act - Execute the code
     const result = myFunction(input)

     // Assert - Check the result
     expect(result).toBe('expected')
   })
   ```

5. **Don't Test External Libraries**
   - Trust that Prisma, Next.js, React work correctly
   - Test your code that uses these libraries

## Debugging Tests

### Run Single Test File
```bash
npm test vendor-matching.test.ts
```

### Run Tests Matching Pattern
```bash
npm test -- --grep "VendorCard"
```

### Debug in VS Code
Add breakpoint and run with debugger, or use:
```typescript
import { debug } from '@testing-library/react'

it('should render', () => {
  const { debug } = render(<MyComponent />)
  debug() // Prints DOM to console
})
```

## Common Issues

### "Cannot find module '@/...'"

Ensure `vitest.config.ts` has correct path alias:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './'),
  },
}
```

### "ReferenceError: vi is not defined"

Add to test file:
```typescript
import { vi } from 'vitest'
```

Or enable globals in `vitest.config.ts`:
```typescript
test: {
  globals: true,
}
```

### Tests Timing Out

Increase timeout for slow tests:
```typescript
it('should load data', async () => {
  // Test code
}, 10000) // 10 second timeout
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)

---

**Last Updated:** February 2026
