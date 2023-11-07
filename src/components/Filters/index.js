import { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export const PeriodType = {
  CUSTOM: 'custom',
  CURRENT_MONTH: 'current_month',
};

const Filters = (props) => {

  const [filters, setFilters] = useState(props.filters);

  const handleRangePickerChange = (_, stringDates) => {
    const startDate = stringDates[0];
    const endDate = stringDates[1];

    if (startDate && endDate) {
      const updatedFilters = props.filters;
      updatedFilters.periodType = PeriodType.CUSTOM;
      updatedFilters.startDate = startDate;
      updatedFilters.endDate = endDate;
      setFilters(updatedFilters);
    } else {
      const updatedFilters = props.filters;
      updatedFilters.periodType = PeriodType.CURRENT_MONTH;
      updatedFilters.startDate = null;
      updatedFilters.endDate = null;
      setFilters(updatedFilters);
    }
  }

  const onOpenChange = (isOpen) => {
    if (!isOpen) {
      props.addFilters(filters);
    }
  }

  return (
    <RangePicker
      bordered={false}
      onChange={(v, s) => handleRangePickerChange(v, s)}
      onOpenChange={isOpen => onOpenChange(isOpen)}
      ranges={{
        Today: [moment(), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment().add(-1, 'month').startOf('month'),
          moment().add(-1, 'month').endOf('month')
        ],
        'This Year': [
          moment().startOf('year'),
          moment().endOf('year')
        ],
        'Last Year': [
          moment().add(-1, 'year').startOf('year'),
          moment().add(-1, 'year').endOf('year')
        ],
        'Last 3 Months': [
          moment().add(-3, 'month').startOf('month'),
          moment().endOf('month')
        ],
        'Last 6 Months': [
          moment().add(-6, 'month').startOf('month'),
          moment().endOf('month')
        ],
        'Last 12 Months': [
          moment().add(-12, 'month').startOf('month'),
          moment().endOf('month')
        ],
      }}
    />
  )
}

export default Filters;