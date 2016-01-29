'use strict';

var _ = require('lodash');
var Holodeck = require('../../../../../holodeck');
var Request = require('../../../../../../../lib/http/Request');
var Response = require('../../../../../../../lib/http/Response');
var Twilio = require('../../../../../../../lib');


var client;
var holodeck;

describe('Mobile', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', holodeck);
  });
  it('should generate valid list request', function() {
    holodeck.mock(new Response(500, ''));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .availablePhoneNumbers('US')
                                  .mobile.list();
    promise = promise.then(function() {
      throw new Error('failed');
    }, function(error) {
      expect(error.constructor).toBe(Error.prototype.constructor);
    });
    promise.done();

    var solution = {
      accountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      countryCode: 'US'
    };
    var url = _.template('https://api.twilio.com/2010-04-01/Accounts/<%= accountSid %>/AvailablePhoneNumbers/<%= countryCode %>/Mobile.json')(solution);

    holodeck.assertHasRequest(new Request({
      method: 'GET',
      url: url
    }));
  });
  it('should generate valid read_full response', function() {
                    var body = JSON.stringify({
        'available_phone_numbers': [
            {
                'address_requirements': 'none',
                'beta': false,
                'capabilities': {
                    'MMS': false,
                    'SMS': true,
                    'voice': false
                },
                'friendly_name': '+4759440374',
                'iso_country': 'NO',
                'lata': null,
                'latitude': null,
                'longitude': null,
                'phone_number': '+4759440374',
                'postal_code': null,
                'rate_center': null,
                'region': null
            }
        ],
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json?PageSize=1'
    });
                    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .availablePhoneNumbers('US')
                                  .mobile.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
  it('should generate valid read_empty response', function() {
                    var body = JSON.stringify({
        'available_phone_numbers': [],
        'uri': '/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Mobile.json?PageSize=1'
    });
                    holodeck.mock(new Response(200, body));

    var promise = client.api.v2010.accounts('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                  .availablePhoneNumbers('US')
                                  .mobile.list();
    promise = promise.then(function(response) {
      expect(response).toBeDefined();
    }, function() {
      throw new Error('failed');
    });

    promise.done();
  });
});

