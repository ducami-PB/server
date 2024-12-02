// 북마크 생성과 추가 (이미지도 같이함)

// 1. 정보 받는거 (제목, jwt(이메일로 변환해서 저장), 주소, 메모,)
// 1-1. 받아 넘기는거
// 1-2. 이미지 찾는거
// 2. 테이블에 추가하는거
// 2-1 bookmark 테이블에 넣기 (email, 이미지(src), 제목, 링크,메모)

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
import { CreateService } from './create.service';

@Injectable()
@Controller('supabase')
export class CreateController {
  constructor(private readonly createService: CreateService) {}

  @Post('create')
  async create(
    @Body() data: { name: string; link: string; memo: string },
    @Headers('Authorization') authorization: string,
  ): Promise<any> {
    const { name, link, memo } = data;
    const token = authorization.substring('Bearer '.length);
    return this.createService.createBookmake(token, name, link, memo);
  }
}
