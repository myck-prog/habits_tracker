import React from 'react';
import { View, Text, Button } from 'react-native';
import StorageManager from './StorageManager';

const Settings = () => {
  const clearData = () => {
    StorageManager.clear();
  };

  return (
    <View>
      <Button title="Clear Data" onPress={clearData} />
    </View>
  );
};

export default Settings;