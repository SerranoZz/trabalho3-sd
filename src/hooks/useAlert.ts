import { useQuery } from "@tanstack/react-query";
import Alert from "../interfaces/alert";
import axios from "axios";
import { BASE_URL } from "../util/constants";

const useAlerts = () => useQuery({
  queryKey: ['alerts'],
  queryFn: () => axios
    .get<Alert[]>(BASE_URL+"/alert/list")
    .then(res => res.data),
  staleTime: 10_000  
});

export default useAlerts;