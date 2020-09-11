import React from "react";
import Style from "./Quiz.module.scss";

export default ({ questions, answers }) => {
    return (
        <div className={Style.answerBlock}>
            <table>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question) => {
                            return (
                                <tr key={question.id}>
                                    <td>{question.title}</td>
                                    <td>{answers[question.id]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
