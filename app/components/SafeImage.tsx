'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

const SafeImage = (props: ImageProps) => {
  const { src } = props;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  let isSrcValid = false;
  if (src && typeof src === 'string') {
    isSrcValid = src.startsWith('http') || src.startsWith('/') || src.startsWith('blob:');
  } else if (src && typeof src === 'object') {
    isSrcValid = true;
  }

  if (error || !isSrcValid) {
    return null;
  }

  return (
    <Image
      {...props}
      onError={() => {
        setError(true);
      }}
    />
  );
};

export default SafeImage;
