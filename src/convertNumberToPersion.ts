// Helper function to convert numbers to Persian numerals
export function toPersianNumber (num: number): string {
  if (typeof num !== 'number' || isNaN(num)) {
    return ''
  }

  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  return String(num)
    .split('')
    .map(digit => persianDigits[parseInt(digit)])
    .join('')
}
