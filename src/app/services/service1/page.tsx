import { SERVICES } from "@/constants/constants";
import ServiceDetail from "@/features/services/ServiceDetail";

export default function Service1Page() {
  // API call logic here
  // const { data: service } = useQuery(['service', '1'], () => fetchService('1'));
  const service = SERVICES[0];

  return <ServiceDetail service={service} />;
}

