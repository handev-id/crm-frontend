export type RoleKey = "owner" | "admin" | "agent" | "customer";
export type RoleLabel = string;

export const rolesMap: Record<RoleKey, RoleLabel> = {
  owner: "Owner",
  admin: "Admin",
  agent: "Agent / Sales",
  customer: "Customer",
} as const;

export type RolesMap = typeof rolesMap;
