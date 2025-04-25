import { NextResponse } from 'next/server';

// OpenAI 이미지 URL 패턴 검증
const isValidOpenAIImageUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname === 'oaidalleapiprodscus.blob.core.windows.net';
  } catch {
    return false;
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }

    // OpenAI 이미지 URL인지 확인
    if (!isValidOpenAIImageUrl(imageUrl)) {
      return new NextResponse('Invalid image URL', { status: 403 });
    }

    const response = await fetch(imageUrl, {
      headers: {
        Accept: 'image/*',
      },
      next: {
        revalidate: 0, // 캐시하지 않음
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('image/')) {
      return new NextResponse('Invalid content type', { status: 400 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const bufferSize = arrayBuffer.byteLength;

    // 최대 10MB로 제한
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (bufferSize > MAX_SIZE) {
      return new NextResponse('Image too large', { status: 400 });
    }

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin':
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Proxy image error:', error);
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
