import { render, screen } from '@testing-library/react';
import SymbolCardPrice from './SymbolCardPrice';

describe('SymbolCardPrice', () => {
  const renderComponent = (props: { price: number }) => {
    return render(<SymbolCardPrice {...props} />);
  };

  describe('price formatting', () => {
    it('displays dashes when price is 0', () => {
      renderComponent({ price: 0 });
      expect(screen.getByText('--')).toBeInTheDocument();
    });

    it('formats prices >= 10 as whole numbers with dollar sign', () => {
      renderComponent({ price: 150.75 });
      expect(screen.getByText('$150')).toBeInTheDocument();

      renderComponent({ price: 1000.99 });
      expect(screen.getByText('$1000')).toBeInTheDocument();

      renderComponent({ price: 10.0 });
      expect(screen.getByText('$10')).toBeInTheDocument();
    });

    it('formats prices < 10 with one decimal place and dollar sign', () => {
      renderComponent({ price: 9.87 });
      expect(screen.getByText('$9.9')).toBeInTheDocument();

      renderComponent({ price: 1.23 });
      expect(screen.getByText('$1.2')).toBeInTheDocument();

      renderComponent({ price: 0.45 });
      expect(screen.getByText('$0.5')).toBeInTheDocument();
    });

    it('handles edge case of exactly 10', () => {
      renderComponent({ price: 10 });
      expect(screen.getByText('$10')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('renders with correct CSS classes', () => {
      const { container } = renderComponent({ price: 100 });

      expect(container.querySelector('.symbolCardPrice')).toBeInTheDocument();
      expect(container.querySelector('.symbolCardPrice--priceTitle')).toBeInTheDocument();
      expect(container.querySelector('.symbolCardPrice--priceValue')).toBeInTheDocument();
    });

    it('renders "Price:" label', () => {
      renderComponent({ price: 100 });
      expect(screen.getByText('Price:')).toBeInTheDocument();
    });
  });
});
