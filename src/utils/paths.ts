export const getBasePath = () => {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // For client-side rendering
  if (typeof window !== 'undefined') {
    return window.location.pathname.startsWith(basePath) ? basePath : '';
  }
  
  // For server-side rendering
  return basePath;
};

export const getMediaPath = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.replace(/^\/+/, '');
  return `${basePath}/media/${cleanPath}`;
};

export const getImagePath = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.replace(/^\/+/, '');
  return `${basePath}/images/${cleanPath}`;
};

export const getPdfPath = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.replace(/^\/+/, '');
  return `${basePath}/media/pdfs/${cleanPath}`;
};

export const getAudioPath = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.replace(/^\/+/, '');
  return `${basePath}/media/audio/${cleanPath}`;
};

export const getVideoPath = (path: string): string => {
  const basePath = getBasePath();
  const cleanPath = path.replace(/^\/+/, '');
  return `${basePath}/media/videos/${cleanPath}`;
}; 