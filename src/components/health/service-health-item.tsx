import {
  Service,
  ServiceStatus,
} from "@metal-stack/api/js/metalstack/api/v2/health_pb";
import { Badge } from "@/components/ui/badge";

export interface ServiceHealthItemProps {
  serviceName: Service;
  status: ServiceStatus;
  message?: string;
}

export default function ServiceHealthItem({
  serviceName,
  status,
}: ServiceHealthItemProps) {
  let className = "";
  switch (status) {
    case ServiceStatus.HEALTHY:
      className = "bg-green-100 text-green-800";
      break;
    case ServiceStatus.UNHEALTHY:
      className = "bg-red-100 text-red-800";
      break;
    case ServiceStatus.DEGRADED:
      className = "bg-yellow-100 text-yellow-800";
      break;
    default:
      className = "bg-gray-100 text-gray-800";
  }
  return (
    <div className="mb-2 flex flex-row gap-2">
      <h4 className="font-semibold">
        {Service[serviceName].toLowerCase().charAt(0).toUpperCase() +
          Service[serviceName].toLowerCase().slice(1)}
      </h4>
      <Badge className={className + " ml-auto"}>{ServiceStatus[status]}</Badge>
    </div>
  );
}
