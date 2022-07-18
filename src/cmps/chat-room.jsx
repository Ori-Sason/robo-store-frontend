import chatColor from '../assets/img/chat-color.png'
import chatBW from '../assets/img/chat-black-and-white.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const ChatRoom = ({ chat }) => {

    const [isOpenMode, setIsOpenMode] = useState(false)

    return <section className={`chat-room ${isOpenMode ? 'open' : 'close'}`}>
        <img className='chat-close' src={chatColor} alt="chat" onClick={(ev) => { ev.stopPropagation(); setIsOpenMode(true) }} />

        {isOpenMode && <form>
            <header>
                <div className="title">
                    <h2>Chat Room</h2>
                    <p className="typing-msg">Ori Sason is typing</p>
                </div>
                <button type="button" className='close-btn' onClick={(ev) => { ev.stopPropagation(); setIsOpenMode(false) }}>X</button>
            </header>

            <ul className="main-chat clean-list">
                {chat.map((msg, idx) => <li key={idx}>
                    {chat.user && <Link className='name' to={`/users/${chat.user._id}`}>{msg.user.fullname}:</Link>}
                    {!chat.user && <span className='name'>Guest:</span>}
                    <span className='content'> {msg.content}</span>
                </li>)}
                <li>
                    {/* <Link className='name' to={`/users/62d26f942db597878fc604a2`}>Ori:</Link> */}
                    <span className='name'>Guest:</span>
                    <span className='content'> This is a chat msg from me</span>
                </li>
            </ul>

            <section className='msg-container'>
                <input type="text" className='chat-msg' />
                <button className='main-btn'>Send</button>
            </section>
        </form>}
    </section>
}