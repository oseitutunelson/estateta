 // SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Estateta is Ownable, ERC721, ReentrancyGuard {
  event PropertyCreated(uint256 indexed id, address indexed owner, uint256 price);
  event PropertyUpdated(uint256 indexed id);
  event PropertyDeleted(uint256 indexed id);
  event PropertySold(
    uint256 indexed id,
    address indexed oldOwner,
    address indexed newOwner,
    uint256 price
  );
  event ReviewCreated(uint256 indexed propertyId, uint256 indexed reviewId);
  event ReviewUpdated(uint256 indexed propertyId, uint256 indexed reviewId);
  event ReviewDeleted(uint256 indexed propertyId, uint256 indexed reviewId);

  constructor(uint256 _pct) ERC721('Estateta', 'Hpt') {
    servicePct = _pct;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _totalProperties;
  Counters.Counter private _totalSales;
  Counters.Counter private _totalReviews;

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


  struct ReviewStruct {
    uint256 id;
    uint256 propertyId;
    string comment;
    address reviewer;
    bool deleted;
    uint256 timestamp;
  }

  struct SaleStruct {
    uint256 id;
    uint256 propertyId;
    address owner;
  }

  mapping(uint256 => PropertyStruct) properties;
  mapping(uint256 => ReviewStruct[]) reviews;
  mapping(uint256 => SaleStruct[]) sales;
  mapping(uint256 => bool) propertyExist;
  mapping(uint256 => bool) reviewExist;
  mapping(uint256 => mapping(uint256 => uint256)) private reviewIndexInProperty;

  uint256 private servicePct;

  // Property Management Functions
  function createProperty(PropertyStruct memory property) public {
    require(bytes(property.name).length > 0, "Name cannot be empty");
    require(property.images.length > 0, "At least one image is required");
    require(property.images.length <= 10, "Maximum 10 images allowed");
    require(bytes(property.category).length > 0, "Category cannot be empty");
    require(bytes(property.description).length > 0, "Description cannot be empty");
    require(bytes(property.location).length > 0, "Location cannot be empty");
    require(bytes(property.city).length > 0, "City cannot be empty");
    require(bytes(property.state).length > 0, "State cannot be empty");
    require(bytes(property.country).length > 0, "Country cannot be empty");
    require(property.zipCode > 0, "Zip Code cannot be empty");
    require(property.bedroom > 0, "Bedroom cannot be zero or empty");
    require(property.bathroom > 0, "Bathroom cannot be zero or empty");
    require(property.built > 0, "Year built cannot be zero or empty");
    require(property.squarefit > 0, "House size cannot be zero or empty");
    require(property.price > 0 ether, "Price must be greater than zero");

    for (uint i = 0; i < property.images.length; i++) {
        require(bytes(property.images[i]).length > 0, "Image URL cannot be empty");
    }

    _totalProperties.increment();

    uint256 newPropertyId = _totalProperties.current();
    property.id = newPropertyId;
    property.owner = msg.sender;

    _safeMint(msg.sender, newPropertyId);
    properties[newPropertyId] = property;
    propertyExist[newPropertyId] = true;

    emit PropertyCreated(newPropertyId, msg.sender, property.price);
}


  function updateProperty(UpdatePropertyInput memory input) public {
    _validateUpdatePropertyInput(input);
    require(propertyExist[input.id], 'Property does not exist');
    require(msg.sender == properties[input.id].owner, 'Only the property owner can edit this property');

    _updatePropertyStorage(input);

    emit PropertyUpdated(input.id);
  }

  function _validateUpdatePropertyInput(UpdatePropertyInput memory input) internal pure {
    require(bytes(input.name).length > 0, 'Name cannot be empty');
    require(input.images.length > 0, 'At least one image is required');
    require(input.images.length <= 10, 'Maximum 10 images allowed');
    require(bytes(input.category).length > 0, 'Category cannot be empty');
    require(bytes(input.location).length > 0, 'Location cannot be empty');
    require(bytes(input.city).length > 0, 'City cannot be empty');
    require(bytes(input.state).length > 0, 'State cannot be empty');
    require(bytes(input.country).length > 0, 'Country cannot be empty');
    require(input.zipCode > 0, 'Zip Code cannot be empty');
    require(bytes(input.description).length > 0, 'Description cannot be empty');
    require(input.bedroom > 0, 'Bedroom cannot be zero or empty');
    require(input.bathroom > 0, 'Bathroom cannot be zero or empty');
    require(input.built > 0, 'Year built cannot be zero or empty');
    require(input.squarefit > 0, 'House size cannot be zero or empty');
    require(input.price > 0 ether, 'Price must be greater than zero');

    for (uint i = 0; i < input.images.length; i++) {
      require(bytes(input.images[i]).length > 0, 'Image URL cannot be empty');
    }
  }

  function _updatePropertyStorage(UpdatePropertyInput memory input) internal {
    properties[input.id].name = input.name;
    properties[input.id].images = input.images;
    properties[input.id].category = input.category;
    properties[input.id].description = input.description;
    properties[input.id].location = input.location;
    properties[input.id].city = input.city;
    properties[input.id].state = input.state;
    properties[input.id].country = input.country;
    properties[input.id].zipCode = input.zipCode;
    properties[input.id].bedroom = input.bedroom;
    properties[input.id].bathroom = input.bathroom;
    properties[input.id].built = input.built;
    properties[input.id].squarefit = input.squarefit;
    properties[input.id].price = input.price;
  }


  // Property View Functions
  function getProperty(uint256 id) public view returns (PropertyStruct memory) {
    require(propertyExist[id], 'Property does not exist');
    require(!properties[id].deleted, 'Property has been deleted');

    return properties[id];
  }

  function getAllProperties() public view returns (PropertyStruct[] memory myProperties) {
    uint256 availableProperties;
    for (uint256 i = 1; i <= _totalProperties.current(); i++) {
      if (!properties[i].deleted) {
        availableProperties++;
      }
    }

    myProperties = new PropertyStruct[](availableProperties);
    uint256 index;
    for (uint256 i = 1; i <= _totalProperties.current(); i++) {
      if (!properties[i].deleted) {
        myProperties[index++] = properties[i];
      }
    }
  }

  function getMyProperties() public view returns (PropertyStruct[] memory myProperties) {
    uint256 availableProperties;
    for (uint256 i = 1; i <= _totalProperties.current(); i++) {
      if (!properties[i].deleted && properties[i].owner == msg.sender) {
        availableProperties++;
      }
    }

    myProperties = new PropertyStruct[](availableProperties);
    uint256 index;

    for (uint256 i = 1; i <= _totalProperties.current(); i++) {
      if (!properties[i].deleted && properties[i].owner == msg.sender) {
        myProperties[index++] = properties[i];
      }
    }
  }

  // Property Purchase Function
  function buyProperty(uint256 id) public payable nonReentrant {
    _validateBuyProperty(id);
    _processSale(id);
  }

  function _validateBuyProperty(uint256 id) internal view {
    require(propertyExist[id], 'Property does not exist');
    require(msg.value >= properties[id].price, 'Insufficient payment');
    require(!properties[id].deleted, 'Property has been deleted');
    require(!properties[id].sold, 'Property has been sold');
  }

  function _processSale(uint256 id) internal {
    _totalSales.increment();
    SaleStruct memory sale;

    sale.id = _totalSales.current();
    sale.propertyId = id;
    sale.owner = msg.sender;
    sales[id].push(sale);

    uint256 fee = (msg.value * servicePct) / 100;
    uint256 payment = msg.value - fee;

    payTo(properties[id].owner, payment);
    payTo(owner(), fee);

    address oldOwner = properties[id].owner;

    properties[id].sold = true;
    properties[id].owner = msg.sender;
    _transfer(oldOwner, msg.sender, id);

    emit PropertySold(id, oldOwner, msg.sender, properties[id].price);
  }

  function payTo(address to, uint256 price) internal {
    (bool success, ) = payable(to).call{ value: price }('');
    require(success);
  }

//   // Review Management Functions
//   function createReview(uint256 propertyId, string memory comment) public {
//     require(propertyExist[propertyId], 'Property does not exist');
//     require(!properties[propertyId].deleted, 'Property has been deleted');
//     require(bytes(comment).length > 0, 'Review must not be empty');
//     require(bytes(comment).length <= 1000, 'Review is too long');

//     _totalReviews.increment();
//     ReviewStruct memory review;
//     uint256 reviewId = _totalReviews.current();

//     review.id = reviewId;
//     review.propertyId = propertyId;
//     review.reviewer = msg.sender;
//     review.comment = comment;
//     review.deleted = false;
//     review.timestamp = block.timestamp;

//     reviewIndexInProperty[propertyId][reviewId] = reviews[propertyId].length;
//     reviews[propertyId].push(review);
//     reviewExist[reviewId] = true;

//     emit ReviewCreated(propertyId, reviewId);
//   }

//   function updateReview(uint256 propertyId, uint256 reviewId, string memory comment) public {
//     require(propertyExist[propertyId], 'Property does not exist');
//     require(!properties[propertyId].deleted, 'Property has been deleted');
//     require(reviewExist[reviewId], 'Review does not exist');
//     require(bytes(comment).length > 0, 'Review must not be empty');
//     require(bytes(comment).length <= 1000, 'Review is too long');

//     uint256 index = reviewIndexInProperty[propertyId][reviewId];
//     ReviewStruct storage review = reviews[propertyId][index];

//     require(review.reviewer == msg.sender, 'Only the reviewer can update their review');
//     require(!review.deleted, 'Review has been deleted');

//     review.comment = comment;
//     review.timestamp = block.timestamp;

//     emit ReviewUpdated(propertyId, reviewId);
//   }


//   function deleteReview(uint256 propertyId, uint256 reviewId) public {
//     require(propertyExist[propertyId], "Property does not exist");
//     require(reviewExist[reviewId], "Review does not exist");
//     uint256 index = reviewIndexInProperty[propertyId][reviewId];
//     ReviewStruct storage review = reviews[propertyId][index];
//     require(msg.sender == review.reviewer || msg.sender == owner(), "Not authorized");

//     review.deleted = true;

//     emit ReviewDeleted(propertyId, reviewId);
// }
// function getReviewsForProperty(uint256 propertyId) public view returns (ReviewStruct[] memory) {
//     require(propertyExist[propertyId], "Property does not exist");

//     uint256 count;
//     for (uint256 i = 0; i < reviews[propertyId].length; i++) {
//         if (!reviews[propertyId][i].deleted) {
//             count++;
//         }
//     }

//     ReviewStruct[] memory result = new ReviewStruct[](count);
//     uint256 j;
//     for (uint256 i = 0; i < reviews[propertyId].length; i++) {
//         if (!reviews[propertyId][i].deleted) {
//             result[j++] = reviews[propertyId][i];
//         }
//     }

//     return result;
// }


//   // Review View Functions
//   function getReviews(uint256 propertyId) public view returns (ReviewStruct[] memory) {
//     require(propertyExist[propertyId], 'Property does not exist');

//     uint256 activeCount = 0;
//     for (uint256 i = 0; i < reviews[propertyId].length; i++) {
//       if (!reviews[propertyId][i].deleted) {
//         activeCount++;
//       }
//     }

//     ReviewStruct[] memory activeReviews = new ReviewStruct[](activeCount);
//     uint256 index = 0;

//     for (uint256 i = 0; i < reviews[propertyId].length; i++) {
//       if (!reviews[propertyId][i].deleted) {
//         activeReviews[index] = reviews[propertyId][i];
//         index++;
//       }
//     }

//     return activeReviews;
//   }

//   function getMyReviews(uint256 propertyId) public view returns (ReviewStruct[] memory) {
//     require(propertyExist[propertyId], 'Property does not exist');

//     uint256 myReviewCount = 0;
//     for (uint256 i = 0; i < reviews[propertyId].length; i++) {
//       if (reviews[propertyId][i].reviewer == msg.sender && !reviews[propertyId][i].deleted) {
//         myReviewCount++;
//       }
//     }

//     ReviewStruct[] memory myReviews = new ReviewStruct[](myReviewCount);
//     uint256 index = 0;

//     for (uint256 i = 0; i < reviews[propertyId].length; i++) {
//       if (reviews[propertyId][i].reviewer == msg.sender && !reviews[propertyId][i].deleted) {
//         myReviews[index] = reviews[propertyId][i];
//         index++;
//       }
//     }
//     return myReviews;
//   }

//   function getReview(
//     uint256 propertyId,
//     uint256 reviewId
//   ) public view returns (ReviewStruct memory) {
//     require(propertyExist[propertyId], 'Property does not exist');
//     require(reviewExist[reviewId], 'Review does not exist');

//     uint256 reviewIndex = reviewIndexInProperty[propertyId][reviewId];
//     require(reviewIndex < reviews[propertyId].length, 'Review not found for this property');
//     require(!reviews[propertyId][reviewIndex].deleted, 'Review has been deleted');

//     return reviews[propertyId][reviewIndex];
//   }
//   function withdraw() public onlyOwner {
//     uint256 balance = address(this).balance;
//     require(balance > 0, "No funds");
//     payable(owner()).transfer(balance);
// }

}