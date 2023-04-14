import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller('')
export class ChatController {
  constructor(private _chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get('get_chats/:id')
  async getChats(@Req() req, @Param('id') id: string) {
    return this._chatService.getChats(req.user._id, id);
  }
}
