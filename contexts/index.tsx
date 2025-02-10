import { TooltipProvider } from "@/components/ui/tooltip";
import { NetworkProvider } from "./network";
import { PortfolioTabProvider } from "./portfolio-tab";
import { ScrollProvider } from "./scroll";
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <ScrollProvider>
        <PortfolioTabProvider>
          <NetworkProvider>{children}</NetworkProvider>
        </PortfolioTabProvider>
      </ScrollProvider>
    </TooltipProvider>
  );
};
export default Provider;
