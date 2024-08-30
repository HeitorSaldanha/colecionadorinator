import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { JerseyCard } from "./components/ui/jersey-card";
import { SideMenu } from "./components/ui/side-menu";
import { ViewMode, ViewModeContextProvider } from "./context/viewModeContext";

export default function Component() {
  const [jerseys, setJerseys] = useState([
    {
      id: 1,
      team: "Manchester United",
      player: "Cristiano Ronaldo",
      season: "2022-23",
      image: "/placeholder.svg?height=200&width=200",
      value: 500,
    },
    {
      id: 2,
      team: "Barcelona",
      player: "Lionel Messi",
      season: "2021-22",
      image: "/placeholder.svg?height=200&width=200",
      value: 750,
    },
    {
      id: 3,
      team: "Real Madrid",
      player: "Karim Benzema",
      season: "2022-23",
      image: "/placeholder.svg?height=200&width=200",
      value: 600,
    },
    {
      id: 4,
      team: "Liverpool",
      player: "Mohamed Salah",
      season: "2021-22",
      image: "/placeholder.svg?height=200&width=200",
      value: 450,
    },
    {
      id: 5,
      team: "Paris Saint-Germain",
      player: "Kylian Mbappé",
      season: "2022-23",
      image: "/placeholder.svg?height=200&width=200",
      value: 800,
    },
    {
      id: 6,
      team: "Bayern Munich",
      player: "Robert Lewandowski",
      season: "2021-22",
      image: "/placeholder.svg?height=200&width=200",
      value: 550,
    },
    {
      id: 7,
      team: "Juventus",
      player: "Paulo Dybala",
      season: "2022-23",
      image: "/placeholder.svg?height=200&width=200",
      value: 400,
    },
    {
      id: 8,
      team: "Chelsea",
      player: "N'Golo Kanté",
      season: "2021-22",
      image: "/placeholder.svg?height=200&width=200",
      value: 475,
    },
  ]);
  const [filteredJerseys, setFilteredJerseys] = useState(jerseys);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [isAddingJersey, setIsAddingJersey] = useState(false);
  const [isEditingJersey, setIsEditingJersey] = useState(null);
  const [newJersey, setNewJersey] = useState({
    team: "",
    player: "",
    season: "",
    image: "",
    value: 0,
  });
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState(ViewMode.GRID);
  const handleFilterChange = () => {
    let filtered = jerseys;
    if (selectedTeam) {
      filtered = filtered.filter((jersey) => jersey.team === selectedTeam);
    }
    if (selectedPlayer) {
      filtered = filtered.filter((jersey) => jersey.player === selectedPlayer);
    }
    if (selectedSeason) {
      filtered = filtered.filter((jersey) => jersey.season === selectedSeason);
    }
    setFilteredJerseys(filtered);
  };
  const handleAddJersey = () => {
    setIsAddingJersey(true);
    setNewJersey({
      team: "",
      player: "",
      season: "",
      image: "",
      value: 0,
    });
  };
  const handleSaveJersey = () => {
    if (isEditingJersey !== null) {
      const updatedJerseys = jerseys.map((jersey) =>
        jersey.id === isEditingJersey.id ? isEditingJersey : jersey
      );
      setJerseys(updatedJerseys);
      setIsEditingJersey(null);
    } else {
      setJerseys([...jerseys, { ...newJersey, id: jerseys.length + 1 }]);
    }
    setIsAddingJersey(false);
  };
  const handleCancelJersey = () => {
    setIsAddingJersey(false);
    setIsEditingJersey(null);
  };
  const handleEditJersey = (jersey) => {
    setIsEditingJersey(jersey);
    setNewJersey(jersey);
  };
  const handleDeleteJersey = (id) => {
    setJerseys(jerseys.filter((jersey) => jersey.id !== id));
  };
  const handleNewJerseyChange = (field, value) => {
    setNewJersey({ ...newJersey, [field]: value });
  };

  return (
    <div className="flex h-screen w-full">
      <ViewModeContextProvider value={{ viewMode, setViewMode }}>
        <SideMenu />
        <main className="flex-1 p-6 grid gap-6">
          {viewMode === ViewMode.GRID ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredJerseys.map((jersey) => (
                <JerseyCard
                  jersey={jersey}
                  onEdit={() => handleDeleteJersey(jersey)}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredJerseys.map((jersey) => (
                <></>
              ))}
            </div>
          )}
        </main>
        {(isAddingJersey || isEditingJersey) && (
          <div className="fixed inset-0 bg-background/50 flex items-center justify-center z-20">
            <Card className="w-full max-w-md p-6">
              <CardHeader>
                <CardTitle>
                  {isEditingJersey ? "Edit Jersey" : "Add New Jersey"}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="team">Team</Label>
                  <Input
                    id="team"
                    value={newJersey.team}
                    onChange={(e) =>
                      handleNewJerseyChange("team", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="player">Player</Label>
                  <Input
                    id="player"
                    value={newJersey.player}
                    onChange={(e) =>
                      handleNewJerseyChange("player", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="season">Season</Label>
                  <Input
                    id="season"
                    value={newJersey.season}
                    onChange={(e) =>
                      handleNewJerseyChange("season", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={newJersey.image}
                    onChange={(e) =>
                      handleNewJerseyChange("image", e.target.value)
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    type="number"
                    value={newJersey.value}
                    onChange={(e) =>
                      handleNewJerseyChange("value", Number(e.target.value))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={handleSaveJersey}>
                  {isEditingJersey ? "Save" : "Add"}
                </Button>
                <Button variant="outline" onClick={handleCancelJersey}>
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </ViewModeContextProvider>
    </div>
  );
}

function MoveVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}
