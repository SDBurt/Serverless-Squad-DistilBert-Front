import React from 'react';
import Form from '../../components/Form/Form';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const Home = (props) => {

    const formData = {
        context: {
            label: "Context",
            variant: "outlined",
            color: "primary",
            multiline: true,
            rows: "5",
            placeholder: "Set the context for the question below.",
            value: "",
            validation: {
                minLength: 5,
                required: true
            },
            valid: false,
            touched: false
        },
        question: {
            label: "Question",
            variant: "outlined",
            color: "primary",
            multiline: true,
            rows: "1",
            placeholder: "Ask a question based on the context above.",
            value: "",
            validation: {
                minLength: 5,
                required: true
            },
            valid: false,
            touched: false
        }
    }

    const reqEndpoint = "/ask"


    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
        >
            <Typography variant="h2" color="textPrimary" align="center">
                DistilBert for Question Answering
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="center">
                A website built on serverless components via the serverless framework
                which utilizes the distil-bert model for question answering.
                The request might take some time, or a second try, due to API gateway having a 30 second timeout
                and Lambda having a 30 second warmup time.
            </Typography>
            <br />
            <Form
                data={formData}
                endpoint={reqEndpoint}
            />
        </Grid >
    )
}

export default Home
