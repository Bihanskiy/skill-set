import React, { FC } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS: FC<any> = (props) => {
  const videoRef = React.useRef<any>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady } = props;

  React.useEffect(() => {

    if (options.sources[0].src) {
      if (!playerRef.current) {
        const videoElement = document.createElement("video-js");

        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current?.appendChild(videoElement);

        const player = playerRef.current = videojs(videoElement, options, () => {
          onReady && onReady(player);
        });

      } else {
        const player = playerRef.current;

        player.autoplay(options.autoplay);
        player.src(options.sources);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;