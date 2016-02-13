import VIZI from '../../src/vizicities';

describe('VIZI', () => {
  describe('Version', () => {
    it('should exist', () => {
      expect(VIZI.version).to.exist;
    });
  });
});
