import type { ReactNode } from 'react';
import React from 'react';

interface ICustomTooltipProps {
  text: string;
  children: ReactNode;
}

export const CustomTooltip = (props: ICustomTooltipProps) => {
  return (
    <></>
    // <OverlayTrigger
    //   placement="left"
    //   trigger={['hover', 'click']}
    //   overlay={<Tooltip id="button-tooltip">{props.text}</Tooltip>}
    // >
    //   {props.children}
    // </OverlayTrigger>
  );
};
