import React from "react";
import ExRate from "../utils/exRateData";
import { Form, InputGroup, Image } from "react-bootstrap";

const SelectToken = ({ name, value, register, validationSchema, onChange }) => {
    const handleChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    return (
        <Form.Group className='mb-3' controlId={name}>
            <InputGroup>
                {value && value !== "Open this select menu" ? (
                    <InputGroup.Text>
                        <Image
                            src={`assets/token/${value}.svg`}
                            alt={value}
                            width={25}
                            height={25}
                        />
                    </InputGroup.Text>
                ) : null}

                <Form.Select
                    aria-label='Default select'
                    {...register(name, validationSchema)}
                    onChange={handleChange}
                    value={value}
                >
                    <option disabled value=''>
                        Open this select menu
                    </option>
                    {ExRate.exRate &&
                        ExRate.exRate.map((e, key) => {
                            return (
                                <option key={key} value={e.currency}>
                                    {e.currency}
                                </option>
                            );
                        })}
                </Form.Select>
                <InputGroup.Text className='col-4'>
                    ~ $
                    {value && value !== ""
                        ? ExRate.exRate
                              .find(({ currency }) => currency === value)
                              .price.toFixed(3)
                        : "0.00"}
                </InputGroup.Text>
            </InputGroup>
        </Form.Group>
    );
};

export default SelectToken;
