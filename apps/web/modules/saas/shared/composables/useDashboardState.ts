export const useDashboardState = () => {
  const sidebarExpanded = useState(
    "dashboardState.sidebarExpanded",
    () => false,
  );
  const createTeamDialogOpen = useState(
    "dashboardState.createTeamDialogOpen",
    () => false,
  );
  const settingsDialogOpen = useState(
    "dashboardState.settingsDialogOpen",
    () => false,
  );

  return {
    sidebarExpanded,
    createTeamDialogOpen,
    settingsDialogOpen,
  };
};
