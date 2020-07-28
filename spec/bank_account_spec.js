'use strict'

const BankAccount = require('../src/bank_account')

describe('BankAccount', () => {
  it('exists', () => {
    expect(BankAccount).toBeDefined()
  })

  describe('constructor', () => {
    const number      = '345882865'
    const digits      = ''
    const bankAccount = new BankAccount(number, digits)

    it('returns a BankAccount instance', () => {
      expect(bankAccount).toBeInstanceOf(BankAccount)
    })

    it('sets the number', () => {
      expect(bankAccount.number).toEqual(number.split(''))
    })

    it('sets the digits', () => {
      expect(bankAccount.digits).toBe(digits)
    })
  })

  describe('#format', () => {
    const number      = '345882865'
    const bankAccount = new BankAccount(number)

    it('returns expected string', () => {
      expect(bankAccount.format()).toBe(number)
    })
  })
})
