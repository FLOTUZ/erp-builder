export interface IRoute {
  [key: string]: { [key: string]: string };
}

export const AppRoutes: IRoute = {
  USERS: {
    users: "/modules/users",
    userShow: "/modules/users/[id]",
    userEdit: "/modules/users/[id]/edit",
  },
  ROLES: {
    roles: "/modules/roles",
    roleShow: "/modules/roles/[id]",
    roleEdit: "/modules/roles/[id]/edit",
  }
};

