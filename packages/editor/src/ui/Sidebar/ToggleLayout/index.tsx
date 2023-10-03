import ViewQuilt from '@mui/icons-material/ViewQuilt';
import React from 'react';
import {
  useIsLayoutMode,
  useSetLayoutMode,
} from '../../../core/components/hooks';
import Button from '../Button';
type Props = {
  label: string;
};

const ToggleLayout: React.FC<Props> = ({ label }) => {
  const isLayoutMode = useIsLayoutMode();
  const setLayoutMode = useSetLayoutMode();
  return (
    <Button
      // icon={<ViewQuilt />}
      icon={<i className="fas fa-fw fa-up-down-left-right" />}
      description={label}
      active={isLayoutMode}
      onClick={setLayoutMode}
    />
  );
};

export default React.memo(ToggleLayout);
