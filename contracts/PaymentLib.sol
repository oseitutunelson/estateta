// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library PaymentLib {
    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Payment failed");
    }

    function calculateSplit(uint256 total, uint256 pct)
        internal
        pure
        returns (uint256 fee, uint256 payment)
    {
        fee = (total * pct) / 100;
        payment = total - fee;
    }
}
