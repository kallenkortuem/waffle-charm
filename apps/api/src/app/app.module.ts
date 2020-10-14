import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './providers/config.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
