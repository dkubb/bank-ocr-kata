'use strict'

const BankAccountReport = require('../src/bank_account_report')

describe('BankAccountReport', () => {
  const contents = ''

  const report = new BankAccountReport(contents)

  it('exists', () => {
    expect(BankAccountReport).toBeDefined()
  })

  describe('constructor', () => {
    it('returns a BankAccountReport instance', () => {
      expect(report).toBeInstanceOf(BankAccountReport)
    })

    it('sets the contents', () => {
      expect(report.contents).toBe(contents)
    })
  })
})
