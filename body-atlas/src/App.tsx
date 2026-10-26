import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * App shell.
 *
 * The previous QueryClientProvider / Toaster / Sonner / TooltipProvider
 * wrappers were removed after a dependency audit confirmed no component in
 * the app uses react-query, the toast hook, sonner, or tooltips. This keeps
 * those libraries off the initial bundle's critical path.
 *
 * NotFound stays eagerly imported because it is the catch-all route and is
 * tiny; lazy-loading it would add a network hop for an edge case.
 */
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
