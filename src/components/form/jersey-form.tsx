import { Ijersey, JerseyType } from '@/model/jersey';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useCallback, useState } from 'react';
import { useJerseysViewContext } from '@/contexts/JerseysViewContext';
import { useUpdateJerseys } from '@/apis/UseCollections';
import { v4 as uuidv4 } from 'uuid';

export function JerseyForm({
  initialData,
}: {
  onSubmit: (jersey: Ijersey | Omit<Ijersey, 'id' | 'imageUrl'>) => void;
  initialData?: Ijersey | null;
}) {
  const [formData, setFormData] = useState(
    initialData || { team: '', number: '', player: '', season: '' }
  );
  const { isEditMode } = useJerseysViewContext();

  const { mutate: updateJerseys, isPending } = useUpdateJerseys();

  const editJersey = useCallback(() => {}, []);

  const addJersey = useCallback(() => {
    updateJerseys([
      { ...formData, id: uuidv4(), type: JerseyType.HOME, imageUrl: '' },
    ]);
  }, [formData, updateJerseys]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isEditMode) {
        editJersey();
      } else {
        addJersey();
      }
    },
    [addJersey, editJersey, isEditMode]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="team">Team</Label>
        <Input
          id="team"
          value={formData.team}
          onChange={(e) => setFormData({ ...formData, team: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="player">Player</Label>
        <Input
          id="player"
          value={formData.player}
          onChange={(e) => setFormData({ ...formData, player: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="season">season</Label>
        <Input
          id="season"
          value={formData.season}
          onChange={(e) => setFormData({ ...formData, season: e.target.value })}
          required
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending
          ? 'Loading...'
          : initialData
            ? 'Update Jersey'
            : 'Add Jersey'}
      </Button>
    </form>
  );
}
