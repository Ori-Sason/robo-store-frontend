import { useRef, useState } from 'react'
import { robotService } from '../services/robot.service'

export const RobotFilter = ({ onFilterBy }) => {

    const [filterBy, setFilterBy] = useState(null)
    const [sortBy, setSortBy] = useState(null)
    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)

    const onInputChange = ({ target: { name, value, selectedOptions } }) => {
        if (name === 'labels') value = Array.from(selectedOptions).map(option => option.value)
        else if (name === 'inStock') value = value === 'true'
        setFilterBy({ ...filterBy, [name]: value })
    }

    const onSortByChange = ({ target: { name } }) => {
        if (sortBy === name) return setSortBy(null)
        setSortBy(name)
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        const updatedFilterBy = { ...filterBy, sortBy }
        onFilterBy(updatedFilterBy)
    }

    const labels = useRef(robotService.getLabels())

    return <form className="robot-filter" onSubmit={onSubmit}>
        <input type="text" name="name" id="" placeholder='Robot name' value={filterBy?.name || ''} onChange={onInputChange} />

        <div className='in-stock'>
            <label htmlFor="">In Stock: </label>
            <input type="radio" name="inStock" id="filter-in-stock-yes" value={true} onChange={onInputChange} />
            <label htmlFor="filter-in-stock-yes">Yes</label>
            <input type="radio" name="inStock" id="filter-in-stock-no" value={false} onChange={onInputChange} />
            <label htmlFor="filter-in-stock-no">No</label>
        </div>

        <div className='labels-container'>
            <label htmlFor="filter-labels">Labels: </label>
            <span onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                <input type="text" value={filterBy?.labels?.join(', ') || ''} disabled />
            </span>
            {isSelectMenuOpen && <select className="labels-select" name="labels" id="filter-labels" multiple onChange={onInputChange} size={labels.current.length}>
                {labels.current.map(label => <option key={label}>{label}</option>)}
            </select>}
        </div>

        <div className='sort-container'>
            <label htmlFor="">Sort: </label>
            <button className={sortBy === 'name' ? 'active' : ''} name='name' onClick={onSortByChange}>Name</button>
            <button className={sortBy === 'price' ? 'active' : ''} name='price' onClick={onSortByChange}>Price</button>
            <button className={sortBy === 'createdAt' ? 'active' : ''} name='createdAt' onClick={onSortByChange}>Created Date</button>
        </div>

        <button className='main-btn' type="submit">Search</button>
    </form>
}