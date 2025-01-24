import { NetworkProvider } from "./network";
import { PortfolioTabProvider } from "./portfolio-tab";
import { ScrollProvider } from "./scroll";
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollProvider>
      <PortfolioTabProvider>
        <NetworkProvider>{children}</NetworkProvider>;
      </PortfolioTabProvider>
    </ScrollProvider>
  );
};
export default Provider;
