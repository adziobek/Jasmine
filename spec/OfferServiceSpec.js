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
        expect(offer.addClient).not.toHaveBeenCalledTimes(0);
        expect(offer).not.toBeNull();
    });

    describe('use this keyword to share variable', function () {
        beforeEach(function () {
            this.names = ['marcin', 'kasia', 'mietek'];
            this.selectedName = 'marcin';
        });

        it('names should contain selected name', function () {
            expect(this.names).toContain(this.selectedName);
        });
    });

    describe('test nested describe block', function () {
        beforeEach(function () {
            console.log('outer beforeEach invoke');
        });
        afterEach(function () {
            console.log('outer afterEach invoke');
        });

        it('outer spec', function () {
            console.log('outer spec invoke');
            expect().nothing();
        });

        describe('nested describe block', function () {
            beforeEach(function () {
                console.log('   nested beforeEach invoke');
            });
            afterEach(function () {
                console.log('   nested afterEach invoke');
            });

            it('nested spec', function () {
                console.log('   nested spec invoke');
                expect().nothing();
            });
        });

        /* Result
         OfferServiceSpec.js:68 outer beforeEach invoke
         OfferServiceSpec.js:75 outer spec invoke
         OfferServiceSpec.js:71 outer afterEach invoke
         OfferServiceSpec.js:68 outer beforeEach invoke
         OfferServiceSpec.js:81    nested beforeEach invoke
         OfferServiceSpec.js:88    nested spec invoke
         OfferServiceSpec.js:84    nested afterEach invoke
         OfferServiceSpec.js:71 outer afterEach invoke
         */
    });
});