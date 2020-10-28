import React, { useState } from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Home from './containers/Home/Home';
import Layout from './containers/Layout/Layout';
import Switch from '@material-ui/core/Switch';

export const App = (props) => {

  const [darkState, setDarkState] = useState(true);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkState ? 'dark' : 'light',
        },
      }),
    [darkState],
  );

  const switchHandler = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Layout>
        <FormControlLabel
          control={<Switch checked={darkState} onChange={switchHandler} color="primary" />}
          label="Theme"
        />
        <Home />
      </Layout>
    </ThemeProvider>
  );

}

export default App;