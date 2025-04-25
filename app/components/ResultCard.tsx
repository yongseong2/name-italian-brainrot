'use client';

interface ResultCardProps {
  title: string;
  content: string;
  emoji: string;
  isImage?: boolean;
}

export const ResultCard = ({
  title,
  content,
  emoji,
  isImage = false,
}: ResultCardProps) => {
  return (
    <div className='mt-6 p-6 rounded-2xl bg-white/90 shadow-lg backdrop-blur-lg border-3 border-white/30 transition-all duration-300 ease-in-out hover:scale-102 hover:-translate-y-1 hover:shadow-xl'>
      <h2
        className={`text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-3`}
      >
        {emoji} {title} {emoji}
      </h2>
      {isImage ? (
        <img
          src={content}
          alt='Generated Character'
          className='w-full h-auto rounded-xl shadow-lg'
        />
      ) : (
        <p className='text-lg text-gray-800 leading-relaxed'>{content}</p>
      )}
    </div>
  );
};
