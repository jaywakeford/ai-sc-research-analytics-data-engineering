declare module 'react-h5-audio-player' {
  import { ComponentType } from 'react';

  export const RHAP_UI: {
    CURRENT_TIME: string;
    CURRENT_LEFT_TIME: string;
    PROGRESS_BAR: string;
    DURATION: string;
    ADDITIONAL_CONTROLS: string;
    MAIN_CONTROLS: string;
    VOLUME_CONTROLS: string;
  };

  export interface H5AudioPlayerProps {
    src: string;
    autoPlay?: boolean;
    showJumpControls?: boolean;
    showSkipControls?: boolean;
    showDownloadProgress?: boolean;
    layout?: 'horizontal' | 'vertical' | 'stacked';
    customProgressBarSection?: string[];
    customControlsSection?: string[];
    customAdditionalControls?: string[];
    customVolumeControls?: string[];
    className?: string;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onClickPrevious?: () => void;
    onClickNext?: () => void;
    onError?: (error: Error) => void;
    style?: React.CSSProperties;
  }

  const H5AudioPlayer: ComponentType<H5AudioPlayerProps>;
  export default H5AudioPlayer;
} 