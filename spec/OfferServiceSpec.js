describe('OfferService', function () {

    var client;
    var offer;
    var offerService;

    beforeEach(function () {
        client = new Client('Mariusz');
        offer = new Offer(1, 20000);
        offerService = new OfferService();
    });

    it('test nothing matcher', function () {
        expect().nothing();
    });

    it('test toBe matcher', function () {
        expect(1).toBe(1);
        expect(client).toBe(client);
    });

    it('test toBeCloseTo matcher', function () {
        expect(44.44).toBeCloseTo(44.4, 1);
    });

    it('test toBeDefined matcher', function () {
        expect(offer).toBeDefined();
    });

    it('test toContain matcher', function () {
        var names = ['kamil', 'marcin', 'magda'];
        expect('marcin').toContain('cin');
        expect(names).toContain('magda');
    });

    //Spy use

    it('should calculate offer properly', function () {
        // given
        spyOn(offer, 'calculatePremium');
        spyOn(offer, 'addClient');
        spyOn(offer, 'isSumAssuredValid');
        // when
        offerService.calculateOffer(offer, client);

        //then
        expect(offer.calculatePremium).toHaveBeenCalled();
        expect(offer.addClient).toHaveBeenCalledWith(client);
        expect(offer.isSumAssuredValid).toHaveBeenCalledBefore(offer.calculatePremium);
        expect(offer.addClient).toHaveBeenCalledTimes(1);
    })
});