import { memo } from 'react';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import ListItem from '@/components/ListItem';

type SymbolCardInfoProps = {
  companyName: string;
  industry: string;
  marketCap: string;
};

const SymbolCardInfo = memo(({ companyName, industry, marketCap }: SymbolCardInfoProps) => (
  <>
    <ListItem Icon={<CompanyIcon />} label={companyName} />
    <ListItem Icon={<IndustryIcon />} label={industry} />
    <ListItem Icon={<MarketCapIcon />} label={marketCap} />
  </>
));

SymbolCardInfo.displayName = 'SymbolCardInfo';

export default SymbolCardInfo;
