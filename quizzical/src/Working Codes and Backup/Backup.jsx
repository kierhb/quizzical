import React from "react"
import { nanoid } from "nanoid"
import Question from "./Question"


export default function Quiz() {

    const [game, setGame] = React.useState(false)

    alert(game)

    function startGame() {
        setGame(prevGame => !prevGame)
    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

    const [quizData, setQuizData] = React.useState([])

    React.useEffect(() => {
        async function getQuestion() {
            const res = await fetch("https://opentdb.com/api.php?amount=10&category=30")
            const data = await res.json()
            let que = []
            data.results.forEach(query => {
                que.push({
                    id: nanoid(),
                    question: query.question,
                    choices: shuffleArray(...query.incorrect_answers, query.correct_answer),
                    correct: query.correct_answer,
                    selected: null
                })
            setQuizData(que)
            })
        }
        getQuestion()
    }, [game])

    const quizElements = quizData.map(question => {
        return (
            <Question 
                key={question.id}
                question={question.question}
                choices={question.choices}
                id={question.id}
            />
        )
    })

    return (
        <div>
            <button onClick={startGame}>Start</button>
            {quizElements}
        </div>
    )
}