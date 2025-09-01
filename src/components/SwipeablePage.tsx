
import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';

interface SwipeablePageProps {
  children: React.ReactNode;
  left?: string;
  right?: string;
}

const SwipeablePage: React.FC<SwipeablePageProps> = ({ children, left, right }) => {
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (right) {
        navigate(right, { state: { direction: 'right' } });
      }
    },
    onSwipedRight: () => {
      if (left) {
        navigate(left, { state: { direction: 'left' } });
      }
    },
    trackMouse: true,
  });

  return (
    <div {...handlers} style={{ height: '100%', touchAction: 'pan-y' }}>
      {children}
    </div>
  );
};

export default SwipeablePage;
