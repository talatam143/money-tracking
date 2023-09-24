export const DashbaordIcon = (props) => {
  let classString = props.isSelected
    ? "icon icon-tabler icon-tabler-layout-dashboard filledDashboardIcon"
    : "icon icon-tabler icon-tabler-layout-dashboard outlinedDashboardIcon";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classString}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 4h6v8h-6z"></path>
      <path d="M4 16h6v4h-6z"></path>
      <path d="M14 12h6v8h-6z"></path>
      <path d="M14 4h6v4h-6z"></path>
    </svg>
  );
};

export const TransactionsIcon = (props) => {
  let classString = props.isSelected
    ? "icon icon-tabler icon-tabler-clipboard-text filledTransactionIcon"
    : "icon icon-tabler icon-tabler-clipboard-text outlinedTransactionIcon";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classString}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
      <path d="M9 12h6"></path>
      <path d="M9 16h6"></path>
    </svg>
  );
};

export const UserAccountIcon = (props) => {
  let classString = props.isSelected
    ? "icon icon-tabler icon-tabler-user-square-rounded filledAccountIcon"
    : "icon icon-tabler icon-tabler-user-square-rounded outlinedAccountIcon";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classString}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6z"></path>
      <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
      <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05"></path>
    </svg>
  );
};
