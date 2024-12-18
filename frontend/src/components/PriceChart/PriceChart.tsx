import { useEffect } from 'react';
import './priceChart.css';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '@/components/Loading';

type PriceChartProps = {
  symbolId: string | null;
};

const PriceChart = ({ symbolId }: PriceChartProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (symbolId) {
      const timer = setTimeout(() => {
        dispatch(fetchPriceHistory(symbolId));
      }, 300); // Debounce delay of 300ms

      return () => clearTimeout(timer);
    }
  }, [dispatch, symbolId]);

  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  if (!symbolId) return <div className="priceChart">Select stock</div>;

  if (apiState.loading)
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );

  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;

  if (!data || data.length === 0) return <div className="priceChart">No price data available.</div>;

  const formattedData = data.map((e) => ({
    ...e,
    time: isNaN(new Date(e.time).getTime()) ? 'Invalid Date' : new Date(e.time).toLocaleTimeString()
  }));

  return (
    <div className="priceChart">
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
