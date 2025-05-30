import {createRoot} from 'react-dom/client'
import {StrictMode} from "react";
import { App } from './components';
import './index.module.scss';
import './index.scss';
import { store } from './services/store';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(domNode)


root.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
)