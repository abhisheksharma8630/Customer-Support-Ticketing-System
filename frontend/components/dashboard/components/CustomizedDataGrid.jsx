import * as React from "react";
import { DataGrid, GridSkeletonCell } from "@mui/x-data-grid";
// import { columns, rows } from "../internals/data/gridData";
import { Box, Grid2, Link, Skeleton, Typography } from "@mui/material";
import { renderStatus } from "../internals/data/gridData";
import axios from "axios";
import {
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

import Cookies from 'js-cookie'

export default function CustomizedDataGrid() {
  const [agents,setAgents] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows,setRows] = React.useState([]);
  const [loading,setLoading] = React.useState(false);

  const fetchTickets = async(status)=>{
    setLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket/${status}`,{headers:{
      Authorization:`Bearer ${Cookies.get('accessToken')}`
    }});
    setLoading(false);
    setRows(response.data);
  }
  React.useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/get-agents`
        );
        setAgents(response.data); // Set agents in state
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
    fetchTickets("");
  }, []);


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = async (newRow) => {
    const agentId = agents.filter((agent) => agent.name == newRow.agentName)[0];
    console.log(newRow,agentId);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/assign-agents`,{ticketId:newRow._id,agentId:agentId?._id})
    console.log(response);
    return response.data.updatedTicket;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  
  const columns = [
    { field: "title", headerName: "Title", flex: 1.5, minWidth: 200, renderCell:(params)=>{return <Link href={`/ticket/${params.row._id}`} underline="none">{params.value}</Link>} },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => renderStatus(params.value),
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 0.5,
      minWidth: 80,
      editable:true,
      type:"singleSelect",
      valueOptions:["low","medium","high"],
      renderCell: (params) => renderStatus(params.value),
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "agentName",
      headerName: "Agent Name",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 80,
      editable:true,
      type:"singleSelect",
      valueOptions: agents.map((agent)=>agent.name),
      renderCell: (params) => params.value || "Not assigned",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 120,
      renderCell: (params) =>
        params.value
          ? new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(params.value)) // Format date
          : "Nope",
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      headerAlign: "right",
      align: "right",
      flex: 1,
      minWidth: 100,
      renderCell: (params) =>
        params.value
          ? new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(params.value)) // Format date
          : "Pending",
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const isCellEditable = (params) => {
    if (params.field === "agentName") {
      return !params.row.agentName; // Editable only when agentName is not assigned
    }
    return true;
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid2 container spacing={2} columns={12} width={"100%"}>
        <Grid2 size={{ xs: 12, lg: 12 }}>
          <DataGrid 
            rows={rows}
            getRowId={(row)=>{
              return row._id;
            }}
            editMode="row"
            columns={columns}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error)=>{console.log(error)}}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            isCellEditable={isCellEditable}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            loading={loading}
            slotProps={{
              loadingOverlay: {
                variant: 'skeleton',
                noRowsVariant: 'skeleton',
              },          
              filterPanel: {
                filterFormProps: {
                  logicOperatorInputProps: {
                    variant: "outlined",
                    size: "small",
                  },
                  columnInputProps: {
                    variant: "outlined",
                    size: "small",
                    sx: { mt: "auto" },
                  },
                  operatorInputProps: {
                    variant: "outlined",
                    size: "small",
                    sx: { mt: "auto" },
                  },
                  valueInputProps: {
                    InputComponentProps: {
                      variant: "outlined",
                      size: "small",
                    },
                  },
                },
              },
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
