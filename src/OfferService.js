function OfferService() {
}

OfferService.prototype.calculateOffer = function (offer, client) {
    offer.addClient(client);
    offer.isSumAssuredValid();
    offer.calculatePremium();
};

