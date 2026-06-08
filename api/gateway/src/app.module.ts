import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BeachModule } from './beach/beach.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [AuthModule, UserModule, BeachModule, BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
