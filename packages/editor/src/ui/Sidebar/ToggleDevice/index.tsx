import Create from '@mui/icons-material/Create';

import React from 'react';
import {
  useOnMobile,
  useToggleOnMobile,
  useUiTranslator,
} from '../../../core/components/hooks';
import Button from '../Button/index';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
  label: string;
};

const ToggleDevice: React.FC<Props> = () => {
  const { t } = useUiTranslator();
  const onMobile = useOnMobile();
  const toggleOnMobile = useToggleOnMobile();

  const label = t(onMobile ? 'Switch to Desktop' : 'Switch to Mobile') ?? '';

  return (
    <OverlayTrigger overlay={<Tooltip>{t(label) ?? ''}</Tooltip>}>
      <Button
        //icon={<Create />}
        icon={
          <i
            className={`fas fa-fw ${
              onMobile ? 'fa-laptop' : 'fa-mobile-screen'
            }`}
          />
        }
        description={label}
        active={onMobile}
        onClick={toggleOnMobile}
      />
    </OverlayTrigger>
  );
};

export default React.memo(ToggleDevice);
