import { Card, Statistic, } from 'antd';

import Loader from '../Loader';

const BalanceCard = ({title, value, color, icon, prefix}) => (
  <Card>
    <Statistic
      title={title}
      precision={2}
      value={value}
      prefix={prefix}
      suffix={icon}
      valueStyle={{ color: color }}
    />
  </Card>
)

const BalanceValue = ({value, sign}) => {
  if (value !== undefined) {
    const val = new Intl.NumberFormat('en-US').format(value);
    return (<>{sign} {val}</>);
  } else {
    return (<Loader />);
  }
}

BalanceCard.BalanceValue = BalanceValue;
export default BalanceCard;