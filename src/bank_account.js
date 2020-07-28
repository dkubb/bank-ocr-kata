'use strict'

/** A class representing a Bank Account. */
class BankAccount {

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
}

module.exports = BankAccount
