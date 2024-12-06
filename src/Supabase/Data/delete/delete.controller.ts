// 북마크 삭제

import {
  Body,
  Headers,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { DeleteService } from './delete.service';

@Injectable()
@Controller('supabase')
export class DeleteController {
  constructor(private readonly deleteService: DeleteService) {}

  @Delete('delete')
  async create(
    @Body() data: { title: string; link: string },
    @Headers('Authorization') authorization: string,
  ): Promise<any> {
    const { title, link } = data;
    const token = authorization.substring('Bearer '.length);
    return this.deleteService.deleteBookmake(token, title, link);
  }
}
