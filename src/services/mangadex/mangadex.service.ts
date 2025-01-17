import { AxiosInstance } from 'axios';
import { MANGA_DEX_PROVIDER } from './types/mangadex.type';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class MangaDexService {
  constructor(
    @Inject(MANGA_DEX_PROVIDER) private readonly api: AxiosInstance,
  ) {}

  async clientMe(clientToken: string) {
    const res = await this.api.get<any>('/user/me', {
      headers: { Authorization: `Bearer ${clientToken}` },
    });

    return res.data;
  }

  async checkAuth(clientToken: string) {
    const res = await this.api.get<any>('/auth/check', {
      headers: { Authorization: `Bearer ${clientToken}` },
    });

    return res.data;
  }
}
