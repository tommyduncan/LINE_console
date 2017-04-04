var should = require('should');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      var array = [1, 2, 3];

      should(array.indexOf(2)).equal(1).and.not.be.a.String();
    });
  });
});