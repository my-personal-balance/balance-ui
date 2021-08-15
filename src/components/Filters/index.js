import { useState } from 'react';
import { DatePicker } from 'antd';

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
    <RangePicker bordered={false} onChange={(v, s) => handleRangePickerChange(v, s)} onOpenChange={isOpen => onOpenChange(isOpen)} />
  )
}

export default Filters;