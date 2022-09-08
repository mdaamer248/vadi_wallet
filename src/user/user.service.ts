import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
// Importong Libraries for BlockChian methods
const Web3 = require('web3');
const ethers = require('ethers');
const Mnemonic = require('bitcore-mnemonic');
// const ABI : JSON = require("../../VadiTokenV2.json")
import ABI from "../../VadiTokenV2.json";
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://eth-goerli.nodereal.io/v1/8a4432e42df94dcca2814fde8aea2a2e',
  ),
);
const contract = new web3.eth.Contract(
  ABI,
  '0x089797d601E7973278e62008bEbE693cA060A396'
);

@Injectable()
export class userService {
  // constructor( @InjectRepository(User) private userRepository: Repository<User>){}

  // Generating a new account object
  async createWalletAddress() {
    let mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
    const addr1 = ethers.Wallet.fromMnemonic(mnemonic.toString());

    const account = {
      publicKey: addr1.address,
      PrivateKey: addr1.privateKey,
      mnemonic: mnemonic.toString(),
    };

    return account;
  }

  async createSecondaryAddress(mnemonic: string) {
    const addr2 = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/1`);
    const account = { publicKey: addr2.address, PrivateKey: addr2.privateKey };
    return account;
  }

  async getUsersEthBalance(address: string) {
   
    const balance = await web3.eth.getBalance(address);
    return balance;
  }


  async getUsersVadiTokenBalance(address: string) {
    const balance = await contract.methods.balanceOf(address).call();
    return balance;
  }
}
