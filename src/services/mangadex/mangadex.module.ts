import { Global, Module } from '@nestjs/common';
import { MangadexProvider } from './mangadex.provider';
import { MangaDexService } from './mangadex.service';

@Global()
@Module({
  providers: [MangadexProvider, MangaDexService],
  exports: [MangaDexService],
})
export class MangaDexModule {}
