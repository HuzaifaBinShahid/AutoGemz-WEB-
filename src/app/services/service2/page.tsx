import { SERVICES } from "@/constants/constants";
import ServiceDetail from "@/features/services/ServiceDetail";

export default function Service2Page() {
  // API call logic here
  // const { data: service } = useQuery(['service', '2'], () => fetchService('2'));
  const service = SERVICES[1];

  return <ServiceDetail service={service} />;
}

