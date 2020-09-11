import React, { useState, useEffect } from "react";
import Style from "./Quiz.module.scss";
import { Text } from "../Typography/Heading";
import Input from "../Form/Input"
import Button from "../Button/Button";

/**
 * @method
 */
export default ({ question, totalQuestion, activeQuestion, onNext: onN, onSkip: onS }) => {

    const TIMER_S = 20;
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [timer, setTimer] = useState(TIMER_S);

    useEffect(() => {
        /** initialise the question timer  */
        const interval = setInterval(() => {
            if (timer < 1) {
                clearInterval(interval);
                if (selectedAnswer) {
                    onNext(selectedAnswer);
                } else {
                    onSkip();
                }
                return;
            }
            setTimer(timer - 1);
        }, 1000)
        /** in the cleanup function, clear the timer */
        return () => {
            clearInterval(interval);
        }
    })

    function setDefaultState() {
        setSelectedAnswer("");
        setTimer(TIMER_S);
    }

    function updateAnswer(e) {
        setSelectedAnswer(e.target.value);
    }

    function onNext() {
        onN(question.id, selectedAnswer);
        setDefaultState();
    }

    function onSkip() {
        onS(question.id);
        setDefaultState();
    }

    return (
        <div className={Style.questionBlock}>
            <Text>{ question.title }</Text>
            <ul>
                {
                    question.options.map((option, ind) => (
                        <li key={option}>
                            <Input onChange={updateAnswer} id={option} type = "radio" name="option" value={option} />
                            <label htmlFor={option}>{option}</label>
                        </li>
                    ))
                }
            </ul>
            <div className={Style.actionBlock}>
                <p className={Style.quesCounter}>{activeQuestion} / {totalQuestion}</p>
                <p className={Style.quesTimer}>{timer}</p>
                <Button id={Style.skip} onClick={onSkip}>Skip</Button>
                <Button id={Style.next} disabled={!(!!selectedAnswer)} onClick={onNext}>Submit</Button>
            </div>
        </div>
    )
}
