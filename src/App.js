import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import "./App.css";
import Editor from "./components/Editor";
import pesnaPlaceholder from "./assets/pesna.json";
import { useState } from "react";

function App() {
  const [pesna, setPesna] = useState(pesnaPlaceholder);
  return (
    <Box>
      <Typography pl={2} py={2} variant="h5">
        Adding songs in JSON
      </Typography>
      <Grid
        container
        px={3}
        columnSpacing={2}
        maxHeight={"calc(100vh - 72px)"}
        height={"calc(100vh - 72px)"}
        overflow={"auto"}
      >
        <Editor pesna={pesna} setPesna={setPesna} />
        <Grid item xs={6}>
          View in JSON:
          <Box whiteSpace={"break-spaces"} overflow={"auto"}>
            {JSON.stringify(pesna, null, 2)}
          </Box>
          <Box textAlign="right" my={2}>
            <Button
              variant="contained"
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(pesna)
              )}`}
              download={`${pesna?.uniqueId}-${pesna?.title}.json`}
            >
              Download in JSON
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
