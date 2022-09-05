var MoonbirdsCP = artifacts.require('MoonbirdsCP')

module.exports = function (deployer) {
  // deployment steps
  deployer.deploy(MoonbirdsCP)
}
