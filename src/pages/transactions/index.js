import TransactionsComponent from "../../components/Transactions"

const Transactions = () => (
  <TransactionsComponent
    title="Transactions"
    filters={
      {
        accountId: null,
        periodType: "current_month",
        startDate: null,
        endDate: null,
      }
    }
  />
);

export default Transactions;