import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { WatchlistProvider } from "../context/WatchlistContext";

// 🔥 helper render
const renderHome = () => {
  return render(
    <BrowserRouter>
      <WatchlistProvider>
        <Home />
      </WatchlistProvider>
    </BrowserRouter>
  );
};

describe("Home Page", () => {
  test("renders Movie App title", () => {
    renderHome();

    const title = screen.getByRole("heading", {
      name: /movie app/i,
    });

    expect(title).toBeInTheDocument();
  });

  test("renders search input", () => {
    renderHome();

    const input = screen.getByPlaceholderText(/search movies/i);
    expect(input).toBeInTheDocument();
  });

  test("renders filters", () => {
    renderHome();

    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/genre/i)).toBeInTheDocument();
  });

  test("renders rating dropdown options", () => {
    renderHome();

    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("6+")).toBeInTheDocument();
  });

  test("renders genre dropdown options", () => {
    renderHome();

    expect(screen.getByText(/action/i)).toBeInTheDocument();
    expect(screen.getByText(/comedy/i)).toBeInTheDocument();
  });
});