import { Injectable } from '@nestjs/common';
import { MangaDexService } from 'src/services/mangadex/mangadex.service';

@Injectable()
export class UserService {
  constructor(private readonly mangadexService: MangaDexService) {}

  async getUser(userToken: string) {
    return await this.mangadexService.clientMe(userToken);
  }
}
