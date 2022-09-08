import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userService } from './user.service';
import { MnemonicDto } from './dto/mnemonic.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: userService) {}

  @Get('create-address')
  async createAddress() {
    const userAddress = await this.userService.createWalletAddress();
    return userAddress;
  }

  @Post('get-seconday-account')
  async getSecondaryAccount(@Body() body: MnemonicDto) {
    const userSecondaryAddress = await this.userService.createSecondaryAddress(
      body.mnemonic
    );
    return userSecondaryAddress;
  }

  @Get('get-eth-balance/:addr')
  async  getUserEthBalance (@Param('addr') addr: string){
    const balance = await this.userService.getUsersEthBalance(addr);
    return balance;
  }


  @Get('get-vadiToken-balance/:addr')
  async  getUserVadiTokenBalance (@Param('addr') addr: string){
    const balance = await this.userService.getUsersVadiTokenBalance(addr);
    return balance;
  }
}
