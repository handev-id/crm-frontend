import usePutApi from "../methods/put";
import { TenantModel } from "../models/tenant";

export default function TenantEndpoint() {
  const update = usePutApi<TenantModel, TenantModel>({
    endpoint: (tenant) => `/tenant/${tenant.id}`,
    key: ["UPDATE_TENANT"],
    isFormData: true,
  });

  return { update };
}
