export type RoleKey = "owner" | "admin" | "agent";
export type RoleLabel = string;

export const rolesMap: Record<RoleKey, RoleLabel> = {
  owner: "Owner",
  admin: "Admin",
  agent: "Agent / Sales",
} as const;

export type RolesMap = typeof rolesMap;
