import { Module } from '@nestjs/common';

import { Supabase } from './supabase/db/Supabase';

import { AuthController } from './supabase/auth/auth.controller';
import { AuthService } from './supabase/auth/auth.service';

import { CreateController } from './supabase/Data/create/create.controller';
import { CreateService } from './supabase/Data/create/create.service';

import { GetController } from './supabase/Data/get/get.controller';
import { GetService } from './supabase/Data/get/get.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigService를 전역으로 사용 가능하게 설정
    }),
  ],
  controllers: [AuthController, CreateController, GetController],
  providers: [AuthService, CreateService, GetService, Supabase],
})
export class AppModule {}
