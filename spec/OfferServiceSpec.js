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

    xit('xit pending spec -> ', function () {
        expect().nothing();
    });

    it('pending() spec -> ', function () {
        expect().nothing();
        pending('invoke pending method in spec function body');
    });

    it('pending spec without function');

    describe('A spy', function () {
        var foo, bar = null;

        beforeEach(function () {
            foo = {
                setBar: function (value) {
                    console.log('spy method not invoke');
                    bar = value;
                }
            };

            spyOn(foo, 'setBar');

            foo.setBar(123);
            foo.setBar(456, 'another param');
        });


        it('tracks that the spy was called', function () {
            expect(foo.setBar).toHaveBeenCalled();
        });
        it('tracks that the spy was called x times', function () {
            expect(foo.setBar).toHaveBeenCalledTimes(2);
        });
        it('tracks all the arguments of its calls', function () {
            expect(foo.setBar).toHaveBeenCalledWith(123);
            expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
        });

        it('stops all execution on a function', function () {
            expect(bar).toBeNull();
        });
    });

    describe('A spy with callThrough', function () {
        var customer = null;

        beforeEach(function () {
            customer = {
                firstName: null,
                lastName: null,
                setCustomerData: function (firstName, lastName) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                },
                getCustomerData: function () {
                    return {
                        firstName: this.firstName,
                        lastName: this.lastName
                    }
                },
                getCustomerFirstName: function () {
                    return this.firstName;
                },
                getCustomerLastName: function () {
                    return this.lastName;
                },
                resetData: function () {
                    this.firstName = null;
                    this.lastName = null;
                }
            }
        });

        it('should set customer data', function () {
            // given
            spyOn(customer, 'setCustomerData').and.callThrough();
            //when
            customer.setCustomerData('Jacek', 'Balcerzak');
            //then
            expect(customer.firstName).toEqual('Jacek');
            expect(customer.getCustomerData()).toEqual({firstName: 'Jacek', lastName: 'Balcerzak'})
        });

        it('should get fake customer data', function () {
            // given
            spyOn(customer, 'setCustomerData')
                .and
                .callThrough();
            spyOn(customer, 'getCustomerData')
                .and
                .returnValue({firstName: 'NieJacek', lastName: 'NieBalcerzak'}); //fake return customer data
            spyOn(customer, 'getCustomerFirstName')
                .and
                .returnValues('Andrzej', 'Marta', 'John');
            //when
            customer.setCustomerData('Jacek', 'Balcerzak');// set customer data
            //then
            expect(customer.getCustomerData()).toEqual({firstName: 'NieJacek', lastName: 'NieBalcerzak'})

            expect(customer.getCustomerFirstName()).toEqual('Andrzej');
            expect(customer.getCustomerFirstName()).toEqual('Marta');
            expect(customer.getCustomerFirstName()).toEqual('John');
        });

        it('should call fake getCustomerLastName method', function () {
            // given
            var fakeGetCustomerLastName = function () {
                return 'Heheszek';
            };
            spyOn(customer, 'setCustomerData')
                .and
                .callThrough();
            spyOn(customer, 'getCustomerLastName')
                .and
                .callFake(fakeGetCustomerLastName);
            //when
            customer.setCustomerData('Jacek', 'Balcerzak');
            //then
            expect(customer.getCustomerLastName()).toEqual('Heheszek');
        });

        it('should use and.stub to retrieve default spy behaviour', function () {
            // given
            spyOn(customer, 'setCustomerData')
                .and
                .callThrough();
            //when
            customer.setCustomerData('Jacek', 'Balcerzak');
            //then
            expect(customer.getCustomerFirstName()).toEqual('Jacek');
            expect(customer.getCustomerLastName()).toEqual('Balcerzak');

            // given
            customer.resetData();
            customer.setCustomerData.and.stub();
            // when
            customer.setCustomerData('Jacek', 'Balcerzak');
            // then
            expect(customer.getCustomerFirstName()).toBeNull();
            expect(customer.getCustomerLastName()).toBeNull();
        });


    });
});