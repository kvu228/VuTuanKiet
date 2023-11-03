//Import neccessary modules
import React from "react";
import { useMemo } from "react";
import WalletRow from "./WalletRow"; // import WalletRow component
import { useWalletBalances, usePrices } from "your-appropriate-hooks-library"; // Replace with your actual hook imports
import { BoxProps } from "your-box-library"; // Replace with your actual BoxProps import

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Added blockchain property to WalletBalance
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances: WalletBalance[] = useWalletBalances();
    const prices = usePrices();

    // Refactored getPriority function using an object for better readability
    const blockchainPriorities: { [blockchain: string]: number } = {
        Osmosis: 100,
        Ethereum: 50,
        Arbitrum: 30,
        Zilliqa: 20,
        Neo: 20,
    };

    const getPriority = (blockchain: string): number => {
        return blockchainPriorities[blockchain] || -99;
    };

    // Efficient sorting and filtering
    const sortedBalances = useMemo(() => {
        return balances
            .filter((balance: WalletBalance) => {
                const balancePriority = getPriority(balance.blockchain);
                return balancePriority > -99 && balance.amount <= 0;
            })
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                return rightPriority - leftPriority;
            });
    }, [balances]);

    // Improved mapping and formatting of balances
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
    }));

    // Render rows more clearly with a map
    const rows = formattedBalances.map(
        (balance: WalletBalance, index: number) => (
            <WalletRow
                className={classes.row} // Define 'classes' if not already defined
                key={index}
                amount={balance.amount}
                usdValue={prices[balance.currency] * balance.amount}
                formattedAmount={balance.formatted}
            />
        )
    );

    return <div {...rest}>{rows}</div>;
};

export default WalletPage;
