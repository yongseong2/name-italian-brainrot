export default function Loading() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center'>
      <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 max-w-md mx-4 text-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF0080] mx-auto mb-4'></div>
        <h2 className='text-xl font-bold text-gray-800'>로딩중...</h2>
        <p className='text-gray-600 mt-2'>잠시만 기다려주세요</p>
      </div>
    </main>
  );
}
