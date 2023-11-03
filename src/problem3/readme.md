# Explain for refactored version

## Adding import statement

```typescript
//Import neccessary modules
import React from "react";
import { useMemo } from "react";
// import WalletRow component
import WalletRow from "./WalletRow";
// Replace with your actual hook
import { useWalletBalances, usePrices } from "your-appropriate-hooks-library";
// Replace with your actual BoxProps
import { BoxProps } from "your-box-library";
```

## The blockchain type

The blockchain parameter of the `getPriority` function is defined as `any`, but it should have a more specific type.

```typescript
//Legacy code
const getPriority = (blockchain: any): number => {
    switch (blockchain) {
        case "Osmosis":
            return 100;
        case "Ethereum":
            return 50;
        case "Arbitrum":
            return 30;
        case "Zilliqa":
            return 20;
        case "Neo":
            return 20;
        default:
            return -99;
    }
};
```

```typescript
//Refactored code
interface WalletBalance {
    currency: string;
    amount: number;

    // Added blockchain property to WalletBalance
    blockchain: string;
}

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
```

## The sort function

1. There is inconsistency in variable naming. For example, `balancePriority` is sometimes referred to as `lhsPriority`, which can be confusing.

2. The sorting of `sortedBalances` can be inefficient. It sorts twice—first when filtering and then when sorting. A more efficient approach is to sort the balances directly based on the priority without filtering first.

3. There's a misspelled variable name in the `getPriority` function. `lhsPriority` should be `balancePriority`.

```typescript
//Legacy code
const sortedBalances = useMemo(() => {
    return balances
        .filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99) {
                if (balance.amount <= 0) {
                    return true;
                }
            }
            return false;
        })
        .sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
        });
}, [balances, prices]);
```

```typescript
//Refactored code
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
```
