import { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Avatar({
  className,
  user,
  size = 44,
}: {
  user: User;
  className?: string;
  size?: number;
}) {
  return (
    <Image
      className={cn(
        'h-11 w-11 rounded-full bg-blue-500 transition-opacity hover:bg-black hover:opacity-80',
        className
      )}
      src={
        user.imgSrc || `https://i.pravatar.cc/${size * 2}?u=${user.username}`
      }
      alt='profile pic'
      width={size}
      height={size}
    />
  );
}
