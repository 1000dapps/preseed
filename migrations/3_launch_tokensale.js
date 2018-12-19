const Token = artifacts.require("Token")
const Tokensale = artifacts.require("Tokensale")

const context = require("../context.json")

let tokenInstance;
let tokensaleInstance;

module.exports = function(deployer, network, accounts) {
  const capInWei = context.capInEther * 10**18

  const { rate, finalWallet, address, openingTime, closingTime, wallets } = context

  deployer.then(function() {
    return Tokensale.deployed()
  }).then(function(instance) {
    tokensaleInstance = instance
  }).then(function() {
    return Token.deployed()
  }).then(function(instance) {
    tokenInstance = instance
  }).then(function() {
    return tokenInstance.addMinter(tokensaleInstance.address)
  }).then(function() {
    return tokenInstance.pause()
  }).then(function() {
    console.log('Congratulations!')
  })
}
