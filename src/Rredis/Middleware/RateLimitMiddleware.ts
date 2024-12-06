//유저의 jwt토큰을 기반으로 한 요청 속도제한 (supabase랑 연결) + (새로고침도 막는다고 함...[놀랍네..)

import { Injectable, NestMiddleware } from '@nestjs/common';
import { RateLimitService } from './function/RateLimitService';
import { Get_User_Id } from './Supabase/Get_User_ID'; // Supabase id를가져오는 함수

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimitService: RateLimitService,
    private readonly get_User_Id: Get_User_Id,
  ) {}

  async use(req: any, res: any, next: () => void) {
    // << req : 요청에 포함되는것, res 반환할것
    // Authorization 헤더에서 토큰을 가지고 옴
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return res.status(401).json({ message: '토큰이 없스요' });
    }

    try {
      // Supabase를 활용 유저 id 겟또
      const userId = await this.get_User_Id.getUserIdFromToken(token);

      // Redis 속도 제한 체크
      const isAllowed = await this.rateLimitService.checkRateLimit(userId);

      if (!isAllowed) {
        return res.status(429).json({ message: '과도한 요청!' });
      }

      next(); // 뭐 없으면 다음으로~ (미들웨어라서 이런거 있음)
    } catch (error) {
      return res
        .status(401)
        .json({ message: '서버와의 요청 과정에서 오류 발생!' });
    }
  }
}
