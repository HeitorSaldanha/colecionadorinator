import { Ijersey } from '@/model/jersey';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useState } from 'react';

export function JerseyForm({
  onSubmit,
  initialData,
}: {
  onSubmit: (jersey: Ijersey | Omit<Ijersey, 'id' | 'imageUrl'>) => void;
  initialData?: Ijersey | null;
}) {
  const [formData, setFormData] = useState(
    initialData || { team: '', number: '', player: '', season: '' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
      <Button type="submit">{initialData ? 'Update' : 'Add'} Jersey</Button>
    </form>
  );
}
