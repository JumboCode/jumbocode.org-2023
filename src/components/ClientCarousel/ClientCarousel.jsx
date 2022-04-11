import React, { useEffect, useState } from 'react';

import clients from './clients';
import ClientLogo from './ClientLogo';
import styles from './ClientCarousel.module.scss';
import { totalWidth } from './constants';

export default function ClientCarousel() {
  const [keyframes, setKeyframes] = useState(null);
  useEffect(() => {
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    const styleSheet = styleElement.sheet;

    const screenWidth = window.innerWidth;
    const maxLogoWidth = 300; // from max-width of logo in .sxss, in px
    const farLeft = (maxLogoWidth / screenWidth) * 100; // starting position in %
    const carouselWidth = totalWidth + farLeft;

    const dynamicKeyframes = clients.map((client, index) => {
      const safeStartingX = client.startingX % carouselWidth;
      const adjustedX = safeStartingX + farLeft;
      const timeAtMax = ((carouselWidth - adjustedX) / carouselWidth) * 100;

      const keyframe = `@keyframes carousel-animation-${index} {
        0% {
          left: ${safeStartingX}%;
        }
        ${timeAtMax}% {
          left: ${totalWidth}%;
        }
        ${timeAtMax + 0.001}% {
          left: -${farLeft}%;
        }
        100% {
          left: ${safeStartingX}%;
        }
      }
      `;
      styleSheet.insertRule(keyframe, 0);
      return keyframe;
    });

    setKeyframes(dynamicKeyframes);
  }, []);

  return (
    <div className={styles.clientCarouselFullWidthContainer}>
      <div className={styles.clientCarouselInnerContainer}>
        {clients.map((client, index) => (
          <ClientLogo
            client={client}
            animation={`carousel-animation-${index}`}
            keyframes={keyframes}
            key={client.name}
          />
        ))}
      </div>
    </div>
  );
}
