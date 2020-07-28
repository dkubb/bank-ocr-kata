'use strict'

const template = [
  ' _     _  _     _  _  _  _  _ ',
  '| |  | _| _||_||_ |_   ||_||_|',
  '|_|  ||_  _|  | _||_|  ||_| _|'
].join('\n')

/** A class representing a Bank Account. */
class BankAccount {

  // A list of all possible digits defined in the template
  static DIGITS = this.split(template)

  // A map of all alternatives to the 10 digits
  static ALTERNATIVES = {}

  /* Split the text into an Array of digits
   *
   * @param {string} text
   *
   * @returns {Array<string>}
   */
  static split(text) {
    // Split the text into each line
    return text.split('\n').reduce((digits, line) => {

      // Match each line in group of 3 characters
      line.match(/.{3}/g).forEach((chars, lineNo) => {
        // Append characters to the digit
        digits[lineNo] ? digits[lineNo] += chars : digits[lineNo] = chars
      })

      return digits
    }, [])
  }

  /* Join the Array of digits into text
   *
   * @param {Array<string>} digits
   *
   * @returns {string}
   */
  static join(digits) {
    // Iterate over each digit, reading each line in series
    return [0, 1, 2]
      .map(lineNo => digits.map(digit => digit.substr(lineNo * 3, 3)).join(''))
      .join('\n')
  }

  /* Parse the text into a Bank Account
   *
   * @param {string} text
   *
   * @returns {BankAccount}
   */
  static parse(text) {
    const digits = this.split(text)
    const number = digits.map(digit => this.matchDigit(digit))
    return new this(number, digits)
  }

  /* Match the digit exactly or return ? for unknown digits
   *
   * @param {string}
   *
   * @returns {string}
   * @private
   */
  static matchDigit(digit) {
    const index = this.DIGITS.indexOf(digit)
    return index === -1 ? '?' : index
  }

  /* Initialize the Bank Account
   *
   * @param {(string|string[])} number
   * @param {string[]} digits
   */
  constructor(number, digits) {
    this.number = Array.from(number)
    this.digits = digits
  }

  /* Format the Bank Account number
   *
   * @returns {string}
   */
  format () {
    return this.number.join('')
  }

  /* Test if the Bank Account number is valid
   *
   * @returns {boolean}
   */
  isValid () {
    // A number must be exactly 9 characters in length
    if (this.number.length !== 9) return false

    // A checksum is calculated by iterating over the numbers in reverse,
    // then multiplying each number by it's position, beginning with 1,
    // then summing the results.
    const checksum = Array.from(this.number)
      .reverse()
      .reduce((sum, num, pos) => sum + ((pos + 1) * num), 0)

    // If the checksum if exactly divisible by 11 then it is valid
    return (checksum % 11) === 0
  }

  /* Test if the Bank Account number is legible
   *
   * @returns {boolean}
   */
  isLegible () {
    // The question mark cannot appear in the number for it to be legible
    return this.number.indexOf('?') === -1
  }

  /* Returns a formatted status line for reports
   *
   * @returns {string}
   */
  statusLine () {
    // Display illegible or error status. If the Bank Account
    // is valid, then return no status.
    const status = !this.isLegible() ? ' ILL' :
                   !this.isValid()   ? ' ERR' :
                                       ''

    return `${this.format()}${status}\n`
  }
}

const alts = BankAccount.ALTERNATIVES

// Use the number 8 as a template because every character for the specific
// position is set.
const eight = BankAccount.DIGITS[8]

// Precompute all possible alternative digits
BankAccount.DIGITS.forEach((digit, index) => {
  // Walk through each position and substitute a space or a valid character
  // relative to the position.
  for (const pos in digit) {
    for (const replacement of [' ', eight[pos]]) {

      // Map the character to the set of allowed alternatives for that index
      const copy = Array.from(digit)
      copy[pos] = replacement
      const key = copy.join('')
      alts[key] ? alts[key].add(index) : alts[key] = new Set([index])
    }
  }
})

module.exports = BankAccount
