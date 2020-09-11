import React, { useState, useEffect } from "react";
import Style from "./Quiz.module.scss";
import { navigate } from 'gatsby';
import { useQueryParam, StringParam } from "use-query-params";
import Question from "./Question";
import Heading from "../Typography/Heading";
import Answer from "./Answer";

/** 
 * sample quiz data
 * In real world, this data should come from a data source such as API call
 */
const data = [
    {
        id: 1,
        title: "What is the colour of sky?",
        options: ["blue", "green", "red", "orange"],
        answer: "blue"
    },
    {
        id: 2,
        title: "What is the colour of soil?",
        options: ["a", "add", "ded", "fgh"],
        answer: "blue"
    },
    {
        id: 3,
        title: "What is the colour of floor?",
        options: ["zzz", "aaa", "sss", "fff"],
        answer: "blue"
    },
    {
        id: 4,
        title: "What is the colour of cloth?",
        options: ["123", "345", "23", "455"],
        answer: "blue"
    }
];

/**
 * @component
 */
export default () => {
    const [name] = useQueryParam("name", StringParam);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);


    const TOTAL_QUES = data.length;

    useEffect(() => {
        /** if name is not available in the query param, redirect user to the home page  */
        if (!name) {
            navigate("/");
            return;
        }
    });

    /**
     * @method
     * @description When a question is skipped, this method moves the user to the next question
     * @param { number } questionId
     */
    function onSkip(questionId) {
        const ans = { ...answers, [questionId]: "not-answered" };
        setAnswers(ans);
        if (activeQuestion === TOTAL_QUES - 1) {
            setShowAnswer(true);
            return;
        }
        setActiveQuestion(activeQuestion + 1);
    }

    /**
     * @method
     * @description To move to the next question
     * @param {number} questionId 
     * @param {string} answer 
     */
    function onNext(questionId, answer) {
        const ques = data.find((ques) => ques.id === questionId);
        const ansStr = ques && ques.answer === answer ? "right" : "wrong";
        const ans = { ...answers, [questionId]: ansStr };
        setAnswers(ans);
        if (activeQuestion === TOTAL_QUES - 1) {
            setShowAnswer(true);
            return;
        }
        setActiveQuestion(activeQuestion + 1);
    }

    return (
        <div className={Style.quizBlock}>
            <Heading>{name}</Heading>
            {
                showAnswer ? <Answer
                    questions={data}
                    answers={answers}
                /> : <Question
                        totalQuestion={data.length}
                        activeQuestion={activeQuestion + 1}
                        onSkip={onSkip}
                        onNext={onNext}
                        question={data[activeQuestion]}
                    />
            }
        </div>
    )
}
