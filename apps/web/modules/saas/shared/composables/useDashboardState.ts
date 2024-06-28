export const useDashboardState = () => {
  const sidebarExpanded = useState(
    "dashboardState.sidebarExpanded",
    () => false,
  );
  const createCompanyDialogOpen = useState(
    "dashboardState.createCompanyDialogOpen",
    () => false,
  );
  const settingsDialogOpen = useState(
    "dashboardState.settingsDialogOpen",
    () => false,
  );

  return {
    sidebarExpanded,
    createCompanyDialogOpen,
    settingsDialogOpen,
  };
};
