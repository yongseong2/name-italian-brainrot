import { NextResponse } from 'next/server';
import { ShareData } from '@/app/utils/types';
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

    const data = await redis.get<string>(params.id);

    if (!data) {
      console.log('No data found for ID:', params.id);
      return NextResponse.json(
        { error: '공유된 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(JSON.parse(data) as ShareData);
  } catch (error: any) {
    console.error('Failed to get share data:', error);
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
