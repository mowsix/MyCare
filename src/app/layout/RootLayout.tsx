import React, { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import './transitions.scss';

export default function RootLayout() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames={location.state?.direction === 'left' ? 'page-left' : 'page'}
      >
        <div ref={nodeRef} style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <Outlet />
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}