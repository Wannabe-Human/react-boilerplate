import { VideoHTMLAttributes, useEffect, useRef } from 'react';

import hlsjs from 'hls.js';
import { isIOS } from 'react-device-detect';

export interface HLSVideoPlayerProps
  extends VideoHTMLAttributes<HTMLVideoElement> {
  type: 'm3u8';
  onNotSupported?: () => void;
}

/**
 * 사용법 (hls 지원하는 경우만 사용 가능)
 *
 * props 옵션
 * 자동재생 사용: autoPlay muted
 * 반복재생 사용: loop
 * 컨트롤러 사용: controls
 */
export const HLSVideoPlayer = ({
  src,
  type,
  onNotSupported,
  ...props
}: HLSVideoPlayerProps) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (src && type == 'm3u8' && hlsjs.isSupported()) {
      console.log('hls 비디오 시작');

      if (videoRef != null && videoRef.current) {
        const hls = new hlsjs();
        hls.on(hlsjs.Events.MEDIA_ATTACHED, function () {
          console.log('video and hls.js are now bound together !');
        });
        hls.on(hlsjs.Events.MANIFEST_PARSED, function (event, data) {
          console.log(
            'manifest loaded, found ' + data.levels.length + ' quality level',
          );
        });
        hls.on(hlsjs.Events.ERROR, function (event, data) {
          const errorType = data.type;
          const errorDetails = data.details;
          const errorFatal = data.fatal;
          console.log('hls 버그', errorType, errorDetails, errorFatal);

          switch (data.details) {
            case hlsjs.ErrorDetails.FRAG_LOAD_ERROR:
              // ....
              break;
            default:
              break;
          }
        });
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

        console.log('hls 객체', hls);
      }
    } else if (type == 'm3u8' && isIOS) {
      //ios 일 경우 순수 비디오 태그로도 재생이 가능하다
      if (videoRef != null && videoRef.current) {
        (videoRef.current as any).src = src;
      }
    } else {
      if (onNotSupported) onNotSupported();
    }
  }, [src, type, onNotSupported, videoRef]);

  return <video ref={videoRef} playsInline {...props}></video>;
};
