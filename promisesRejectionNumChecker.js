 function promisesRejectionNumChecker(listOfPromises, rejectionTheshold) {
  let rejectedCount = 0;

  return new Promise((resolve, reject) => {
    listOfPromises.forEach((promise) => {
      promise
        .catch(() => {
          rejectedCount++;
        });
    });

    setTimeout(() => {
      if (rejectedCount <= rejectionTheshold) {
        resolve("resolved");
      } else {
        reject(new Error('Too many promises rejected'));
      }
    }, 0);
  });
}
module.exports = { promisesRejectionNumChecker };
