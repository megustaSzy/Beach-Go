import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeachModule } from './beach/beach.module';

@Module({
  imports: [BeachModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
