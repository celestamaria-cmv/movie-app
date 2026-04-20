import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "./context/WatchlistContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <WatchlistProvider>
    <App />
  </WatchlistProvider>
</BrowserRouter>
)