import { render, screen } from '@testing-library/react';
import SymbolCardHeader from './SymbolCardHeader';

// Mock the image imports
jest.mock('@/assets/down.png', () => 'down-image-stub');
jest.mock('@/assets/up.png', () => 'up-image-stub');

type SymbolCardHeaderProps = {
  id: string;
  price: number;
  trend: 'UP' | 'DOWN' | null;
};

describe('SymbolCardHeader', () => {
  const defaultProps: SymbolCardHeaderProps = {
    id: 'AAPL',
    price: 150.5,
    trend: 'UP'
  };

  const renderComponent = (props: Partial<SymbolCardHeaderProps> = {}) => {
    return render(<SymbolCardHeader {...defaultProps} {...props} />);
  };

  it('renders the symbol ID', () => {
    renderComponent();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });

  it('renders up trend image when trend is UP and price exists', () => {
    renderComponent({ trend: 'UP' });
    const trendImage = screen.getByAltText('Trend UP') as HTMLImageElement;
    expect(trendImage).toBeInTheDocument();
  });

  it('renders down trend image when trend is DOWN and price exists', () => {
    renderComponent({ trend: 'DOWN' });
    const trendImage = screen.getByAltText('Trend DOWN') as HTMLImageElement;
    expect(trendImage).toBeInTheDocument();
  });

  it('does not render trend image when price is 0', () => {
    renderComponent({ price: 0 });
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = renderComponent();
    expect(container.querySelector('.symbolCard--header')).toBeInTheDocument();
    expect(container.querySelector('.symbolCard--header__title')).toBeInTheDocument();
    expect(container.querySelector('.symbolCard--header__trend')).toBeInTheDocument();
  });
});
