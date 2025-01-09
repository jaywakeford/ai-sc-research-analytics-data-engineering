'use client';

import React from 'react';
import type { ReactElement } from 'react';
import H5AudioPlayer, { RHAP_UI, H5AudioPlayerProps } from 'react-h5-audio-player';
import { getAudioPath } from '@/utils/paths';
import 'react-h5-audio-player/lib/styles.css';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps): ReactElement {
  return (
    <div className="w-full">
      <H5AudioPlayer
        src={getAudioPath(src)}
        autoPlay={false}
        showJumpControls={true}
        layout="horizontal"
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
      />
    </div>
  );
} 