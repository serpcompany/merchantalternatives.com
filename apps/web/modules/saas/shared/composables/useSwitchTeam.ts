export const useSwitchTeam = () => {
  const currentTeamId = useCurrentTeamIdCookie();
  const { reloadUser } = useUser();

  const switchTeam = async (teamId: string) => {
    currentTeamId.value = teamId;
    await reloadUser();
    window.location.reload();
  };

  return {
    switchTeam,
  };
};
