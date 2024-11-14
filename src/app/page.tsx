import Image from 'next/image';

import { getConfig } from '@/services/config';

async function Home() {
  const config: Config = getConfig();

  return (
    <>
      {/* Top Banner */}
      <div className='relative h-[40vh] w-full bg-cover bg-center'>
        {/* Avatar */}
        <div className='absolute left-1/2 top-[20%] -translate-x-1/2 transform'>
          <Image
            src={config.avatar}
            alt='Avatar'
            width={150}
            height={150}
            className='aspect-square rounded-full border-4 border-gray-300 object-cover'
            priority={true}
          />
        </div>
      </div>

      {/* Slogan */}
      <div className='px-6 text-center'>
        <p className='text-2xl font-semibold'>{config.slogan}</p>
      </div>
    </>
  );
}

export default Home;
