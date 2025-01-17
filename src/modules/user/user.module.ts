import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MangaDexModule } from 'src/services/mangadex/mangadex.module';

@Module({
  imports: [MangaDexModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
