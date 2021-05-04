/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 import { HardhatUserConfig } from "hardhat/types";

 import "@nomiclabs/hardhat-waffle";
 import "hardhat-typechain"
 
 const config: HardhatUserConfig = {
     defaultNetwork: "hardhat",
     solidity: {
         compilers: [{ version: "0.7.3", settings: {} }],
       },
     networks: {
       hardhat: {},
       // rinkeby: {
       //   url: `https://ropsten.infura.io/v3/5e51ff14ecd24a7faf37b5311c4bd61e`,
       //   accounts: [RINKEBY_PRIVATE_KEY],
       // },
     },  
 };
 export default config;
 
 
 
 