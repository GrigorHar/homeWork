 const { promisesRejectionNumChecker } = require('./promisesRejectionNumChecker');

describe('promisesRejectionNumChecker', () => {

  it('should resolve with "resolved" if the number of rejected promises is not greater than the specified number', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(),
    ];

    const result = await promisesRejectionNumChecker(promises, 1);
    expect(result).toBe('resolved');
  });

  it('should reject with an error if the number of rejected promises is greater than the specified number', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(),
      Promise.reject(),
    ];

    await expect(promisesRejectionNumChecker(promises, 1)).rejects.toThrowError('Too many promises rejected');
  });

  it('should resolve with "resolved" if the number of rejected promises is zero', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
    ];

    const result = await promisesRejectionNumChecker(promises, 0);
    expect(result).toBe('resolved');
  });

  it('should resolve with "resolved" if the number of rejected promises is equal to the specified number', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject(),
    ];

    const result = await promisesRejectionNumChecker(promises, 1);
    expect(result).toBe('resolved');
  });

  it('should resolve with "resolved" if the number of rejected promises is less than the specified number', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(),
    ];

    const result = await promisesRejectionNumChecker(promises, 2);
    expect(result).toBe('resolved');
  });

  it('should reject with an error if all promises are rejected', async () => {
    const promises = [
      Promise.reject(),
      Promise.reject(),
      Promise.reject(),
    ];
  
    await expect(promisesRejectionNumChecker(promises, 2)).rejects.toThrowError('Too many promises rejected');
  });
});
