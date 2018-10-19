import { Lookup } from '../src/lookup';

describe('Lookup', function() {
  let newLookup;
  let lookupName = "Ryan Hsi";

  beforeEach(function() {
    newLookup = new Lookup();
  })

  it('should let user look up doctors in Seattle area by name', function () {
    let promise = newLookup.searchDoctorByName(lookupName);
    return promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body.meta.message);
      let doctorList = body.meta.count;
      expect(doctorList).toEqual(1);
    })
  })
})