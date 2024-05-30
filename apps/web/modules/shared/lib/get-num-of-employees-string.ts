export const getNumOfEmployeesString = (numOfEmployees: number): string => {
  if (numOfEmployees <= 10) return "1-10 employees";
  if (numOfEmployees <= 50) return "11-50 employees";
  if (numOfEmployees <= 200) return "51-200 employees";
  if (numOfEmployees <= 500) return "201-500 employees";
  if (numOfEmployees <= 1000) return "501-1k employees";
  if (numOfEmployees <= 5000) return "1k-5k employees";
  if (numOfEmployees <= 10000) return "5k-10k employees";
  else return "10k+ employees";
};
