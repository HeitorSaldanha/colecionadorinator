import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoveVerticalIcon } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { TJersey } from "@/model/jersey";

export interface JerseyCardProps {
  jersey: TJersey;
  onEdit: () => void;
  onDelete: () => void;
}

export function JerseyCard({
  jersey: { team, season, type, value },
  onEdit,
  onDelete,
}: JerseyCardProps) {
  return (
    <Card className="relative group">
      <img
        src="/placeholder.svg"
        alt={`${team}-${season}-${type}-jersey`}
        width={200}
        height={200}
        className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
      />
      <CardContent className="pt-4">
        <h3 className="font-semibold">{season}</h3>
        <p className="text-sm text-muted-foreground">{team}</p>
        <p className="text-sm font-semibold">${value}</p>
        <div className="flex gap-2 mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <MoveVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
