var MyMoonBirds = artifacts.require('MyMoonBirds')

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(MyMoonBirds)
}
