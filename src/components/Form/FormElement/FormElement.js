import React from 'react'
import TextField from '@material-ui/core/TextField';

export const FormElement = (props) => {
    return (
        <TextField
            id={props.id}
            label={props.label}
            variant={props.variant}
            color={props.color}
            multiline={props.multiline}
            rows={props.rows}
            onChange={props.changed}
            fullWidth
            style={{ margin: 8 }}
            placeholder={props.placeholder}
            value={props.value}
            required={true}
            error={!props.valid}
        />
    )
}

export default FormElement