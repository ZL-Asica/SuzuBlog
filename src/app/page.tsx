import Image from 'next/image';
import Link from 'next/link';

import { getConfig } from '@/services/config';

import SocialMediaLink from '@/components/helpers/renderSocialMediaLink';

function Home() {
  const config: Config = getConfig();

  return (
    <div className='flex max-h-[800px] flex-col items-center justify-center px-6'>
      <div className='relative h-[50vh] w-full bg-cover bg-center'>
        <div className='absolute left-1/2 top-[25%] -translate-x-1/2 transform'>
          <Image
            src={config.avatar}
            alt='Avatar'
            width={180}
            height={180}
            className='rounded-full border-4 border-[var(--sakuraPink)] shadow-lg'
            priority={true}
          />
        </div>
      </div>

      <div className='mt-20 text-center'>
        <p className='text-foreground mb-10 text-3xl font-bold'>
          {config.slogan}
        </p>

        <Link
          href={'/posts'}
          className='bg-[var(--sakuraPink) text-lg font-medium hover:bg-[var(--skyblue)]'
        >
          <button className='text-black'>
            Check out my latest posts here!
          </button>
        </Link>

        <SocialMediaLink
          socialMedia={config.socialMedia}
          iconSize={40}
          className='mt-10'
        />
      </div>
    </div>
  );
}

export default Home;
