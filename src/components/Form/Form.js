import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

import FormElement from './FormElement/FormElement';
import Axios from '../../axios';

const Form = (props) => {

    const { data, endpoint } = props;

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        setForm(data);
    }, [data])

    const changedHandler = (event, id) => {

        event.preventDefault()

        const currentForm = {
            ...form
        };

        const updatedFormElement = {
            ...currentForm[id]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        currentForm[id] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in currentForm) {
            formIsValid = (
                currentForm[identifier].value
                && currentForm[identifier].valid
                && formIsValid
            )
        }

        setForm(currentForm);
        setFormIsValid(formIsValid);

    };

    let renderAnswer = null;
    let renderError = null;

    if (loading) {
        renderAnswer = (
            <CircularProgress />
        )
    }

    if (!loading && response !== null) {
        renderAnswer = (
            <Typography variant="body1" color="textPrimary">
                DistilBert says: {response}
            </Typography>
        )

    }

    if (!loading && error !== null) {
        renderError = (
            <div style={{ marginTop: '10px' }}>
                <Typography variant="body2" color="error" align="center">
                    {error}
                </Typography>
            </div>

        )
    }

    const checkValidity = (value, rules) => {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase());
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid
    }

    const formElements = []
    for (let key in form) {
        formElements.push({
            id: key,
            config: form[key]
        })
    }

    let renderElements = (
        formElements.map((element) => {
            return (
                <FormElement
                    key={element.id}
                    id={element.id}
                    label={element.config.label}
                    variant={element.config.variant}
                    color={element.config.color}
                    multiline={element.config.multiline}
                    rows={element.config.rows}
                    placeholder={element.config.placeholder}
                    changed={(event) => changedHandler(event, element.id)}
                    value={element.config.value}
                    valid={element.config.valid}
                    touched={element.config.touched}
                />

            )
        })
    );

    const handleSubmit = () => {
        setLoading(true);

        const data = {
            context: form.context.value,
            question: form.question.value
        }

        Axios.post(endpoint, data)
            .then((res) => {
                setLoading(false)
                setResponse(res.data.answer)
                setError(null)
            })
            .catch((error) => {
                setLoading(false)
                setResponse(null)
                setError(error.message)
                console.error(error)
            })
    }

    return (
        <React.Fragment>
            <form onSubmit={() => handleSubmit()}>
                {renderElements}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button
                        style={{ alignSelf: 'center' }}
                        variant="contained"
                        color="primary"
                        disabled={!formIsValid}
                        onClick={() => handleSubmit()}
                    >Ask</Button>
                </div>

            </form>
            <div style={{ marginTop: '10px' }}>{renderAnswer}</div>
            {renderError}

        </React.Fragment>

    )
}

export default Form
