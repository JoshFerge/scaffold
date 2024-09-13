import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./app/style.css";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<App />);
