import { NetworkProvider } from "./network";
const Provider = ({ children }: { children: React.ReactNode }) => {
  return <NetworkProvider>{children}</NetworkProvider>;
};
export default Provider;
