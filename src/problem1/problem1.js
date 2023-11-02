/*
Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

var sum_to_n_a = function (n) {
    // your code here
    let ans = 0;
    for (let i = 1; i < n + 1; i++) {
        ans += i;
    }
    return ans;
};

var sum_to_n_b = function (n) {
    // your code here
    if (n === 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return n + sum_to_n_b(n - 1);
    }
};

var sum_to_n_c = function (n) {
    // your code here
    let ans = 0;
    let i = 1;
    while (i <= n) {
        ans += i;
        i++;
    }
    return ans;
};

// Testing
console.log(sum_to_n_a(0));
console.log(sum_to_n_b(0));
console.log(sum_to_n_c(0));

console.log(sum_to_n_a(1));
console.log(sum_to_n_b(1));
console.log(sum_to_n_c(1));

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
