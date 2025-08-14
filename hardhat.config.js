require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");

const {POLYGON_PRIVATE_KEY,POLYGON_API_KEY} = process.env;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    polygon :{
        url : `https://polygon-amoy.g.alchemy.com/v2/${POLYGON_API_KEY}`,
        accounts : [`0x${POLYGON_PRIVATE_KEY}`]
       }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 50,
    },
    viaIR: true,
  }
};
