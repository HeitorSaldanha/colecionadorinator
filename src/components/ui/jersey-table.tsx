import { JerseyCard } from './jersey';
import { Table, TableHeader, TableRow, TableHead, TableBody } from './table';
import { Ijersey } from '@/model/jersey';

interface JerseyTableProps {
  jerseys: Ijersey[];
}

export function JerseyTable({ jerseys }: JerseyTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Team</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Player</TableHead>
          <TableHead>season</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jerseys.map((jersey) => (
          <JerseyCard jersey={jersey} variant="list" onDelete={() => {}} />
        ))}
      </TableBody>
    </Table>
  );
}
