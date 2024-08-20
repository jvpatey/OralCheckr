import { BrowserRouter } from "react-router-dom";
import { RenderNavs } from "./containers/shared/RenderNavs";

export function App() {
  return (
    <BrowserRouter>
      <RenderNavs />
    </BrowserRouter>
  );
}
