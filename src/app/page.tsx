import Image from 'next/image';
import PostsPage from './posts/page';
import { getConfig } from '@/lib/getConfig';

export default function Home() {
  const config = getConfig();

  return (
    <div>
      {/* Top Banner */}
      <div
        className='relative h-[40vh] w-full bg-cover bg-center sm:h-[40vh] md:h-[600px] lg:h-[800px]'
        style={{ backgroundImage: `url(${config.background})` }}
      >
        {/* Avatar */}
        <div className='absolute left-1/2 top-[40%] -translate-x-1/2 transform'>
          <Image
            src={config.avatar}
            alt='Avatar'
            width={150}
            height={150}
            className='aspect-square h-[60vw] max-h-[150px] w-[60vw] max-w-[150px] rounded-full border-4 border-gray-300 object-cover md:h-[150px] md:w-[150px]'
          />
        </div>
      </div>

      {/* Slogan */}
      <div className='mt-4 px-6 text-center'>
        <h1 className='text-2xl font-semibold'>{config.slogan}</h1>
      </div>

      {/* Posts List - centered */}
      <div className='container mx-auto mt-10 justify-center p-4'>
        <PostsPage />
      </div>
    </div>
  );
}
