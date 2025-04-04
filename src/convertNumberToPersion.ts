// Helper function to convert numbers to Persian numerals with comma separation
export function toPersianNumber(num: number): string {
  if (typeof num !== "number" || isNaN(num)) {
    return "";
  }

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

  // Format the number with commas using toLocaleString
  const formattedNumber = num.toLocaleString("en-US");

  // Convert each digit to its Persian equivalent
  return formattedNumber
    .split("")
    .map((digit) => (digit === "," ? "," : persianDigits[parseInt(digit)]))
    .join("");
}
