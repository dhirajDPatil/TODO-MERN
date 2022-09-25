import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { createT } from "../../redux/action/todoActions";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const NewTodo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [todo, setTodo] = useState({
    task: "",
    priority: 0,
    isCompleted: false,
  });

  const addTodoHandle = async () => {
    if (todo.task === "") {
      return;
    }
    dispatch(createT(todo));
    setTodo({
      task: "",
      priority: 0,
      isCompleted: false,
    });
    navigate("../alltodos", { replace: true });
  };

  const clearHandle = () => {
    setTodo({
      task: "",
      priority: 0,
      isCompleted: false,
    });
  };

  const priorityHandle = (e) => {
    const pvalue = Number(e.target.value);
    setTodo((p) => ({ ...p, priority: pvalue }));
  };

  const handleClose = () => {
    navigate("../alltodos", { replace: true })
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, top: "200px", marginTop: 10 }}>
        <Card elevation={2} style={{ maxWidth: 750, margin: "0 auto" }}>
          <Grid
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: '0px 20px'
          }}
          >
            <Typography
              align="center"
              textTransform="uppercase"
              gutterBottom
              variant="h5"
              fontWeight={600}
              style={{ marginTop: "15px" }}
            >
              Enter Todo 
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>  
          </Grid>
          <CardContent>
            <Grid
              sx={{
                marginBottom: 2,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <RadioGroup
                onChange={priorityHandle}
                aria-labelledby="demo-row-radio-buttons-group-label"
                value={String(todo.priority)}
                name="radio-buttons-group"
                row={true}
              >
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      sx={{
                        color: "blue",
                        "&.Mui-checked": { color: 'blue' }
                      }}
                    />
                  }
                  label="Low"
                  sx={{ color: "blue" }}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio sx={{ color: "orange", "&.Mui-checked": { color: 'orange' } }} />}
                  label="Medium"
                  sx={{ color: "orange" }}
                />
                <FormControlLabel
                  value="2"
                  control={<Radio sx={{ color: "red", "&.Mui-checked": { color: 'red' } }} />}
                  label="High"
                  sx={{ color: "red"}}
                />
              </RadioGroup>
            </Grid>

            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  label="Todo"
                  value={todo.task}
                  onChange={(e) =>
                    setTodo((p) => ({ ...todo, task: e.target.value }))
                  }
                  placeholder="Enter todo task here"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid container spacing={2} item>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={addTodoHandle}
                    sx={{
                      height: "40px",
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                    fullWidth
                  >
                    Add Todo
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={clearHandle}
                    sx={{
                      height: "40px",
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default NewTodo;
