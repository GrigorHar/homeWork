const { promisesRejectionNumChecker } = require('./promisesRejectionNumChecker');

describe('promisesRejectionNumChecker', () => {
    test('should resolve if no promises are provided', async () => {
        const promises = [];
        const rejectionThreshold = 2;
    
        await expect(promisesRejectionNumChecker(promises, rejectionThreshold)).resolves.toBeUndefined();
      });
    
      test('should resolve if rejectionThreshold is greater than the number of rejected promises', async () => {
        const promises = [Promise.reject(), Promise.reject(), Promise.reject()];
        const rejectionThreshold = 5;
    
        await expect(promisesRejectionNumChecker(promises, rejectionThreshold)).resolves.toBeUndefined();
      });
    
      test('should resolve if some promises are rejected but not exceeding the threshold', async () => {
        const promises = [Promise.resolve(), Promise.reject(), Promise.resolve()];
        const rejectionThreshold = 2;
    
        await expect(promisesRejectionNumChecker(promises, rejectionThreshold)).resolves.toBeUndefined();
      });
    
      test('should reject if a single promise is rejected and exceeds the threshold', async () => {
        const promises = [Promise.reject()];
        const rejectionThreshold = 0;
    
        await expect(promisesRejectionNumChecker(promises, rejectionThreshold)).rejects.toThrowError(
          'Number of rejected promises exceeded the threshold of 0'
        );
      });



  
  
});