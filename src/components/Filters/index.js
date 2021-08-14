import { useState, useEffect } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const Filters = (props) => {

  const [filters, setFilters] = useState(props.filters);

  useEffect(() => {
    setFilters(props.filters);
  }, [props.filters]);

  const handleRangePickerChange = (_, stringDates) => {
    const updatedFilters = filters;
    updatedFilters.periodType = "custom";
    updatedFilters.startDate = stringDates[0];
    updatedFilters.endDate = stringDates[1];
    setFilters(updatedFilters);
  }

  const onOpenChange = (isOpen) => {
    if (!isOpen) {
      props.action();
    }
  }

  return (
    <RangePicker bordered={false} onChange={(v, s) => handleRangePickerChange(v, s)} onOpenChange={isOpen => onOpenChange(isOpen)} />
  )
}

export default Filters;