const generateLetterCode = (): string => {
  const codeLength = 5;
  const letterArray: string[] = new Array(codeLength);

  for (let i = 0; i < codeLength; i++) {
    // 65 is the beginning of the ascii character set for uppercase letters
    // 97 is the beginning of the ascii character set for lowercase letters
    const asciiOffset: number = Math.random() < 0.5 ? 65 : 97;
    const randomCharCode: number = Math.floor(Math.random() * 26) + asciiOffset;

    letterArray[i] = String.fromCharCode(randomCharCode);
  }

  return letterArray.join('');
};

export { generateLetterCode };
