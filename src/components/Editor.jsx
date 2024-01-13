import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
const Editor = ({ pesna, setPesna }) => {
  const [numberOfStrophes, setNumberOfStrophes] = useState(
    pesna?.songVersions[0].strophes.length
  );
  const addStrophe = () => {
    //handle adding new strophe
    setPesna((prev) => {
      const strophes = [...prev.songVersions[0].strophes];
      strophes.push({
        row: strophes.length + 1,
        verses: [],
        type: "DEFAULT",
      });

      return {
        ...prev,
        songVersions: [
          {
            alternativeTitle: null,
            sourceNumber: null,
            strophes,
          },
        ],
      };
    });
  };

  const removeStrophe = () => {
    //handle removing a strophe
    setPesna((prev) => {
      const strophes = [...prev.songVersions[0].strophes];
      strophes.pop();

      return {
        ...prev,
        songVersions: [
          {
            alternativeTitle: null,
            sourceNumber: null,
            strophes,
          },
        ],
      };
    });
  };
  return (
    <Grid item xs={6} borderRight={"1px solid grey"} paddingRight={"20px"}>
      <TextField
        sx={{ marginBottom: "20px" }}
        fullWidth
        id="uniqueId"
        label="Unique Id"
        type="number"
        value={parseInt(pesna?.uniqueId)}
        inputProps={{ min: 1 }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="standard"
        onChange={(e) =>
          setPesna((prev) => {
            let uniqueId = e.target.value;

            return {
              ...prev,
              uniqueId: "0000".slice(uniqueId.length) + uniqueId,
            };
          })
        }
      />
      <TextField
        fullWidth
        sx={{ marginBottom: "20px" }}
        id="title"
        label="Title"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={pesna?.title}
        variant="standard"
        onChange={(e) =>
          setPesna((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <TextField
        fullWidth
        sx={{ marginBottom: "20px" }}
        id="originalTitle"
        label="Original Title"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        value={pesna?.originalTitle || ""}
        variant="standard"
        onChange={(e) =>
          setPesna((prev) => ({
            ...prev,
            originalTitle: e.target.value,
          }))
        }
      />
      <TextField
        sx={{ marginBottom: "20px" }}
        fullWidth
        id="numberOfStrophes"
        label="Number of Strophes"
        type="number"
        value={numberOfStrophes}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ min: 1 }}
        variant="standard"
        onChange={(e) => {
          const number = parseInt(e.target.value);
          if (number > numberOfStrophes) {
            addStrophe();
          } else if (number < numberOfStrophes) {
            removeStrophe();
          }
          setNumberOfStrophes(number);
        }}
      />
      {pesna?.songVersions[0].strophes.map((strophe, index) => (
        <Box key={strophe.row} mb={2}>
          <TextField
            sx={{ marginBottom: "10px" }}
            id={`strophe-${strophe.row}`}
            label={`Strophe ${strophe.row}`}
            type="text"
            multiline
            rows={4}
            fullWidth
            value={strophe?.verses?.map((verse) => verse.text).join("\n") || ""}
            onChange={(e) => {
              setPesna((prev) => {
                const strophes = [...prev.songVersions[0].strophes];
                strophes[index].verses = e.target.value
                  .split("\n")
                  .map((verse, indx) => {
                    return {
                      row: indx + 1,
                      text: verse,
                      chords: [],
                    };
                  });

                return {
                  ...prev,
                  songVersions: [
                    {
                      alternativeTitle: null,
                      sourceNumber: null,
                      strophes,
                    },
                  ],
                };
              });
            }}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={strophe?.type}
              label="Type"
              size="small"
              onChange={(e) => {
                setPesna((prev) => {
                  const strophes = [...prev.songVersions[0].strophes];
                  strophes[index].type = e.target.value;

                  return {
                    ...prev,
                    songVersions: [
                      {
                        alternativeTitle: null,
                        sourceNumber: null,
                        strophes,
                      },
                    ],
                  };
                });
              }}
            >
              <MenuItem value={"DEFAULT"}>DEFAULT</MenuItem>
              <MenuItem value={"REFRAIN"}>REFRAIN</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ))}
    </Grid>
  );
};

export default Editor;
