import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header';
import { Home } from './pages/home';

export function App() {
  return <section className="app">
    <AppHeader />
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  </section>
}
