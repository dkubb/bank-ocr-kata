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

  describe('.DIGITS', () => {
    it('returns the expected digits', () => {
      expect(BankAccount.DIGITS).toEqual([
        ' _ ' +
        '| |' +
        '|_|',
        '   ' +
        '  |' +
        '  |',
        ' _ ' +
        ' _|' +
        '|_ ',
        ' _ ' +
        ' _|' +
        ' _|',
        '   ' +
        '|_|' +
        '  |',
        ' _ ' +
        '|_ ' +
        ' _|',
        ' _ ' +
        '|_ ' +
        '|_|',
        ' _ ' +
        '  |' +
        '  |',
        ' _ ' +
        '|_|' +
        '|_|',
        ' _ ' +
        '|_|' +
        ' _|'
      ])
    })
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

  describe('.join', () => {
    describe('when there are no digits', () => {
      it('returns the expected string', () => {
        expect(BankAccount.join([])).toBe('\n\n')
      })
    })

    describe('when there is one digit', () => {
      it('returns the expected string', () => {
        expect(BankAccount.join([zero.join('')])).toBe(zero.join('\n'))
      })
    })

    describe('when there are two digits', () => {
      it('returns the expected string', () => {
        const digits = [zero.join(''), one.join('')]

        expect(BankAccount.join(digits)).toBe(zero_one.join('\n'))
      })
    })
  })

  describe('.parse', () => {
    const testCases = [
      [
        '000000000',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          '| || || || || || || || || |',
          '|_||_||_||_||_||_||_||_||_|'
        ]
      ],
      [
        '111111111',
        [
          '                           ',
          '  |  |  |  |  |  |  |  |  |',
          '  |  |  |  |  |  |  |  |  |'
        ]
      ],
      [
        '222222222',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          ' _| _| _| _| _| _| _| _| _|',
          '|_ |_ |_ |_ |_ |_ |_ |_ |_ '
        ]
      ],
      [
        '333333333',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          ' _| _| _| _| _| _| _| _| _|',
          ' _| _| _| _| _| _| _| _| _|'
        ]
      ],
      [
        '444444444',
        [
          '                           ',
          '|_||_||_||_||_||_||_||_||_|',
          '  |  |  |  |  |  |  |  |  |'
        ]
      ],
      [
        '555555555',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          '|_ |_ |_ |_ |_ |_ |_ |_ |_ ',
          ' _| _| _| _| _| _| _| _| _|'
        ]
      ],
      [
        '666666666',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          '|_ |_ |_ |_ |_ |_ |_ |_ |_ ',
          '|_||_||_||_||_||_||_||_||_|'
        ]
      ],
      [
        '777777777',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          '  |  |  |  |  |  |  |  |  |',
          '  |  |  |  |  |  |  |  |  |'
        ]
      ],
      [
        '888888888',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          '|_||_||_||_||_||_||_||_||_|',
          '|_||_||_||_||_||_||_||_||_|'
        ]
      ],
      [
        '999999999',
        [
          ' _  _  _  _  _  _  _  _  _ ',
          '|_||_||_||_||_||_||_||_||_|',
          ' _| _| _| _| _| _| _| _| _|'
        ]
      ],
      [
        '123456789',
        [
          '    _  _     _  _  _  _  _ ',
          '  | _| _||_||_ |_   ||_||_|',
          '  ||_  _|  | _||_|  ||_| _|'
        ]
      ],
      [
        '?',
        [
          ' _ ',
          '| |',
          '|_ '
        ]
      ]
    ]

    testCases.forEach(([parsed, text]) => {
      describe(`when text is ${parsed}`, () => {
        const bankAccount = BankAccount.parse(text.join('\n'))

        it('parses the expected bank account', () => {
          expect(bankAccount.format()).toBe(parsed)
        })
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

  describe('#isValid', () => {
    describe('when the bank account checksum is valid', () => {
      const bankAccount = new BankAccount('345882865')

      it('returns true', () => {
        expect(bankAccount.isValid()).toBeTrue()
      })
    })

    describe('when the bank account checksum is not valid', () => {
      const bankAccount = new BankAccount('345882864')

      it('returns false', () => {
        expect(bankAccount.isValid()).toBeFalse()
      })
    })

    describe('when the bank account is too short', () => {
      const bankAccount = new BankAccount('34588280')

      it('returns false', () => {
        expect(bankAccount.isValid()).toBeFalse()
      })
    })

    describe('when the bank account is too long', () => {
      const bankAccount = new BankAccount('3458828656')

      it('returns false', () => {
        expect(bankAccount.isValid()).toBeFalse()
      })
    })

    describe('when the bank account is not legible', () => {
      const bankAccount = new BankAccount('34588286?')

      it('returns false', () => {
        expect(bankAccount.isValid()).toBeFalse()
      })
    })
  })

  describe('#isLegible', () => {
    describe('when the bank account is legible', () => {
      const bankAccount = new BankAccount('345882865')

      it('returns true', () => {
        expect(bankAccount.isLegible()).toBeTrue()
      })
    })

    describe('when the bank account is not legible', () => {
      const bankAccount = new BankAccount('34588286?')

      it('returns false', () => {
        expect(bankAccount.isLegible()).toBeFalse()
      })
    })
  })
})
