import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { useShipments, VIEW_MODE } from './hooks/useShipments.js';
import { TopBar } from './components/TopBar.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { ShipmentsView } from './components/ShipmentsView.jsx';

function App() {
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

export default App;

