function random(array) {
  // Create a new array by spreading the elements of the input array
  const shuffledArray = [...array];

  // Iterate over the array elements starting from the last element
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    
    // Generate a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    
    // Swap the elements at indices i and j using destructuring assignment
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default {
  random
};


  