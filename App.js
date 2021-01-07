import React from 'react';
import { StateProvider } from './utils/context';
import reducer from './utils/reducer';
import Main from './views/Main';

export default () => {
  return (
    <StateProvider reducer={reducer}>
      <Main />
    </StateProvider>
  );
}