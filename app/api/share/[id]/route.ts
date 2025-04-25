import { NextResponse } from 'next/server';
import { redis } from '@/app/lib/redis';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Redis 연결 테스트
    try {
      await redis.ping();
    } catch (redisError) {
      return NextResponse.json(
        { error: 'Redis 연결에 실패했습니다.' },
        { status: 500 }
      );
    }

    const data = await redis.get(params.id);

    if (!data) {
      return NextResponse.json(
        { error: '공유된 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 데이터가 이미 객체 형태로 반환되므로 바로 사용
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: '데이터 조회에 실패했습니다.' },
      { status: 500 }
    );
  }
}
