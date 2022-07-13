import { useMemo, useState } from 'react'
import { robotService } from '../services/robot.service'

export const RobotFilter = () => {

    const [filterBy, setFilterBy] = useState(null)
    const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)

    const onInputChange = ({ target: { name, value, selectedOptions } }) => {
        if (name === 'labels') value = Array.from(selectedOptions).map(option => option.value)
        setFilterBy({ ...filterBy, [name]: value })
    }

    const labels = useMemo(() => robotService.getLabels(), [])

    return <form className="robot-filter">
        <input type="text" name="name" id="" placeholder='Robot name' />

        <div className='in-stock'>
            <label htmlFor="">In Stock: </label>
            <input type="radio" name="inStock" id="filter-in-stock-yes" value='true' />
            <label htmlFor="filter-in-stock-yes">Yes</label>
            <input type="radio" name="inStock" id="filter-in-stock-no" value='false' />
            <label htmlFor="filter-in-stock-no">No</label>
        </div>

        <div className='labels-container'>
            <label htmlFor="filter-labels">Labels: </label>
            <span onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}>
                <input type="text" value={filterBy?.labels?.join(', ')} disabled />
            </span>
            {isSelectMenuOpen && <select className="labels-select" name="labels" id="filter-labels" multiple onChange={onInputChange} size={labels.length}>
                {labels.map(label => <option key={label}>{label}</option>)}
            </select>}
        </div>

        <button type="submit">Search</button>
    </form>
}