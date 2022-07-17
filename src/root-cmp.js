import { Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header';
import { RobotApp } from './pages/robot-app';
import { LoginSignUp } from './pages/login-signup';
import { RobotDetails } from './pages/robot-details';
import { RobotEdit } from './pages/robot-edit';
import { UserEdit } from './pages/user-edit';
import { UserProfile } from './pages/user-profile';
import { UserApp } from './pages/users-app';

export function App() {
  return <section className="app">
    <AppHeader />
    <main>
      <Routes>
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/signup' element={<LoginSignUp />} />
        <Route path='/robots' element={<RobotApp />} />
        <Route path='/robots/:id' element={<RobotDetails />} />
        <Route path='/robots/edit/:id' element={<RobotEdit />} />
        <Route path='/robots/edit/' element={<RobotEdit />} />
        <Route path='/users/:id' element={<UserProfile />} />
        <Route path='/users/edit/:id' element={<UserEdit />} />
        <Route path='/users' element={<UserApp />} />
        <Route path='*' element={<RobotApp />} /> {/* FIX - change to Home */}
      </Routes>
    </main>
  </section>
}
