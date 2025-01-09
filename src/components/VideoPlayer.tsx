'use client';

import React, { useRef, useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { getVideoPath } from '@/utils/paths';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export default function VideoPlayer({ src, poster }: VideoPlayerProps): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoJsOptions = {
      controls: true,
      fluid: true,
      responsive: true,
      sources: [{
        src: getVideoPath(src),
        type: 'video/mp4'
      }],
      poster: poster ? getVideoPath(poster) : undefined,
      html5: {
        vhs: {
          overrideNative: true
        },
        nativeAudioTracks: false,
        nativeVideoTracks: false
      }
    };

    playerRef.current = videojs(videoRef.current, videoJsOptions, function onPlayerReady() {
      console.log('Video Player Ready');
    });

    playerRef.current.on('error', function() {
      const error = playerRef.current?.error();
      setError(error ? error.message : 'An error occurred while loading the video');
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src, poster]);

  if (error) {
    return (
      <div className="bg-red-900/20 p-4 rounded-lg text-red-200">
        <p>Error loading video: {error}</p>
      </div>
    );
  }

  return (
    <div data-vjs-player className="video-container">
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
      <style jsx>{`
        .video-container {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          border-radius: 0.5rem;
          background-color: rgba(0, 0, 0, 0.2);
        }
        :global(.video-js) {
          width: 100%;
          height: auto;
          aspect-ratio: 16/9;
        }
      `}</style>
    </div>
  );
} 