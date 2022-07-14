import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header';
import { Home } from './pages/home';
import { RobotDetails } from './pages/robot-details';
import { RobotEdit } from './pages/robot-edit';

export function App() {
  return <Router>
    <section className="app">
      <AppHeader />
      <main>
        <Routes>
          <Route path='/robots/:id' element={<RobotDetails />} />
          <Route path='/robots/edit/:id' element={<RobotEdit />} />
          <Route path='/robots/edit/' element={<RobotEdit />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </section>
  </Router>
}
