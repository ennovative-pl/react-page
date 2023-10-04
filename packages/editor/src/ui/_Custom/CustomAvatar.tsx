import type { ReactNode } from 'react';
import React from 'react';

export const CustomAvatar = ({
  children,
  style,
  onClick,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <div className="m-2">
      <h2>
        <a role="button" onClick={onClick}>
          <span className="badge bg-light text-dark">{children}</span>
        </a>
      </h2>
    </div>
  );
};
