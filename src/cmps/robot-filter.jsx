import { useMemo, useState } from 'react'
import { robotService } from '../services/robot.service'

export const RobotFilter = ({ onFilterBy }) => {

    const [filterBy, setFilterBy] = useState(null)
    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)

    const onInputChange = ({ target: { name, value, selectedOptions } }) => {
        if (name === 'labels') value = Array.from(selectedOptions).map(option => option.value)
        else if (name === 'inStock') value = value === 'true'
        setFilterBy({ ...filterBy, [name]: value })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        onFilterBy(filterBy)
    }

    const labels = useMemo(() => robotService.getLabels(), [])

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
            {isSelectMenuOpen && <select className="labels-select" name="labels" id="filter-labels" multiple onChange={onInputChange} size={labels.length}>
                {labels.map(label => <option key={label}>{label}</option>)}
            </select>}
        </div>

        <button type="submit">Search</button>
    </form>
}