export function useJerseysApi() {
  //TODO Add DB integration
  return {
    teams: [{ value: "cam", label: "Alético Mineiro" }],
    seasons: [{ value: "2024", label: "2024" }],
    players: [{ value: "hulk", label: "Hulk" }],
  };
}
