export const extractYouTubeVideoId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.searchParams.get('v')) {
      return urlObj.searchParams.get('v');
    }
    if (urlObj.pathname.startsWith('/shorts/')) {
      return urlObj.pathname.split('/shorts/')[1]?.split('?')[0] || null;
    }
    if (urlObj.pathname.startsWith('/embed/')) {
      return urlObj.pathname.split('/embed/')[1]?.split('?')[0] || null;
    }
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.substring(1).split('?')[0];
    }
    return null;
  } catch {
    return null;
  }
};

const commonVideoCheck = (url: string | null) => {
  if (!url) return null; 

  if (url.startsWith('/upload/') && /\.(mp4|webm|ogg|mov)$/i.test(url)) {
    return { type: 'video', src: url } as const; 
  }

  try {
    const urlObj = new URL(url);

    if (/\.(mp4|webm|ogg|mov)$/i.test(urlObj.pathname)) {
      return { type: 'video', src: url } as const; 
    }

    if (
      urlObj.hostname.includes('youtube.com') ||
      urlObj.hostname.includes('youtu.be')
    ) {
      const videoId = extractYouTubeVideoId(url); 
      if (videoId) {
        return { type: 'iframe', service: 'youtube', videoId } as const; 
      }
    }

    if (urlObj.hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.substring(1).split('?')[0];
      if (videoId) {
        return { type: 'iframe', service: 'vimeo', videoId } as const; 
      }
    }
  } catch (error) {
    if (url.startsWith('/') && /\.(mp4|webm|ogg|mov)$/i.test(url)) {
      return { type: 'video', src: url } as const; 
    }
    console.error('Invalid media URL:', url, error);
    return null;
  }
  return null;
};

export const getCardVideoEmbedInfo = (
  url: string | null
): { type: 'iframe' | 'video'; src: string } | null => {
  const info = commonVideoCheck(url); 
  if (!info) return null;

  if (info.type === 'video') {
    return { type: 'video', src: info.src };
  }

  if (info.type === 'iframe') {
    if (info.service === 'youtube') {
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${info.videoId}?autoplay=1&mute=1&loop=1&playlist=${info.videoId}&controls=0&playsinline=1`,
      };
    }
    if (info.service === 'vimeo') {
      return {
        type: 'iframe',
        src: `https://player.vimeo.com/video/${info.videoId}?autoplay=1&muted=1&loop=1&background=1`,
      };
    }
  }
  return null;
};

export const getModalVideoEmbedInfo = (
  url: string | null
): { type: 'iframe' | 'video'; src: string } | null => {
  const info = commonVideoCheck(url); 
  if (!info) return null;

  if (info.type === 'video') {
    return { type: 'video', src: info.src };
  }

  if (info.type === 'iframe') {
    if (info.service === 'youtube') {
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${info.videoId}?autoplay=1&mute=0&loop=1&playlist=${info.videoId}&controls=1&playsinline=1`,
      };
    }
    if (info.service === 'vimeo') {
      return {
        type: 'iframe',
        src: `https://player.vimeo.com/video/${info.videoId}?autoplay=1&muted=0&loop=1&controls=1`,
      };
    }
  }
  return null;
};

export const validateImageUrl = (url: string): boolean => {
  if (!url) return false;

  if (url.startsWith('/upload/')) return true;

  try {
    const urlObj = new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname);
  } catch {
    return false;
  }
};

export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = (originalName.split('.').pop() || 'file').replace(
    /[^a-zA-Z0-9]/g,
    ''
  );
  return `${timestamp}-${randomString}.${extension}`;
};