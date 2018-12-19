const Token = artifacts.require("Token")
const Tokensale = artifacts.require("Tokensale")

const context = require("../context.json")

let tokenInstance;
let tokensaleInstance;

module.exports = function(deployer, network, accounts) {
  const capInWei = context.capInEther * 10**18

  const { rate, finalWallet, address, openingTime, closingTime, wallets } = context

  deployer.then(function() {
    return Tokensale.at('0x2c9fa4b91170f59632459f8a0474877a74c6815c')
  }).then(function(instance) {
    tokensaleInstance = instance
  }).then(function() {
    return Token.at('0xfe2ed410fea0ecbc14976ac4a1428b9c264a6ba0')
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
