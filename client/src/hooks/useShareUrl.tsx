'use client';

import { useEffect, useState } from 'react';

export function useShareUrl(chatId: string) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/overview/${chatId}`);
    }
  }, [chatId]);

  return shareUrl;
}
