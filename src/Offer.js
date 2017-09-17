function Offer(offerId, sumAssured) {
    this.offerId = offerId;
    this.sumAssured = sumAssured; //
    this.sumAssuredMin = 50000;
    this.premium = null;
    this.premiumMin = 50;
    this.clients = [];
}

Offer.prototype.calculatePremium = function () {
    if (this.isSumAssuredValid()) {
        return premium = this.sumAssured * 0.2 > this.premiumMin ? premium : this.premiumMin;
    }
    return this.premiumMin;
};

Offer.prototype.addClient = function (client) {
    this.clients.push(client);
};

Offer.prototype.isSumAssuredValid = function () {
    return this.sumAssured > this.sumAssuredMin ? true : false;
};