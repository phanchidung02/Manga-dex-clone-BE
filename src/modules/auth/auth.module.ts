import { Module } from '@nestjs/common';
import { MangaDexModule } from 'src/services/mangadex/mangadex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MangaDexModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
