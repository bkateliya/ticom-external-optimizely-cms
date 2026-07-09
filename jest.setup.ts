import structuredClone from '@ungap/structured-clone'; // can be written as import { structuredClone } from '@ungap/structured-clone';  if esModuleInterop flag is used
import '@testing-library/jest-dom';

function structuredCloneWrapper<T>(value: T): T {
  return structuredClone(value);
}

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = structuredCloneWrapper;
}

// Add fetch mock to global scope
if (typeof global.fetch !== 'function') {
  global.fetch = jest.fn();
}
// Mock Next.js server module to prevent "Request is not defined" errors in Jest
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    next: jest.fn(),
    rewrite: jest.fn(),
  },
}));
