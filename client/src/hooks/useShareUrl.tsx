'use client';

import { encrypt } from '@/utils/encryption';
import { useEffect, useState } from 'react';

export function useShareUrl(chatId: string) {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = encrypt(chatId);
      const url = `${window.location.origin}/overview/${chatId}?token=${token}`;
      setShareUrl(url);
    }
  }, [chatId]);

  return shareUrl;
}
