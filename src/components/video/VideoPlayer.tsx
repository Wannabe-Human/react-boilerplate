import { cn } from '@utils/tailwind/cn';
import { HTMLAttributes } from 'react';
import ReactPlayer, { YouTubePlayerProps } from 'react-player/youtube';

export interface VideoPlayerProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'id' | 'className'>,
    YouTubePlayerProps {}

export const VideoPlayer = ({ id, className, ...props }: VideoPlayerProps) => {
  return (
    <div
      id={id}
      className={cn(
        'relative flex h-fit w-full flex-col items-center justify-center',
        className,
      )}
    >
      <div className='flex h-fit w-full pb-[56.25%]' />
      <ReactPlayer
        controls={true}
        className='absolute left-0 top-0 flex'
        height='100%'
        width='100%'
        {...props}
      />
    </div>
  );
};
