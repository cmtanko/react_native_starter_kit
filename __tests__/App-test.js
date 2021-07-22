/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

// Wipe everything
// Intro screen must be visible
// Add new Record
// Add new Account from record page
// Add new category from record page
// Add new record with attachments
