import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { robotService } from '../services/robot.service'

import defaultRobotImg from '../assets/img/default-robot.png'
import { saveRobot } from '../store/actions/robot.action'

export const RobotEdit = () => {

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [robot, setRobot] = useState(robotService.getEmptyRobot())
    const [labels, setLabels] = useState(null)

    useMemo(() => {
        ; (async function () {
            const labels = await robotService.getLabels()
            setLabels(labels)
        })()
    }, [])

    useEffect(() => {
        if (params.id) (async function () {
            const robot = await robotService.getById(params.id)
            console.log('paramsId',)
            setRobot(robot)
        })();
    }, [params.id])

    const onChangeInput = ({ target: { name, value } }) => {
        if (name === 'labels') {
            let updatedLabels = [...robot.labels]

            if (updatedLabels.includes(value)) updatedLabels = updatedLabels.filter(label => label !== value)
            else updatedLabels.push(value)

            value = updatedLabels.sort()
        } else if (name === 'inStock') {
            value = value === 'true'
        }

        setRobot({ ...robot, [name]: value })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        if (!robot.labels.length) return /* FIX - user msg required */
        dispatch(saveRobot(robot))
        navigate(`/`)
    }

    return <section className="robot-edit main-layout">
        <h2 className='page-header'>Edit</h2>
        <form onSubmit={onSubmit}>
            <ul className='clean-list'>
                <li className='edit-name-container'>
                    <label htmlFor="edit-name">Name: </label>
                    <input type="text" name='name' id='edit-name' onChange={onChangeInput} value={robot.name} />
                </li>
                <li className='edit-img-container'>
                    <div>
                        <label htmlFor="edit-img">Image: </label>
                        <input type="url" name='img' id='edit-img' onChange={onChangeInput} value={robot.img} />
                    </div>
                    <img src={robot.img || defaultRobotImg} onError={({ target }) => target.src = defaultRobotImg} alt="default robot" />
                </li>
                <li>
                    <label htmlFor="edit-price">Price: </label>
                    <input type="number" min={1} name='price' id='edit-price' onChange={onChangeInput} value={robot.price} />
                </li>
                <li className='edit-labels-container'>
                    {labels && <>
                        <label htmlFor={labels[0] || ''}>Labels: </label>
                        <ul className='clean-list'>
                            {labels.map(label => <li key={label}>
                                <input type="checkbox" name='labels' id={label} onChange={onChangeInput} value={label} checked={robot.labels.includes(label)} />
                                <label htmlFor={label}>{label}</label>
                            </li>)}
                        </ul>
                    </>}
                </li>
                <li>
                    <label htmlFor="filter-in-stock-yes">In stock: </label>
                    <input type="radio" name="inStock" id="edit-in-stock-yes" value={true} onChange={onChangeInput} checked={robot.inStock} />
                    <label htmlFor="edit-in-stock-yes">Yes</label>
                    <input type="radio" name="inStock" id="edit-in-stock-no" value={false} onChange={onChangeInput} checked={!robot.inStock} />
                    <label htmlFor="edit-in-stock-no">No</label>
                </li>
            </ul>
            <button className='main-btn' type="submit">Save</button>
        </form>
    </section>
}