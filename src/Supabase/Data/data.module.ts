import { Module } from '@nestjs/common';

import { DeleteModule } from './delete/delete.module';
import { CreateModule } from './create/create.module';
import { GetModule } from './get/get.module';
import { UpdateModule } from './update/update.module';

import { Supabase } from '../db/Supabase'


@Module({
  imports: [DeleteModule, CreateModule, GetModule, UpdateModule],
  providers: [Supabase]
})
export class DataModule {}
