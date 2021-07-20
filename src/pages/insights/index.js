
import TransactionsComponent from "../../components/Transactions";

const Insights = () => (
  <TransactionsComponent
    title="Insights" 
    filters={
      {
        accountId: null,
        periodType: null,
        startDate: null,
        endDate: null,
      }
    }
  />
);

export default Insights;


