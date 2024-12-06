import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Supabase } from '../db/Supabase';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Supabase],
})
export class AuthModule {}
