const context = require('../context.json')

const tokenContract = artifacts.require('./Token.sol')
const tokensaleContract = artifacts.require('./Tokensale.sol')

const { advanceBlock, setTime, ether } = require('./utils.js')

contract("Contracts", function(accounts) {
  let token
  let tokensale

  before(async () => {
    token = await tokenContract.deployed()
    tokensale = await tokensaleContract.deployed()

    await advanceBlock()
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

  describe('Tokensale: when deployed', function() {
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
      assert.equal(await tokensale.cap(), context.capInEther * 10**18)
    })

    it('should have correct wallet', async () => {
      assert.equal(await tokensale.wallet(), context.wallet)
    })

    it('should have cap that is not reached', async function() {
      assert.equal(await tokensale.capReached(), false)
    })

    it('should be not opened', async function() {
      assert.equal(await tokensale.isOpen(), false)
    })

    it('should be not closed', async function() {
      assert.equal(await tokensale.hasClosed(), false)
    })
  })

  describe('Tokensale: when started', function() {
    before(async() => {
      const openingTime = await tokensale.openingTime()
      await setTime(openingTime + 1)
    })

    it('should sell shares', async () => {
      await tokensale.buyTokens(accounts[1], { from: accounts[1], value: ether(0.015) })

      const balance = await token.balanceOf(accounts[1])

      expect(balance).to.be.deep.equal(new web3.BigNumber(1))
    })
  })
})
