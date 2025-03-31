import { rolesMap, RoleKey } from '../types/roles';

export function getRoleLabel(roleKey: RoleKey): string {
  return rolesMap[roleKey] || 'Unknown Role';
}

export function isValidRole(key: string): key is RoleKey {
  return key in rolesMap;
}

export function getAllRoles(): Array<{ key: RoleKey; label: string }> {
  return Object.entries(rolesMap).map(([key, label]) => ({
    key: key as RoleKey,
    label,
  }));
}