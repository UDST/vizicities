import VIZI from '../../src/vizicities';

describe('VIZI', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(VIZI, 'greet');
      VIZI.greet();
    });

    it('should have been run once', () => {
      expect(VIZI.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(VIZI.greet).to.have.always.returned('hello');
    });
  });
});
