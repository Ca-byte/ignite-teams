import theme from "@/theme";
import { ThemeProvider } from "styled-components";
import {Groups} from "@/screens/Groups";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
}


