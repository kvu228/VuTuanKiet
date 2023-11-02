import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { calAmountAtoB } from "../utils/calExRate";
import Input from "./Input";
import SelectToken from "./SelectToken";
import ExInfo from "./ExInfo";
import Popup from "./Popup";

export default function MyFancyForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [sendToken, setSendToken] = useState("");
    const [receiveToken, setReceiveToken] = useState("");

    const [sendAmount, setSendAmount] = useState();
    const [receiveAmount, setReceiveAmount] = useState();

    const [showPopup, setShowPopup] = useState(false);

    const handleSendAmountChange = (sendAmount) => {
        setSendAmount(sendAmount);
        let newReceiveAmount = calAmountAtoB(
            sendAmount,
            sendToken,
            receiveToken
        );
        setReceiveAmount(newReceiveAmount);
        console.info(sendAmount, sendToken, receiveToken, receiveAmount);
    };

    const handleChangeSendToken = (newToken) => {
        let newReceiveAmount = calAmountAtoB(
            sendAmount,
            newToken,
            receiveToken
        );
        setReceiveAmount(newReceiveAmount);
        setSendToken(newToken);
    };

    const handleChangeReceiveToken = (newToken) => {
        let newReceiveAmount = calAmountAtoB(sendAmount, sendToken, newToken);
        setReceiveAmount(newReceiveAmount);
        setReceiveToken(newToken);
    };

    const handleClosePopup = () => setShowPopup(false);
    const onSubmit = (data) => {
        console.info(data);
        setShowPopup(true);
    };

    return (
        <Card className='text-center container-md'>
            {console.info(sendAmount, sendToken, receiveToken, receiveAmount)}
            <h1 className='card-title p-2'>Swap the currency</h1>
            <Form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                <Row className='mb-3'>
                    <Col className='col-8'>
                        <Input
                            name='sendAmount'
                            value={sendAmount}
                            label='Amount to Send'
                            placeholder='0.00'
                            type='float'
                            register={register}
                            validationSchema={{
                                pattern: /^(?:[1-9]\d*|0)?(?:\.\d+)?$/,
                                required: true,
                            }}
                            onChange={handleSendAmountChange}
                        />

                        <error className='text-danger font-weight-light font-italic'>
                            {errors.sendAmount?.type === "pattern" &&
                                "* Amount must be a positive number"}
                        </error>
                        <error className='text-danger font-weight-light font-italic'>
                            {errors.sendAmount?.type === "required" &&
                                "* Please enter amount"}
                        </error>
                    </Col>

                    <Col className='col-4'>
                        <SelectToken
                            name='sendToken'
                            value={sendToken}
                            register={register}
                            validationSchema={{
                                required: true,
                            }}
                            onChange={handleChangeSendToken}
                        />
                        <error className='text-danger font-weight-light font-italic'>
                            {errors.sendToken?.type === "required" &&
                                "* Please choose the token"}
                        </error>
                    </Col>
                </Row>

                <Row>
                    <Col className='col-8'>
                        <Input
                            name='receiveAmount'
                            label='Amount to Receive'
                            placeholder='0.00'
                            register={register}
                            value={receiveAmount}
                            isDisable={true}
                        />
                        <error className='text-danger font-weight-light font-italic'>
                            {errors.receiveAmount?.type === "pattern" &&
                                "* Amount must be a positive number"}
                        </error>
                    </Col>

                    <Col className='col-4'>
                        <SelectToken
                            name='receiveToken'
                            value={receiveToken}
                            register={register}
                            validationSchema={{
                                required: true,
                            }}
                            onChange={handleChangeReceiveToken}
                        />
                        <error className='text-danger font-weight-light font-italic'>
                            {errors.receiveToken?.type === "required" &&
                                "* Please choose the token"}
                        </error>
                    </Col>
                </Row>

                <ExInfo
                    sendToken={sendToken}
                    receiveToken={receiveToken}
                    register={register}
                />

                <Button variant='primary' type='submit'>
                    Confirm Swap
                </Button>
            </Form>
            <Popup
                show={showPopup}
                handleClose={handleClosePopup}
                title={"Success"}
            >
                <p>
                    You have successfully swap <b>{sendAmount} </b>{" "}
                    <b>{sendToken}</b> to ~
                    <b>
                        {receiveAmount} {receiveToken}
                    </b>
                </p>
            </Popup>
        </Card>
    );
}
