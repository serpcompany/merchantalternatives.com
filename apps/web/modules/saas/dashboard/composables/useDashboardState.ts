export const useDashboardState = () => {
  const sidebarExpanded = useState(
    "dashboardState.sidebarExpanded",
    () => false,
  );
  const createTeamDialogOpen = useState(
    "dashboardState.createTeamDialogOpen",
    () => false,
  );
  const editBrandHeaderOpen = useState(
    "dashboardState.editBrandHeaderOpen",
    () => false,
  );

  return {
    sidebarExpanded,
    createTeamDialogOpen,
    editBrandHeaderOpen,
  };
};
