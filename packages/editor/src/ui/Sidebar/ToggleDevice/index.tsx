import React, { useState } from 'react';
import Button from '../Button';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { DeviceType } from '../../../core/types/settings';

type Props = {
  active?: boolean;
  device?: DeviceType;
  onChange?(device: DeviceType): void;
  label: string;
};

const icons = {
  desktop: <DesktopWindowsIcon />,
  tablet: <TabletMacIcon />,
  mobile: <PhoneIphoneIcon />,
};

const descriptions = {
  desktop: 'Desktop mode',
  tablet: 'Tablet mode',
  mobile: 'Mobile mode',
};

const ToggleDevice: React.FC<Props> = React.memo(
  ({ device = DeviceType.DESKTOP, active = false, onChange, label }) => {
    const [currentDevice, setCurrentDevice] = useState<DeviceType>(device);

    const deviceData = React.useMemo(
      () => ({
        device: currentDevice,
        icon: icons[currentDevice],
        description: descriptions[currentDevice],
      }),
      [currentDevice]
    );

    const onClick = React.useCallback(() => {
      // Cycle through devices: desktop -> tablet -> mobile -> desktop
      let nextDevice: DeviceType;

      if (currentDevice === DeviceType.DESKTOP) {
        nextDevice = DeviceType.TABLET;
      } else if (currentDevice === DeviceType.TABLET) {
        nextDevice = DeviceType.MOBILE;
      } else {
        nextDevice = DeviceType.DESKTOP;
      }

      setCurrentDevice(nextDevice);
      if (onChange) {
        onChange(nextDevice);
      }
    }, [currentDevice, onChange]);

    return (
      <Button
        description={label || deviceData.description}
        icon={deviceData.icon}
        active={active}
        onClick={onClick}
      />
    );
  }
);

ToggleDevice.displayName = 'ToggleDevice';

export default ToggleDevice;
