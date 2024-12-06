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
import { UpdateService } from './update.service';

@Injectable()
@Controller('supabase')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @Patch('update')
  async create(
    @Body()
    data: {
      BeforeTitle: string;
      BeforeLink: string;
      afterTitle: string;
      afterLink: string;
    },
    @Headers('Authorization') authorization: string,
  ): Promise<any> {
    const { BeforeTitle, BeforeLink, afterTitle, afterLink } = data;
    const token = authorization.substring('Bearer '.length);
    return this.updateService.updateBookmark(
      token,
      BeforeTitle,
      BeforeLink,
      afterTitle,
      afterLink,
    );
  }
}
