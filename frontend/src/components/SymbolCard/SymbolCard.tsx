import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import SymbolCardHeader from './src/SymbolCardHeader';
import SymbolCardPrice from './src/symbolCardPrice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName } = useAppSelector((state) => state.stocks.entities[id]);
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
      <SymbolCardHeader id={id} price={price} trend={trend} />
      <SymbolCardPrice price={price} />
      <ListItem Icon={<CompanyIcon />} label={companyName} />
    </div>
  );
};
export default SymbolCard;
