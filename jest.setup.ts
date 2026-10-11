import '@testing-library/jest-dom'

// Mock global fetch if needed in tests
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn()
}
