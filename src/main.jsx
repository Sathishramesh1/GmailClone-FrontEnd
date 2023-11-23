import React,{ lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux' ;
import { store, persistor } from './components/redux-container/slices/persistant.js';
import { PersistGate } from 'redux-persist/integration/react'
import { BounceLoader } from 'react-spinners';

const App = lazy(() => import('./App.jsx'));


ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <Suspense fallback={
  <div>
  <BounceLoader
  color="#1d71e2"
  size={200}
  cssOverride={{margin:'15% auto'}}/></div> }>
  <App />
 
  </Suspense>
    
    </PersistGate>
    </Provider>
    
   
)


