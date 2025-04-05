import { RoleKey } from "./roles"

export type FilteringParams = {
    role?: RoleKey | "all"
    name?: string
}