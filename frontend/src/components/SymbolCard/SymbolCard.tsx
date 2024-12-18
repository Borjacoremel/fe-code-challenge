import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { selectSymbolCardData } from './src/selectors/symbolCardSelector';
import SymbolCardHeader from './src/SymbolCardHeader';
import SymbolCardPrice from './src/SymbolCardPrice';
import SymbolCardInfo from './src/SymbolCardInfo';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const symbolData = useAppSelector((state) => selectSymbolCardData(state, id));
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const { trend, companyName, industry, marketCap } = symbolData;

  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
      <SymbolCardHeader id={id} price={price} trend={trend} />
      <SymbolCardPrice price={price} />
      {showCardInfo && (
        <SymbolCardInfo companyName={companyName} industry={industry} marketCap={`${marketCap}`} />
      )}
    </div>
  );
};
export default SymbolCard;
