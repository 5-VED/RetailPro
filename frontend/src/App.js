import React, { useState } from 'react';
import '@/App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddSale from './pages/AddSale';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Reports from './pages/Reports';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'login':
                return <Login onSwitchToSignup={() => handleNavigation('signup')} />;
            case 'signup':
                return <Signup onSwitchToLogin={() => handleNavigation('login')} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigation} />;
            case 'add-sale':
                return <AddSale onNavigate={handleNavigation} />;
            case 'products':
                return <Products onNavigate={handleNavigation} />;
            case 'customers':
                return <Customers onNavigate={handleNavigation} />;
            case 'reports':
                return <Reports onNavigate={handleNavigation} />;
            default:
                return <Login onSwitchToSignup={() => handleNavigation('signup')} />;
        }
    };

    return (
        <div className="App">{renderPage()}</div>
    );
}

export default App;
