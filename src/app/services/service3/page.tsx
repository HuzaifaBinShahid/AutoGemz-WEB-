import { SERVICES } from "@/constants/constants";
import ServiceDetail from "@/features/services/ServiceDetail";

export default function Service3Page() {
  // API call logic here
  // const { data: service } = useQuery(['service', '3'], () => fetchService('3'));
  const service = SERVICES[2];

  return <ServiceDetail service={service} />;
}

