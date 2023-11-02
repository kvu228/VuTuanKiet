import React from "react";
import { calExAtoB } from "../utils/calExRate";
import ExRate from "../utils/exRateData";

const ExInfo = ({ sendToken, receiveToken, register }) => {
    let sendTokenEx =
        sendToken !== ""
            ? ExRate.exRate.find(({ currency }) => currency === sendToken).price
            : 0;

    let receiveTokenEx =
        receiveToken !== ""
            ? ExRate.exRate.find(({ currency }) => currency === receiveToken)
                  .price
            : 0;

    return sendTokenEx !== 0 || receiveTokenEx !== 0 ? (
        <p class='font-italic'>
            Exchange rate: 1{" "}
            <span className='font-weight-bold'>{sendToken}</span>={" "}
            {calExAtoB(sendTokenEx, receiveTokenEx)}{" "}
            <span className='font-weight-bold'>{receiveToken}</span>
        </p>
    ) : null;
};

export default ExInfo;
