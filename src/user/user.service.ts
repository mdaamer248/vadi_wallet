import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "console";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";

// Importong Libraries for BlockChian methods
const Web3     = require('web3');
const ethers   = require ('ethers');
const Mnemonic = require('bitcore-mnemonic')



@Injectable()
export class userService {

    // constructor( @InjectRepository(User) private userRepository: Repository<User>){}

    // Generating a new account object
    async createWalletAddress(){
        let mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH);
        const addr1 = ethers.Wallet.fromMnemonic(mnemonic.toString());

        const account = {publicKey : addr1.address, PrivateKey: addr1.privateKey, mnemonic: mnemonic.toString()};

        return account;
    }

    async createSecondaryAddress (mnemonic: string){
        const addr2 = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/1`);
        const account = {publicKey : addr2.address, PrivateKey: addr2.privateKey};
        return account;
    }
}