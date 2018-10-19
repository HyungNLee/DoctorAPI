import { Lookup } from '../src/lookup';

describe('Lookup', function() {
  let newLookup = new Lookup();
  let lookupName = "Ryan Hsi";
  let issue = "toothache";

  it('should let user look up doctors in Seattle area by name', function () {
    let promise = newLookup.searchDoctorByName(lookupName);
    return promise.then(function(response) {
      let body = JSON.parse(response);
      let doctorList = body.meta.count;
      expect(doctorList).toEqual(1);
    })
  })

  it('should let user look up doctors in Seattle area by issue', function () {
    let promise = newLookup.searchDoctorByIssue(issue);
    setTimeout(function() {
      return promise.then(function(response) {
        let body = JSON.parse(response);
        let doctorList = body.meta.total;
        expect(doctorList).toEqual(0);
      });
    }, 3000);
  })

})