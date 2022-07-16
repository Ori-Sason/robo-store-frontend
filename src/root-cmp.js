import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header';
import { Home } from './pages/home';
import { LoginSignUp } from './pages/login-signup';
import { RobotDetails } from './pages/robot-details';
import { RobotEdit } from './pages/robot-edit';

export function App() {
  return <section className="app">
    <AppHeader />
    <main>
      <Routes>
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/signup' element={<LoginSignUp />} />
        <Route path='/robots/:id' element={<RobotDetails />} />
        <Route path='/robots/edit/:id' element={<RobotEdit />} />
        <Route path='/robots/edit/' element={<RobotEdit />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  </section>
}
