function promisesRejectionNumChecker(listOfPromises, rejectionThreshold) {
  let rejectedCount = 0;

  const handleRejection = () => {
    rejectedCount++;
    if (rejectedCount > rejectionThreshold) {
      throw new Error(`Number of rejected promises exceeded the threshold of ${rejectionThreshold}`);
    }
  };

  for (const promise of listOfPromises) {
    promise.catch(handleRejection);
  }

  return Promise.allSettled(listOfPromises)
    .then(() => {
      if (rejectedCount <= rejectionThreshold) {
        return;
      } else {
        throw new Error(`Number of rejected promises exceeded the threshold of ${rejectionThreshold}`);
      }
    });
}

module.exports = { promisesRejectionNumChecker };
