import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './animation.css';

export const Animator = ({ children, type, timeout, delayIn, delayOut, onState }) => {
  const [_in, setIn] = React.useState(false);

  React.useEffect(() => {
    if (onState) {
      if (delayIn) {
        setTimeout(() => {
          setIn(onState);
        }, delayIn);
      } else {
        setIn(onState);
      }
    } else {
      if (delayOut) {
        setTimeout(() => {
          setIn(onState);
        }, delayOut);
      } else {
        setIn(onState);
      }
    }
  }, [onState, delayIn, delayOut]);

  return (
    <CSSTransition in={_in} timeout={timeout} classNames={type} unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export const Animate = ({ children, type, ...props }) => {
  return (
    <CSSTransition {...props} classNames={type} unmountOnExit>
      {children}
    </CSSTransition>
  );
};

export const AnimateGroup = ({ className, data, type, html }) => {
  return (
    <TransitionGroup className={className}>
      {data.map((item, _i) => (
        <CSSTransition key={`${_i}`} timeout={500} classNames={type}>
          <div>{html(item, _i)}</div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
