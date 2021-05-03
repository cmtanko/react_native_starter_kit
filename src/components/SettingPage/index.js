import React from 'react';

import {
  SettingsContainer,
  SettingsContent,
  SettingsButton,
  SettingsTitle,
  SettingsIcon,
} from './styles';

const SettingPage = () => {
  const importDatabase = () => {
    alert('import database');
  };

  const exportDatabase = () => {
    alert('Export database');
  };

  return (
    <SettingsContainer>
      <SettingsContent>
        <SettingsButton iconLeft transparent onPress={() => importDatabase()}>
          <SettingsIcon name="md-cloud-download-sharp" />
          <SettingsTitle>Import Database</SettingsTitle>
        </SettingsButton>
        <SettingsButton iconLeft transparent onPress={() => exportDatabase()}>
          <SettingsIcon name="md-cloud-upload-sharp" />
          <SettingsTitle>Export Database</SettingsTitle>
        </SettingsButton>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default SettingPage;
