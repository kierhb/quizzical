import React from "react"
import { nanoid } from "nanoid"
import Question from "./Question"
import Choices from "./Choices"


export default function Quiz() {

    const [game, setGame] = React.useState(false)

    function startGame() {
        setGame(prevGame => !prevGame)
    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

    const [quizData, setQuizData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=30")
           .then(response => response.json())
           .then(data => setQuizData(data.results))
    }, [game])

    const items = quizData.map(query => {
        const choices = shuffleArray(query.incorrect_answers.concat(query.correct_answer))
        const newChoices = choices.map(choice => {
            return {
                choiceId: nanoid(),
                choice: choice,
                isSelected: false,

            }
        })

        return {
            questionId: nanoid(),
            question: query.question,
            choices: newChoices,
            correct: query.correct_answer,
            chosen: null,
            checked: false
        }
    })

    console.log(items)

    const quizElements = quizData.map(query => {
        let choices = shuffleArray(query.incorrect_answers.concat(query.correct_answer))

        //console.log(choices)

        return (
            <div className="item--container">
                <Question 
                    key={nanoid()}
                    question={query.question}  
                />
                <Choices 
                    key={nanoid()}
                    answer={query.correct_answer}
                    choices={choices}
                    isSelected={false}
                    selected={()=>selected()}
                />
                <hr />
            </div>
        )
    })

    function selected() {
        console.log("clicked")
    }


    return (
        <div>
            <button onClick={startGame}>Start</button>
            {quizElements}
        </div>
    )
}