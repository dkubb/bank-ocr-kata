'use strict'

const BankAccount = require('./bank_account')

const MAXIMUM_BUFFER_SIZE = 3

/** A class representing a Bank Account Report */
class BankAccountReport {

  /* Initialize a Bank Account Report
   *
   * @param {string} contents the file contents
   */
  constructor(contents) {
    this.contents = contents
  }

  /* Generate a report with the parsed Bank Accounts
   *
   * @return {string[]}
   */
  generate() {
    const lines = this.contents.split('\n')

    let buffer      = []
    let statusLines = []

    lines.forEach(line => {
      if (buffer.length === MAXIMUM_BUFFER_SIZE) {
        let account = BankAccount.parse(buffer.join('\n'))
        statusLines.push(account.statusLine())
        buffer = []
      } else {
        buffer.push(line)
      }
    })

    return statusLines
  }
}

module.exports = BankAccountReport
