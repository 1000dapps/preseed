const context = require('../context.json')

const tokenContract = artifacts.require('./Token.sol')
const tokensaleContract = artifacts.require('./Tokensale.sol')

const { advanceBlock, setTime } = require('./utils.js')

contract("Contracts", function() {
  let token
  let tokensale

  before(async () => {
    token = await tokenContract.deployed()
    tokensale = await tokensaleContract.deployed()
  })

  describe('Token', function() {
    it('should have correct name', async () => {
      assert.equal(await token.name(), context.tokenName)
    })

    it('should have correct symbol', async () => {
      assert.equal(await token.symbol(), context.tokenSymbol)
    })

    it('should have correct decimals', async () => {
      assert.equal(await token.decimals(), context.tokenDecimals)
    })

    it('should be paused', async () => {
      assert.equal(await token.paused(), true)
    })

    it('should allow tokensale to mint', async () => {
      assert.equal(await token.isMinter(tokensale.address), true)
    })
  })

  describe('Tokensale', function() {
    it('should have correct openingTime', async () => {
      assert.equal(await tokensale.openingTime(), context.openingTime)
    })

    it('should have correct closingTime', async () => {
      assert.equal(await tokensale.closingTime(), context.closingTime)
    })

    it('should have correct rate', async () => {
      assert.equal(await tokensale.rate(), context.rate)
    })

    it('should have correct cap', async () => {
      assert.equal(await tokensale.cap(), context.cap)
    })

    it('should have correct wallet', async () => {
      assert.equal(await tokensale.wallet(), context.wallet)
    })

    it('should have cap that is not reached', async function() {
      assert.equal(await tokensale.capReached(), false)
    })
  })
})
