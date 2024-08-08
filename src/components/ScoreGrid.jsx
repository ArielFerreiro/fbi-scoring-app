import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useScore } from '../hooks/useScore';
import { useEffect, useState } from 'react';
import { calculatePoints } from '../helpers';


const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'round', headerName: 'Ronda', width: 150, sortable: false},
  { field: '1D', headerName: '1D', width: 60, sortable: false },
  { field: '2D', headerName: '2D', width: 60, sortable: false },
  { field: '3D', headerName: '3D', width: 60, sortable: false },
  { field: '4D', headerName: '4D', width: 60, sortable: false },
  { field: '5D', headerName: '5D', width: 60, sortable: false },
  { field: 'impacts', headerName: 'Impactos', width: 90, sortable: false },
  { field: 'points', headerName: 'Puntos', width: 90, sortable: false },
];

export const ScoreGrid = () => {

    const { scores } = useScore();
    const [rows, setRows] = useState([]);

    useEffect( () => {

        let newRows = [];

        scores.map( (round, index) => {

            const total = round.reduce(calculatePoints);
            const impactos = round.filter( (e) => e > 0);

            let ronda = '';

            if (index === 0) {
                ronda = 'Prueba';
            } else {
                if ( index <= 8 ) {
                    ronda = `Ronda ${ index }`;
                } else {
                    ronda = `Reintento ${ index-8 }`;
                }
            }

            const newItem = {
                id: index,
                round: ronda,
                '1D': round[0],
                '2D': round[1],
                '3D': round[2],
                '4D': round[3],
                '5D': round[4],
                'impacts': impactos.length,
                'points': total
            };

            newRows = [...newRows, newItem];
        });

        setRows( newRows );

    }, [scores]);

    return (
        <Box sx={{mt: 5, width: '90%'}}>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                columns: {
                columnVisibilityModel: {
                    // Hide columns status and traderName, the other columns will remain visible
                    id: false,
                },
                },
            }}
        />
        </Box>
    )
}
