const Token = artifacts.require("Token")
const Tokensale = artifacts.require("Tokensale")

const context = require("../context.json")

let tokenInstance;
let tokensaleInstance;

module.exports = function(deployer, network, accounts) {
  deployer.then(function() {
    const tokenArguments = [context.tokenName, context.tokenSymbol, context.tokenDecimals]
    return deployer.deploy(Token, ...tokenArguments)
  }).then(function() {
    return Token.deployed()
  }).then(function (instance) {
    tokenInstance = instance
  }).then(function() {
    const tokensaleArguments = [context.rate, context.wallet, tokenInstance.address, context.cap, context.openingTime, context.closingTime]
    return deployer.deploy(Tokensale, ...tokensaleArguments)
  }).then(function() {
    return Tokensale.deployed()
  }).then(function(instance) {
    tokensaleInstance = instance
  }).then(function() {
    return tokenInstance.addMinter(tokensaleInstance.address)
  }).then(function() {
    return tokenInstance.pause()
  }).then(function() {
    console.log('Congratulations!')
  })
}
