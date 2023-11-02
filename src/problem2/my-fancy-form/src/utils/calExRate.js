import ExRate from "./exRateData";

export function calExAtoB(AtoUSD, BtoUsd) {
    return AtoUSD / BtoUsd;
}

export function calAmountAtoB(amountA, tokenA, tokenB) {
    if (tokenA !== "" && tokenB !== "") {
        let AtoUSD = ExRate.exRate.find(
            ({ currency }) => currency === tokenA
        ).price;
        let BtoUsd = ExRate.exRate.find(
            ({ currency }) => currency === tokenB
        ).price;
        let result = amountA * calExAtoB(AtoUSD, BtoUsd);
        return result;
    }
    return 0;
}
