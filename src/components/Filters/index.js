import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const PeriodType = {
  CUSTOM: 'custom',
  CURRENT_MONTH: 'current_month',
};

const Filters = (props) => {

  const handleRangePickerChange = (_, stringDates) => {
    const startDate = stringDates[0];
    const endDate = stringDates[1];

    if (startDate && endDate) {
      const updatedFilters = props.filters;
      updatedFilters.periodType = PeriodType.CUSTOM;
      updatedFilters.startDate = startDate;
      updatedFilters.endDate = endDate;
      props.setFilters(updatedFilters);
    } else {
      const updatedFilters = props.filters;
      updatedFilters.periodType = PeriodType.CURRENT_MONTH;
      updatedFilters.startDate = null;
      updatedFilters.endDate = null;
      props.setFilters(updatedFilters);
    }
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