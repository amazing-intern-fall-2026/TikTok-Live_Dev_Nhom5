type FilterResult = {
  cleanedText: String;
  isSpam: boolean;
  isValid: boolean;
  reason?: string
}


function filterText(input: string): FilterResult {
  if (!input || typeof input !== "string") {
    return { cleanedText: "", isSpam: true, isValid: false, reason: "No input" };
  }

  let text = input.trim();

  const isTooLong = text.length >= 300;
  const isTooShort = text.length == 0;
  if (isTooLong || isTooShort) {
    return {
      cleanedText: "",
      isSpam: true,
      isValid: false,
      reason: isTooLong ? "The message is too long" : "The message is too short"
    }
  }

  return {
    cleanedText: text,
    isSpam: false,
    isValid: true,
  }
}

export {
  filterText,
}
