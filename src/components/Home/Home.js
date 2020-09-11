import React, { useState } from "react";
import { JumboInput } from "../Form/Input";
import Button from "../Button/Button";
import Heading from "../Typography/Heading";
import Style from "./Home.module.scss";
import ErrorBlock from "../Common/ErrorBlock/ErrorBlock";
import { navigate } from 'gatsby';

export default () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    function onNameChange(e) {
        setError("");
        setName(e.target.value);
    }

    function start() {
        if (!name) {
            setError(true);
            return;
        }
        if (typeof window !== undefined) {
            navigate(`/quiz?name=${name}`);
            return;
        }
    }

    return (
        <div className={Style.home}>
            <Heading>Enter your Name: </Heading>
            <JumboInput value={name} onChange={onNameChange} type="text" placeholder="John Doe" />
            {error ? <ErrorBlock text="Please enter your name to proceed!" /> : null}
            <Button onClick={start}>Start</Button>
        </div>
    )
}
