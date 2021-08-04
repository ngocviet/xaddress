/**
 * Error thrown when encoding or decoding fail due to invalid input.
 */
export class ValidationError extends Error {

  /**
   * @constructor ValidationError
   * @param {string} message Error description
   */
  constructor(message: string) {
    super();
    const error = new Error();
    this.name = error.name = 'ValidationError';
    this.message = error.message = message;
    this.stack = error.stack;
  }
}

/**
 * Validates a given condition, throwing a {@link ValidationError} if
 * the given condition does not hold.
 * @static
 * @param {boolean} condition Condition to validate.
 * @param {string} message 
 */
export function validate(condition: boolean, message: string) {
  if (!condition) {
    throw new ValidationError(message);
  }
}