'use strict'

const BankAccount = require('../src/bank_account')

describe('BankAccount', () => {
  const zero = [
    ' _ ',
    '| |',
    '|_|'
  ]

  const one = [
    '   ',
    '  |',
    '  |'
  ]

  const zero_one = zero.map((chunk, index) => chunk + one[index])

  it('exists', () => {
    expect(BankAccount).toBeDefined()
  })

  describe('.split', () => {
    describe('when the text is 0', () => {
      it('returns zero', () => {
        expect(BankAccount.split(zero.join('\n'))).toEqual([zero.join('')])
      })
    })

    describe('when the text is 1', () => {
     it('returns one', () => {
        expect(BankAccount.split(one.join('\n'))).toEqual([one.join('')])
      })
    })

    describe('when the text is 01', () => {
      it('returns zero one', () => {
        const digits = [zero.join(''), one.join('')]

        expect(BankAccount.split(zero_one.join('\n'))).toEqual(digits)
      })
    })
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
