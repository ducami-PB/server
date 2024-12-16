import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//supabase모듈
import { Supabase } from './Supabase/db/Supabase';

//모듈
import { DataModule } from './Supabase/Data/data.module';
import { AuthModule } from './Supabase/auth/auth.module';

// 미들웨어
import { RateLimitMiddleware } from './Redis/Middleware/RateLimitMiddleware'; // 미들웨어에서 사용하는 함수
import { RredisModule } from './Redis/redis.module'; // 미들웨어 모듈
import { RateLimitService } from './Redis/Middleware/function/RateLimitService'; // 미들웨어에서 사용하는 서비스
import { Get_User_Id } from './Redis/Middleware/Supabase/Get_User_ID'; // 미들웨어에서 사용하는 함수

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RredisModule,
    DataModule,
    AuthModule,
  ],
  controllers: [],
  providers: [Supabase, RateLimitService, Get_User_Id],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware) // 미들웨어를 등록
      .exclude(
        {
          // 로그인은 미들웨어 제거 (모든 메소드)
          path: 'supabase/signIn', // << 경로 결정
          method: RequestMethod.ALL, // << 메소드 종류 결정
        },
        {
          // 회원가입은 미들웨어 제거 (모든 메소드)
          path: 'supabase/signUp',
          method: RequestMethod.ALL,
        },
      )

      .forRoutes('*'); // 나머지 모든 경로(+모든 요청)에 대해 미들웨어를 적용

    // 특정 미들웨어에만 적용
    // .forRoutes(
    //   { path: 'user/*', method: RequestMethod.ALL }, // user/로 시작하는 모든 요청에 적용
    //   { path: 'order', method: RequestMethod.POST } // order의 POST 요청에 적용
    // );
  }
}
