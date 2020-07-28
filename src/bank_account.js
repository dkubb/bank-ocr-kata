'use strict'

/** A class representing a Bank Account. */
class BankAccount {

  /* Initialize the Bank Account
   *
   * @param {(string|string[])} number
   * @param {string[]} digits
   */
  constructor(number, digits) {
    this.number = Array.from(number)
    this.digits = digits
  }
}

module.exports = BankAccount
