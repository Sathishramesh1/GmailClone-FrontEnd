// TransitionWrapper.jsx
import React, { useState, useEffect } from 'react';
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';

import styles from './TransitionWrapper.module.css'// Adjust the import path based on your file structure

const TransitionWrapper = ({ children }) => {
  const [open, setOpen] = useState(false);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? [{ id: 1 }, { id: 2 }] : [], {
    ref: transApi,
    trail: 400 / 2, // Assuming two items in the transition
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  // Start the animation automatically when the component mounts
  useEffect(() => {
    setOpen(true);
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div >
      <animated.div
        style={{ ...rest, width: size, height: size }}
       
      >
        {transition((style, item) => (
          <animated.div
           
           
          />
        ))}
      </animated.div>
      {children}
    </div>
  );
};

export default TransitionWrapper;
