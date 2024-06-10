import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Note } from 'src/api/types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 70 },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'date', headerName: 'Date', width: 130, type: 'date' }
];

export default function Notes({ notes }: { notes: Note[] }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={notes}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 2 }
          }
        }}
        pageSizeOptions={[2, 5, 10]}
      />
    </div>
  );
}
