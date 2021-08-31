import { useSelector } from "react-redux";


export const useAppData = () => {
  return useSelector((state: any) => state.app);
}