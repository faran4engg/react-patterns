import React, { useState, useLayoutEffect } from 'react';

import mojs from 'mo-js';

import userStyles from './usage.css';

/** ====================================
 *          🔰Hook
      Hook for Animation
==================================== **/

const useClapAnimation = ({
  duration: tlDuration,
  bounceEl,
  fadeEl,
  burstEl
}) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    new mojs.Timeline()
  );

  useLayoutEffect(() => {
    if (!bounceEl || !fadeEl || !burstEl) {
      return;
    }

    const triangleBurst = new mojs.Burst({
      parent: burstEl,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        scale: 1,
        stroke: 'rgba(211,84,0 ,0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration
      }
    });

    const circleBurst = new mojs.Burst({
      parent: burstEl,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149,165,166 ,0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
      }
    });

    const countAnimation = new mojs.Html({
      el: bounceEl,
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -30 },
      opacity: { 0: 1 },
      duration: tlDuration
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2
    });

    const countTotalAnimation = new mojs.Html({
      el: fadeEl,
      isShowStart: false,
      isShowEnd: true,
      opacity: { 0: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 }
    });

    const scaleButton = new mojs.Html({
      el: burstEl,
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out
    });

    if (typeof burstEl === 'string') {
      const id = burstEl.slice(1, burstEl.length);
      const el = document.getElementById(id);
      el.style.transform = 'scale(1, 1)';
    } else {
      burstEl.style.transform = 'scale(1, 1)';
    }

    const updatedAnimationTimeline = animationTimeline.add([
      countAnimation,
      countTotalAnimation,
      scaleButton,
      circleBurst,
      triangleBurst
    ]);

    setAnimationTimeline(updatedAnimationTimeline);
  }, [tlDuration, animationTimeline, bounceEl, fadeEl, burstEl]);

  return animationTimeline;
};

/** ====================================
      *        🔰USAGE
      Below's how a potential user
      may consume the component API
  ==================================== **/

const CupBowl = () => {
  // Credit: Created by Kieu Thi Kim Cuong from the Noun Project
  return (
    <svg
      id="cupBowl"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26.09 13.71"
    >
      <g>
        <path d="M26.06.36A.54.54 0 0 0 26 .18h-.05l-.1-.07a.32.32 0 0 0-.09 0H.5A.5.5 0 0 0 0 .5v.06c.09.69.21 1.38.35 2.07a.65.65 0 0 1 0 .53.65.65 0 0 1 .07.56.7.7 0 0 1 0 .76 6.18 6.18 0 0 1 .35 1.66.6.6 0 0 1 .14.45.6.6 0 0 1 .09.32.64.64 0 0 1 .33.79 5.94 5.94 0 0 1 1.1 2.84.48.48 0 0 1 .38.18.58.58 0 0 1 .4.16.58.58 0 0 1 .36.36h.06c.27.45.55.9.85 1.33a2.54 2.54 0 0 0 2.1 1.1h12.85a3 3 0 0 0 .73-.11.51.51 0 0 0 .7-.1c.2-.27.38-.55.57-.82a.34.34 0 0 0 .08-.09c.06-.09.12-.19.19-.28l.41-.65c.31-.48.6-1 .87-1.48l.41-.79c.25-.5.48-1 .7-1.52l.33-.79c.1-.26.19-.53.29-.79s.19-.53.27-.81.17-.56.25-.84.15-.52.22-.78.15-.66.22-1 .1-.43.14-.65c.1-.55.19-1.11.26-1.67a.44.44 0 0 0-.01-.14z" />
      </g>
    </svg>
  );
};

const CupHandle = () => {
  // Credit: Created by Kieu Thi Kim Cuong from the Noun Project
  return (
    <svg
      id="cupHandle"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 7.59 7.81"
    >
      <g>
        <path
          d="M2.19 6.08C1.09 5.21.19 3.62.6 2.29A2.66 2.66 0 0 1 2.36.55a3.8 3.8 0 0 1 1.82.2 27.34 27.34 0 0 0 2.55 6.53 7.33 7.33 0 0 1-4.54-1.2z"
          fill="none"
          stroke="#000"
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
};

const Stream = () => {
  // Credit: Created by Kieu Thi Kim Cuong from the Noun Project
  return (
    <svg
      id="stream"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10.03 22.44"
    >
      <g>
        <path d="M7.53 22.35a.5.5 0 0 0 .69-.13A10 10 0 0 0 8 10.43a5.14 5.14 0 0 1 1.52-7.51.49.49 0 0 0 .13-.69.5.5 0 0 0-.65-.17 6.14 6.14 0 0 0-1.8 9 9 9 0 0 1 .2 10.59.5.5 0 0 0 .12.69zM1.54 20.35a.5.5 0 0 0 .69-.12A10 10 0 0 0 2 8.44a5.15 5.15 0 0 1 1-7.2c.15-.11.31-.21.47-.31a.5.5 0 0 0 .24-.68A.51.51 0 0 0 3 .07 6.15 6.15 0 0 0 .85 8.48c.12.19.24.38.38.56a9 9 0 0 1 .18 10.61.51.51 0 0 0 .13.7z" />
      </g>
    </svg>
  );
};

const CupBase = () => {
  // Credit: Created by Kieu Thi Kim Cuong from the Noun Project
  return (
    <svg id="cupBase" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.76 1">
      <g>
        <path d="M21.26 0H.5a.5.5 0 0 0-.5.5.5.5 0 0 0 .5.5h20.76a.5.5 0 0 0 .5-.5.5.5 0 0 0-.5-.5z" />
      </g>
    </svg>
  );
};

const Usage = () => {
  const animationTimeline = useClapAnimation({
    duration: 300,
    bounceEl: '#stream',
    fadeEl: '#cupHandle',
    burstEl: '#coffee'
  });

  const handleClick = () => {
    animationTimeline.replay();
  };

  return (
    <section className={userStyles.cupContainer}>
      <div className={userStyles.cupStream}>
        <Stream />
      </div>
      <div id="coffee" style={{ fontSize: '0.5rem' }}>
        coffee
      </div>
      <div className={userStyles.cupBody}>
        <CupHandle />
        <CupBowl />
      </div>
      <div>
        <CupBase />
      </div>
      <footer>
        <button onClick={handleClick}>Animate</button>
      </footer>
    </section>
  );
};

export default Usage;
