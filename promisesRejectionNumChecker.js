function promisesRejectionNumChecker(listOfPromises, rejectionThreshold) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;

    const handleRejection = () => {
      rejectedCount++;
      if (rejectedCount > rejectionThreshold) {
        reject(new Error(`Number of rejected promises exceeded the threshold of ${rejectionThreshold}`));
      }
    };

    for (const promise of listOfPromises) {
      promise.catch(handleRejection);
    }

    Promise.allSettled(listOfPromises)
      .then(() => {
        if (rejectedCount <= rejectionThreshold) {
          resolve();
        }
      })
      .catch(reject);
  });
}

module.exports = { promisesRejectionNumChecker };