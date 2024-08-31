import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import { useJerseysViewContext } from '@/contexts/JerseysViewContext';
import { Ijersey } from '@/model/jersey';
import { Pencil, Trash2 } from 'lucide-react';

interface IJerseyCardProps {
  jersey: Ijersey;
  variant: 'grid' | 'list';
  onDelete: (id: number) => void;
}

export function JerseyCard({
  jersey: { id, imageUrl, number, player, team, season },
  variant,
  onDelete,
}: IJerseyCardProps) {
  const { setIsEditMode, setIsFormOpen } = useJerseysViewContext();

  const handleEditJersey = () => {
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  if (variant === 'grid') {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="aspect-square relative mb-2">
            <img
              src={imageUrl}
              alt={`${team} ${number} jersey`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <h3 className="font-semibold">{team}</h3>
          <p>Number: {number}</p>
          <p>Player: {player}</p>
          <p>Season: {season}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm" onClick={handleEditJersey}>
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(id)}>
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <TableRow>
      <TableCell>{team}</TableCell>
      <TableCell>{number}</TableCell>
      <TableCell>{player}</TableCell>
      <TableCell>{season}</TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" onClick={handleEditJersey}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
