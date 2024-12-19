import { render, act } from '@testing-library/react';
import AnimationWrapper from './AnimationWrapper';

describe('AnimationWrapper', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockChildren = jest.fn((shake: boolean, glow: string, handleAnimationEnd: () => void) => (
    <div data-testid="child" onClick={handleAnimationEnd} data-shake={shake} data-glow={glow}>
      Child Component
    </div>
  ));

  const renderComponent = (initialPrice: number) => {
    return render(<AnimationWrapper price={initialPrice}>{mockChildren}</AnimationWrapper>);
  };

  it('initializes with no animations', () => {
    renderComponent(100);

    expect(mockChildren).toHaveBeenCalledWith(false, '', expect.any(Function));
  });

  it('does not animate on initial render', () => {
    const { getByTestId } = renderComponent(100);

    expect(getByTestId('child')).toHaveAttribute('data-shake', 'false');
    expect(getByTestId('child')).toHaveAttribute('data-glow', '');
  });

  describe('price changes', () => {
    it('glows green when price increases', () => {
      const { rerender, getByTestId } = renderComponent(100);

      // Trigger price increase
      rerender(<AnimationWrapper price={150}>{mockChildren}</AnimationWrapper>);

      expect(getByTestId('child')).toHaveAttribute('data-glow', 'green');

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId('child')).toHaveAttribute('data-glow', '');
    });

    it('glows red when price decreases', () => {
      const { rerender, getByTestId } = renderComponent(100);

      // Trigger price decrease
      rerender(<AnimationWrapper price={50}>{mockChildren}</AnimationWrapper>);

      expect(getByTestId('child')).toHaveAttribute('data-glow', 'red');

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId('child')).toHaveAttribute('data-glow', '');
    });

    it('shakes on price changes >=75%', () => {
      const { rerender, getByTestId } = renderComponent(100);

      // Trigger large price increase (100%)
      rerender(<AnimationWrapper price={200}>{mockChildren}</AnimationWrapper>);

      expect(getByTestId('child')).toHaveAttribute('data-shake', 'true');

      getByTestId('child').click();

      expect(getByTestId('child')).toHaveAttribute('data-shake', 'true');
    });

    it('does not shake on price changes <75%', () => {
      const { rerender, getByTestId } = renderComponent(100);

      // Trigger small price increase (50%)
      rerender(<AnimationWrapper price={150}>{mockChildren}</AnimationWrapper>);

      expect(getByTestId('child')).toHaveAttribute('data-shake', 'false');
    });

    it('handles multiple price updates correctly', () => {
      const { rerender, getByTestId } = renderComponent(100);

      // First update
      rerender(<AnimationWrapper price={150}>{mockChildren}</AnimationWrapper>);

      expect(getByTestId('child')).toHaveAttribute('data-glow', 'green');

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Second update
      rerender(<AnimationWrapper price={50}>{mockChildren}</AnimationWrapper>);

      expect(getByTestId('child')).toHaveAttribute('data-glow', 'red');

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(getByTestId('child')).toHaveAttribute('data-glow', '');
    });
  });
});
