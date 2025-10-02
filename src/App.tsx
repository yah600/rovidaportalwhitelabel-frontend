import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: 'black' }}>
              <h1>Hello from App!</h1>
            </div>
          } />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;