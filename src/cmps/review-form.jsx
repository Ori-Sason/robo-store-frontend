import { useState } from 'react'
import { StarRatePicker } from './star-rate-picker'

export const ReviewForm = ({ isOpen }) => {

    const [review, setReview] = useState({ title: '', rate: 1, description: '' })

    const onInputChange = ({ target: { name, value } }) => {
        setReview({ ...review, [name]: value })
    }
    
    const onSetRate = (rate) => {
        setReview({ ...review, rate })
    }

    return <section className={`review-form ${isOpen ? 'open' : 'close'}`}>
        <h2 className='sub-header'>Add a review</h2>
        <form>
            <ul className='clean-list'>
                <li>
                    <input type="text" name="title" value={review.title} onChange={onInputChange} 
                        placeholder="Review title" autoFocus required />
                </li>
                <li>
                    <StarRatePicker rate={review.rate} maxRate={5} onSetRate={onSetRate}/>
                </li>
                <li>
                    <textarea name="description" value={review.description} onChange={onInputChange} 
                        placeholder="Review description (Optional)"></textarea>
                </li>
            </ul>
            <button className='main-btn'>Add</button>
        </form>
    </section>
}