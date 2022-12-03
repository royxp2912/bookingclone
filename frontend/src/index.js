import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './Components/Global';
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthenContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <SearchContextProvider>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </SearchContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
