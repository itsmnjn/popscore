import Image from 'next/image';
import { useRouter } from 'next/router';
import useSwr from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const data = await res.json();
    const error = new Error(data.error);
    throw error;
  }

  return res.json();
};

interface TrackData {
  title: string;
  coverArt: string;
  score: number;
  url: string;
}

export default function TrackPage() {
  const router = useRouter();
  const { trackId } = router.query;

  const { data: track, error } = useSwr(
    `/api/spotify?trackId=${trackId}`,
    fetcher
  );

  if (error) {
    return (
      <div className='p-2'>
        <p className='text-red-500'>error: {error.message}</p>
        <p
          className='underline cursor-pointer'
          onClick={() => {
            router.back();
          }}
        >
          go back
        </p>
      </div>
    );
  }

  if (!track) {
    return (
      <div className='p-2'>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <main className='flex flex-col items-center justify-between w-full h-full'>
      <header
        className='pt-4 text-gray-400 underline cursor-pointer'
        onClick={() => {
          router.back();
        }}
      >
        go back
      </header>

      <section className='flex flex-col items-center w-full max-w-md'>
        <div className='relative w-32 mb-3 aspect-square'>
          <Image
            src={track.coverArt}
            layout='fill'
            objectFit='contain'
            alt='cover art'
          />
        </div>

        <div>
          <p>
            <span className='font-medium'>title:</span> {track.title}
          </p>
          <p>
            <span className='font-medium'>score:</span> {track.score}
          </p>
        </div>
      </section>

      <footer className='pb-4'>
        <p className='text-blue-400 underline cursor-pointer'>
          <a href={track.url} target='_blank' rel='noreferrer'>
            go to song
          </a>
        </p>
      </footer>
    </main>
  );
}
