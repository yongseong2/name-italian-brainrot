import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-100'>
      <div className='max-w-md w-full space-y-8 text-center'>
        <h1 className='text-4xl font-bold bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] text-transparent bg-clip-text'>
          404 - 페이지를 찾을 수 없습니다
        </h1>
        <p className='text-gray-600'>
          요청하신 페이지가 존재하지 않거나, 이미 삭제되었을 수 있습니다.
        </p>
        <Link
          href='/'
          className='inline-block px-6 py-3 bg-gradient-to-r from-[#FF0080] via-[#FF8C00] to-[#40E0D0] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
        >
          ✨ 홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
