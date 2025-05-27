// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library ReviewLib {
    struct ReviewStruct {
        uint256 id;
        uint256 propertyId;
        string comment;
        address reviewer;
        bool deleted;
        uint256 timestamp;
    }

    function validateReview(string memory comment) internal pure {
        require(bytes(comment).length > 0, "Comment required");
        require(bytes(comment).length <= 1000, "Comment too long");
    }
}
