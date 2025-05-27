// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library PropertyLib {
    struct PropertyStruct {
        uint256 id;
        address owner;
        string name;
        string[] images;
        string category;
        string description;
        string location;
        string city;
        string state;
        string country;
        uint256 zipCode;
        uint256 bedroom;
        uint256 bathroom;
        uint256 built;
        uint256 squarefit;
        uint256 price;
        bool sold;
        bool deleted;
    }

    struct UpdatePropertyInput {
        uint256 id;
        string name;
        string[] images;
        string category;
        string description;
        string location;
        string city;
        string state;
        string country;
        uint256 zipCode;
        uint256 bedroom;
        uint256 bathroom;
        uint256 built;
        uint256 squarefit;
        uint256 price;
    }

    function validateProperty(PropertyStruct memory property) internal pure {
        require(bytes(property.name).length > 0, "Name required");
        require(property.images.length > 0 && property.images.length <= 10, "1-10 images required");
        require(bytes(property.category).length > 0, "Category required");
        require(bytes(property.description).length > 0, "Description required");
        require(bytes(property.location).length > 0, "Location required");
        require(bytes(property.city).length > 0, "City required");
        require(bytes(property.state).length > 0, "State required");
        require(bytes(property.country).length > 0, "Country required");
        require(property.zipCode > 0, "Zip required");
        require(property.bedroom > 0, "Bedroom required");
        require(property.bathroom > 0, "Bathroom required");
        require(property.built > 0, "Built year required");
        require(property.squarefit > 0, "Squarefit required");
        require(property.price > 0, "Price required");

        for (uint i = 0; i < property.images.length; i++) {
            require(bytes(property.images[i]).length > 0, "Image URL required");
        }
    }

    function validateUpdate(UpdatePropertyInput memory input) internal pure {
        PropertyStruct memory prop;
        prop.name = input.name;
        prop.images = input.images;
        prop.category = input.category;
        prop.description = input.description;
        prop.location = input.location;
        prop.city = input.city;
        prop.state = input.state;
        prop.country = input.country;
        prop.zipCode = input.zipCode;
        prop.bedroom = input.bedroom;
        prop.bathroom = input.bathroom;
        prop.built = input.built;
        prop.squarefit = input.squarefit;
        prop.price = input.price;

        validateProperty(prop);
    }
}
