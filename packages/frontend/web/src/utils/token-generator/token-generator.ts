export function shuffle(string_: string): string {
  const a = [...string_],
    n = a.length;

  for (let index = n - 1; index > 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    const temporary = a[index];
    a[index] = a[index_];
    a[index_] = temporary;
  }
  return a.join('');
}

export function tokenGenerator(): string[] {
  const alpha = Array.from({ length: 26 }).map(function (event_, index) {
    return index + 65;
  });
  const filteredO = alpha.filter((x) => x != 79);
  const filteredI = filteredO.filter((y) => y != 73);
  const alphabet = filteredI.map(function (z) {
    return String.fromCodePoint(z);
  });
  let token = '';
  for (let index = 0; index < 3; index++) {
    token += alphabet[Math.floor(Math.random() * 24)];
    token += Math.floor(Math.random() * (9 - 1) + 1);
  }
  const shuffledToken = shuffle(token);
  const tokenUpper = shuffledToken.toUpperCase().slice(0, 6);

  return tokenUpper.split(' ');
}
