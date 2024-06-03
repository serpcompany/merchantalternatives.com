export const useDashboardState = () => {
  const sidebarExpanded = useState(
    "dashboardState.sidebarExpanded",
    () => false,
  );
  const createBrandDialogOpen = useState(
    "dashboardState.createBrandDialogOpen",
    () => false,
  );
  const settingsDialogOpen = useState(
    "dashboardState.settingsDialogOpen",
    () => false,
  );

  return {
    sidebarExpanded,
    createBrandDialogOpen,
    settingsDialogOpen,
  };
};
