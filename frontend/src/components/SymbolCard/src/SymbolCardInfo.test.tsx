import { render, screen } from '@testing-library/react';
import SymbolCardInfo from './SymbolCardInfo';

// Mock the SVG imports
jest.mock('@/assets/company.svg', () => ({
  ReactComponent: () => <div data-testid="company-icon" />
}));
jest.mock('@/assets/industry.svg', () => ({
  ReactComponent: () => <div data-testid="industry-icon" />
}));
jest.mock('@/assets/market_cap.svg', () => ({
  ReactComponent: () => <div data-testid="market-cap-icon" />
}));

describe('SymbolCardInfo', () => {
  const defaultProps = {
    companyName: 'Apple Inc.',
    industry: 'Technology',
    marketCap: '$2.5T'
  };

  const renderComponent = (props = {}) => {
    return render(<SymbolCardInfo {...defaultProps} {...props} />);
  };

  it('renders all list items with correct labels', () => {
    renderComponent();

    // We can test for the actual structure that ListItem creates
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('$2.5T')).toBeInTheDocument();
  });

  it('renders all icons', () => {
    renderComponent();

    expect(screen.getByTestId('company-icon')).toBeInTheDocument();
    expect(screen.getByTestId('industry-icon')).toBeInTheDocument();
    expect(screen.getByTestId('market-cap-icon')).toBeInTheDocument();
  });

  it('renders with different props values', () => {
    const newProps = {
      companyName: 'Microsoft',
      industry: 'Software',
      marketCap: '$1.8T'
    };

    renderComponent(newProps);

    expect(screen.getByText('Microsoft')).toBeInTheDocument();
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('$1.8T')).toBeInTheDocument();
  });
});
