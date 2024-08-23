import { BrowserRouter } from "react-router-dom";
import { RenderNavs } from "./containers/RenderNavs";

export function App() {
  return (
    <BrowserRouter>
      <RenderNavs />
    </BrowserRouter>
  );
}
