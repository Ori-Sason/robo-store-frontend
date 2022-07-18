import { ReviewPreview } from './review-preview'

export const ReviewList = ({ reviews, isShowWriter, isShowRobot }) => {
    return <ol className="review-list" reversed>
        {reviews.map(review => <ReviewPreview key={review._id} review={review} isShowWriter={isShowWriter} isShowRobot={isShowRobot} />)}
    </ol>
}