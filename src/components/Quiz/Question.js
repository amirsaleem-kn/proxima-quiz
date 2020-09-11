import React, { useState, useEffect } from "react";
import Style from "./Quiz.module.scss";
import { Text } from "../Typography/Heading";
import Input from "../Form/Input"
import Button from "../Button/Button";

/**
 * @component
 */
export default ({ question, totalQuestion, activeQuestion, onNext: onN, onSkip: onS }) => {

    const TIMER_S = 20;
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [timer, setTimer] = useState(TIMER_S);

    useEffect(() => {
        /** initialise the question timer  */
        const interval = setInterval(() => {
            /** if we ran out of time  */
            if (timer < 1) {
                /** remove the timer event */
                clearInterval(interval);
                /** if answer is already selected, submit the selected answer  */
                if (selectedAnswer) {
                    onNext(selectedAnswer);
                } else {
                    /** if answer is not selected, skip the question  */
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

    /**
     * @method
     * @description To refresh the state when question is changed
     */
    function setDefaultState() {
        setSelectedAnswer("");
        setTimer(TIMER_S);
    }

    /**
     * @description to update the selected answer
     * @param {object} e Event
     */
    function updateAnswer(e) {
        setSelectedAnswer(e.target.value);
    }

    /**
     * @metohd 
     * @description to move to the next question
     */
    function onNext() {
        onN(question.id, selectedAnswer);
        setDefaultState();
    }

    /**
     * @method
     * @description to skip the current question,
     * even if the answer is selected, question will be skipped
     */
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
