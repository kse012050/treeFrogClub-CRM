import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routers} from "./router/routers.js";

const router = createBrowserRouter(routers);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
