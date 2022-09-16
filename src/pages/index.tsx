import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [trackUrl, setTrackUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = () => {
    setError(null);

    if (trackUrl.length === 0) {
      inputRef.current?.focus();
      return;
    }

    const trackId = trackUrl.split('/')?.[4]?.split('?')?.[0];

    if (!trackId) {
      setError('invalid track url');
      inputRef.current?.focus();
      return;
    }

    router.push(`/track/${trackId}`);
  };

  return (
    <main className='flex flex-col items-center justify-between w-full h-full'>
      <header className='h-6 pt-4 sm:pt-8'>
        <h1 className='mb-1.5 text-center text-2xl font-medium underline'>
          popscore
        </h1>
        <p className='w-full max-w-xs text-lg leading-snug text-center text-gray-400'>
          get any spotify {"track's"} popularity score
        </p>
      </header>

      <section className='relative w-full max-w-md p-4'>
        <p className='mb-2 text-lg text-center'>enter track link here pls 👇</p>

        <input
          ref={inputRef}
          type='text'
          value={trackUrl}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSubmit();
            }
          }}
          onChange={(event) => {
            setTrackUrl(event.target.value);
          }}
          placeholder='https://open.spotify.com/track/...'
          className='w-full h-10 pl-2 mb-3 border-2 border-green-500 rounded outline-none'
        />

        <button
          className='relative block px-3 pt-3 pb-3 mx-auto font-medium leading-none text-white transition transform bg-green-500 rounded-lg active:scale-95 active:opacity-90'
          onClick={onSubmit}
        >
          <p>submit</p>
        </button>

        {error && (
          <div className='absolute left-0 flex justify-center w-full -bottom-4'>
            <p className='text-red-500'>error: {error}</p>
          </div>
        )}
      </section>

      <footer className='pb-4 mx-auto text-sm'>
        made with ❤️ by{' '}
        <a
          href='https://tiktok.com/@itsmnjn'
          target='_blank'
          rel='noreferrer'
          className='font-medium underline'
        >
          @itsmnjn
        </a>
      </footer>
    </main>
  );
}
