import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';
import { useShipments, VIEW_MODE } from './hooks/useShipments.js';
import { LoginPage } from './pages/LoginPage.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { TopBar } from './components/TopBar.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { ShipmentsView } from './components/ShipmentsView.jsx';

function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('Shipments');
  const [activeNav, setActiveNav] = useState('shipments');

  const auth = useAuth();
  const shipmentsHook = useShipments(auth.token);

  return (
    <div className="app-shell">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} auth={auth} />
      <div className="layout-main">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
        <main className="main-content">
          <ShipmentsView shipmentsHook={shipmentsHook} user={auth.user} />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

