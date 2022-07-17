export const QuestionModal = ({ question, answers, cbFuncs, setModalFunc }) => {

    const onButtonClick = (idx) => {
        cbFuncs[idx]()
        setModalFunc(null)
    }

    return <section className="question-modal">
        <section className='backlog' onClick={() => setModalFunc(null)}></section>
        <section className='modal'>
            <h2>{question}</h2>
            <section className='answers'>
                {answers.map((answer, idx) => <button className="main-btn" key={idx} onClick={() => onButtonClick(idx)}>{answer}</button>)}
            </section>
        </section>
    </section>
}