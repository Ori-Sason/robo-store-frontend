import { Link, NavLink } from 'react-router-dom'
import logoImg from '../assets/img/logo.png'

export const AppHeader = () => {
    return <section className="app-header">
        <main className="main-layout">
            <Link to="/" className="logo"><img src={logoImg} alt="Robo Store logo" /></Link>
            <nav>
                <NavLink to="/" exact="true">Home</NavLink>
            </nav>
        </main>
    </section>
}