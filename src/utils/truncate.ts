const truncate = (
  text: string,
  maxLength: number = 20,
  options: { suffix?: string; wordSafe?: boolean }
): string => {
  if (!text) return '';

  const { suffix = '...', wordSafe = true } = options;

  if (text.length <= maxLength) return text;

  if (wordSafe) {
    const truncatedText = text.slice(0, maxLength);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');

    return (
      (lastSpaceIndex > 0
        ? truncatedText.slice(0, lastSpaceIndex)
        : truncatedText) + suffix
    );
  } else {
    return text.slice(0, maxLength) + suffix;
  }

  return '';
};

export default truncate;
