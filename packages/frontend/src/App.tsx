import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './navigation/AppRoutes';
import { Provider } from 'react-redux';
import { storeFactory } from './state/StoreFactory';

const logRedux = false;
const store = storeFactory(logRedux, [], []);

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
}

// import React, { useEffect, useState } from 'react';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('/api/hello')
//       .then(response => response.text())
//       .then(message => setMessage(message));
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }

// export default App;
