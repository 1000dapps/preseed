const Token = artifacts.require("Token")
const Tokensale = artifacts.require("Tokensale")

const context = require("../context.json")

let tokenInstance;
let tokensaleInstance;

module.exports = function(deployer, network, accounts) {
  const { rate, rateUpdated } = context

  deployer.then(function() {
    return Tokensale.at('0x2c9fa4b91170f59632459f8a0474877a74c6815c')
  }).then(function(instance) {
    tokensaleInstance = instance
  }).then(function() {
    const rateDifference = rateUpdated - rate
    const updateMethod = rateDifference > 0 ? tokensaleInstance.increaseRateBy : tokensaleInstance.decreaseRateBy

    return updateMethod(Math.abs(rateDifference))
  }).then(function() {
    console.log('Congratulations!')
  })
}
