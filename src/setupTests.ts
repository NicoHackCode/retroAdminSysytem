import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { expect } from '@jest/globals';

afterEach(() => {
  cleanup();
});