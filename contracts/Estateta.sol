 
 // SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Estateta is Ownable, ERC721,ReentrancyGuard{
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
  event FractionPurchased(uint256 indexed propertyId, address indexed buyer, uint256 shares);
  event FractionResold(uint256 indexed propertyId, address indexed seller, address indexed buyer, uint256 shares, uint256 price);

  constructor(address initialOwner,uint256 _pct) ERC721('Estateta', 'ETA')  {
        servicePct = _pct;
    transferOwnership(initialOwner);
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
        bool isFractionalized;
        uint256 totalShares;
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
  uint256 private servicePct;

  mapping(uint256 => PropertyStruct) properties;
  mapping(uint256 => ReviewStruct[]) reviews;
  mapping(uint256 => SaleStruct[]) sales;
  mapping(uint256 => bool) propertyExist;
  mapping(uint256 => bool) reviewExist;
  mapping(uint256 => mapping(uint256 => uint256)) private reviewIndexInProperty;
  mapping(uint256 => mapping(address => uint256)) public propertyShares;
  mapping(uint256 => uint256) public sharesSold;
  mapping(uint256 => mapping(address => uint256)) public shareSalePrice;

 modifier propertyValidate(PropertyStruct memory property) {
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
    _;
 }
  // Property Management Functions
    function createProperty(PropertyStruct memory property, bool isFractionalized, uint256 totalShares) public propertyValidate(property) {
    

    for (uint i = 0; i < property.images.length; i++) {
        require(bytes(property.images[i]).length > 0, "Image URL cannot be empty");
    }

    _totalProperties.increment();
        uint256 newPropertyId = _totalProperties.current();

        property.id = newPropertyId;
        property.owner = msg.sender;
        property.isFractionalized = isFractionalized;
        property.totalShares = isFractionalized ? totalShares : 0;

        _safeMint(msg.sender, newPropertyId);
        properties[newPropertyId] = property;
        propertyExist[newPropertyId] = true;

        if (isFractionalized) {
            propertyShares[newPropertyId][msg.sender] = totalShares;
        }

        emit PropertyCreated(newPropertyId, msg.sender, property.price);
}
function buyShares(uint256 propertyId, uint256 sharesToBuy) public payable nonReentrant {
        PropertyStruct storage property = properties[propertyId];
        require(propertyExist[propertyId], 'Property does not exist');
        require(property.isFractionalized, 'Property is not fractionalized');
        require(!property.deleted, 'Property is deleted');

        uint256 pricePerShare = property.price / property.totalShares;
        require(msg.value >= sharesToBuy * pricePerShare, 'Insufficient payment');
        require(sharesSold[propertyId] + sharesToBuy <= property.totalShares, 'Not enough shares available');

        sharesSold[propertyId] += sharesToBuy;
        propertyShares[propertyId][msg.sender] += sharesToBuy;

        uint256 fee = (msg.value * servicePct) / 100;
        uint256 payment = msg.value - fee;

        payTo(property.owner, payment);
        payTo(owner(), fee);

        emit FractionPurchased(propertyId, msg.sender, sharesToBuy);
    }
      function listSharesForSale(uint256 propertyId, uint256 shareCount, uint256 pricePerShare) public {
        require(propertyShares[propertyId][msg.sender] >= shareCount, 'Not enough shares to list');
        shareSalePrice[propertyId][msg.sender] = pricePerShare;
    }

    function buyResaleShares(uint256 propertyId, address from, uint256 shareCount) public payable nonReentrant {
        uint256 pricePerShare = shareSalePrice[propertyId][from];
        require(pricePerShare > 0, 'Seller has not listed shares');

        uint256 totalPrice = shareCount * pricePerShare;
        require(msg.value >= totalPrice, 'Insufficient payment');
        require(propertyShares[propertyId][from] >= shareCount, 'Seller does not have enough shares');

        propertyShares[propertyId][from] -= shareCount;
        propertyShares[propertyId][msg.sender] += shareCount;

        shareSalePrice[propertyId][from] = 0;

        payTo(from, totalPrice);

        emit FractionResold(propertyId, from, msg.sender, shareCount, totalPrice);
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
 
}

 