import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const Input = ({
    name,
    label,
    type,
    placeholder,
    register,
    validationSchema,
    isDisable = false,
    value,
    onChange,
}) => {
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <Form.Group className='mb-3' controlId={name}>
            <InputGroup>
                <InputGroup.Text className='col-4'>{label}</InputGroup.Text>
                <Form.Control
                    className='col-8 '
                    type={type}
                    placeholder={placeholder}
                    disabled={isDisable}
                    {...register(name, validationSchema)}
                    value={value}
                    onChange={handleChange}
                />
            </InputGroup>
        </Form.Group>
    );
};

export default Input;
