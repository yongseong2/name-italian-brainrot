import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { ShareData } from '@/app/services/types';
import { redis } from '@/app/lib/redis';

export async function POST(request: Request) {
  try {
    // Redis 연결 확인
    try {
      await redis.ping();
    } catch (redisError) {
      return NextResponse.json(
        { error: 'Redis 연결에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 요청 데이터 파싱
    let data: ShareData;
    try {
      data = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다.' },
        { status: 400 }
      );
    }

    // 데이터 유효성 검사
    if (!data.name || !data.italianName || !data.character || !data.imageUrl) {
      return NextResponse.json(
        { error: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const id = nanoid(10);

    // Redis에 데이터 저장
    try {
      await redis.set(id, JSON.stringify(data), {
        ex: 24 * 60 * 60,
      });
    } catch (storeError) {
      return NextResponse.json(
        { error: '데이터 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
