import { TooltipProvider } from "@/design-systems/atoms/tooltip";
import { NetworkProvider } from "./network";
import { PortfolioTabProvider } from "./portfolio-tab";
import { ScrollProvider } from "./scroll";
import { InviteCodePopupProvider } from "./InviteCodePopup";
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <ScrollProvider>
        <PortfolioTabProvider>
          <InviteCodePopupProvider>
            <NetworkProvider>{children}</NetworkProvider>
          </InviteCodePopupProvider>
        </PortfolioTabProvider>
      </ScrollProvider>
    </TooltipProvider>
  );
};
export default Provider;
