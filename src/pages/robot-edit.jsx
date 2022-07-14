export const RobotEdit = () => {
    return <section className="robot-edit">
        <h2>Edit</h2>
        <ul className='clean-list'>
            <li>
                <label htmlFor="edit-name">Name: </label>
                <input type="text" name='name' id='edit-name' />
            </li>
        </ul>
    </section>
}