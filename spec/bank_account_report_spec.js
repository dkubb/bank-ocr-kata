'use strict'

const BankAccountReport = require('../src/bank_account_report')

describe('BankAccountReport', () => {
  const valid = [
    ' _  _  _  _  _  _  _  _    ',
    '| || || || || || || ||_   |',
    '|_||_||_||_||_||_||_| _|  |'
  ]

  const err = [
    ' _  _     _  _        _  _ ',
    '|_ |_ |_| _|  |  ||_||_||_ ',
    '|_||_|  | _|  |  |  | _| _|'
  ]

  const illegible_a = [
    '    _  _  _  _  _  _     _ ',
    '|_||_|| || ||_   |  |  | _ ',
    '  | _||_||_||_|  |  |  | _|'
  ]

  const illegible_b = [
    '    _  _     _  _  _  _  _ ',
    '  | _| _||_| _ |_   ||_||_|',
    '  ||_  _|  | _||_|  ||_| _ ',
  ]

  const contents = 
    valid.join('\n')       + '\n\n' +
    err.join('\n')         + '\n\n' +
    illegible_a.join('\n') + '\n\n' +
    illegible_b.join('\n') + '\n\n'

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

  describe('#generate', () => {
    it('returns the report', () => {
      expect(report.generate()).toEqual([
        '000000051\n',
        '664371485\n',
        '49006771? ILL\n',
        '1234?678? ILL\n'
      ])
    })
  })
})
