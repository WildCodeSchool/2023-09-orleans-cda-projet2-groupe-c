// The code used here is used for generating a random token that is used to validate the user's email address.

// This function is used to shuffle the token after its generation
export function shuffle(string_: string): string {
  const a = [...string_], // It creates an array of characters from the string
    n = a.length;

  for (let index = n - 1; index > 0; index--) {
    // It iterates through the array and swaps the characters
    const index_ = Math.floor(Math.random() * (index + 1));
    const temporary = a[index];
    a[index] = a[index_];
    a[index_] = temporary;
  }
  return a.join(''); // Finally, it returns the shuffled string
}

// Here we generate the token from an array converting numbers to letters from charcodes
export function tokenGenerator(): string {
  const alpha = Array.from({ length: 26 }).map(function (event_, index) {
    return index + 65;
  });
  const filteredO = alpha.filter((x) => x != 79); // We filter the letter O and I to avoid confusion with 0s and 1s
  const filteredI = filteredO.filter((y) => y != 73);
  const alphabet = filteredI.map(function (z) {
    return String.fromCodePoint(z);
  });

  // The token is generated by concatenating 3 letters and 3 numbers
  let token = '';
  for (let index = 0; index < 3; index++) {
    token += alphabet[Math.floor(Math.random() * 24)]; // We use the Math.random() function to get a random index from the alphabet array
    token += Math.floor(Math.random() * (9 - 1) + 1);
  }
  const shuffledToken = shuffle(token); // We shuffle the token
  const tokenUpper = shuffledToken.toUpperCase().slice(0, 6); // We convert the token to uppercase and slice it to 6 characters to avoid any outnumbered string

  return tokenUpper; // Finally, we return the token
}
