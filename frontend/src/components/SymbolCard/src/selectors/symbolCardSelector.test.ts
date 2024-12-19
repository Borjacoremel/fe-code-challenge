import { selectSymbolCardData, makeSelectSymbolCardData } from './symbolCardSelector';

describe('Symbol Card Selectors', () => {
  const mockStock = {
    id: 'AAPL',
    name: 'Apple Inc.',
    price: 150.5,
    industry: 'Technology'
  };

  const mockState = {
    stocks: {
      entities: {
        AAPL: mockStock,
        GOOGL: {
          id: 'GOOGL',
          name: 'Alphabet Inc.',
          price: 2800.75,
          industry: 'Technology'
        }
      },
      ids: ['AAPL', 'GOOGL']
    },
    prices: {
      AAPL: 150.5,
      GOOGL: 2800.75
    },
    priceHistory: {
      entities: {},
      ids: []
    },
    store: {
      selectedSymbols: ['AAPL']
    }
  };

  describe('selectSymbolCardData', () => {
    it('should select correct stock data by id', () => {
      const result = selectSymbolCardData(mockState as any, 'AAPL');
      expect(result).toEqual(mockStock);
    });

    it('should return undefined for non-existent stock id', () => {
      const result = selectSymbolCardData(mockState as any, 'INVALID');
      expect(result).toBeUndefined();
    });

    it('should maintain reference equality for same input', () => {
      const result1 = selectSymbolCardData(mockState as any, 'AAPL');
      const result2 = selectSymbolCardData(mockState as any, 'AAPL');
      expect(result1).toBe(result2);
    });

    it('should return different references for different ids', () => {
      const result1 = selectSymbolCardData(mockState as any, 'AAPL');
      const result2 = selectSymbolCardData(mockState as any, 'GOOGL');
      expect(result1).not.toBe(result2);
    });
  });

  describe('makeSelectSymbolCardData', () => {
    it('should create a memoized selector', () => {
      const selectSymbolCard = makeSelectSymbolCardData();
      const result1 = selectSymbolCard(mockState, 'AAPL');
      const result2 = selectSymbolCard(mockState, 'AAPL');
      expect(result1).toBe(result2);
    });

    it('should select correct data using created selector', () => {
      const selectSymbolCard = makeSelectSymbolCardData();
      const result = selectSymbolCard(mockState, 'AAPL');
      expect(result).toEqual(mockStock);
    });

    it('should handle undefined stock id', () => {
      const selectSymbolCard = makeSelectSymbolCardData();
      const result = selectSymbolCard(mockState, 'INVALID');
      expect(result).toBeUndefined();
    });

    it('should create independent selectors', () => {
      const selectSymbolCard1 = makeSelectSymbolCardData();
      const selectSymbolCard2 = makeSelectSymbolCardData();

      expect(selectSymbolCard1(mockState, 'AAPL')).toEqual(mockStock);
      expect(selectSymbolCard2(mockState, 'AAPL')).toEqual(mockStock);
      expect(selectSymbolCard1).not.toBe(selectSymbolCard2);
    });

    it('should handle empty state', () => {
      const emptyState = {
        stocks: {
          entities: {},
          ids: []
        },
        prices: {},
        priceHistory: {
          entities: {},
          ids: []
        },
        store: {
          selectedSymbols: []
        }
      };

      const selectSymbolCard = makeSelectSymbolCardData();
      const result = selectSymbolCard(emptyState, 'AAPL');
      expect(result).toBeUndefined();
    });

    it('should maintain memoization across different instances', () => {
      const selectSymbolCard1 = makeSelectSymbolCardData();
      const selectSymbolCard2 = makeSelectSymbolCardData();

      const result1 = selectSymbolCard1(mockState, 'AAPL');
      const result2 = selectSymbolCard2(mockState, 'AAPL');

      // Different selector instances should still return the same reference
      // when selecting the same data
      expect(result1).toBe(result2);
    });
  });
});
