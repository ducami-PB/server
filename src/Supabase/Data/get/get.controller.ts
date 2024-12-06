// 해당하는 유저의 북바크 정보를 가져오기
//1. jwt를 받아와서 그 유저의 이메일로 북마크 가져와서 반환

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
import { GetService } from './get.service';

@Injectable()
@Controller('supabase')
export class GetController {
  constructor(private readonly getService: GetService) {}

  @Get('get')
  async create(@Headers('Authorization') authorization: string): Promise<any> {
    const token = authorization.substring('Bearer '.length);
    return this.getService.getList(token);
  }
}
