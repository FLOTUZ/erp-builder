const strings: { [key: string]: { [key: string]: string } } = {
    "es-MX": {
        pageTitle: "Sistema",
        email: "Correo electrónico",
        password: "Contraseña",
        names: "Nombre(s)",
        firstname_lastname: "Apellidos",
        firstname: "Apellido paterno",
        lastname: "Apellido materno",
        about_user: "Acerca del usuario",
        status: "Estatus",
        role: "Rol",
        user: "Usuario",
        users: "Usuarios",
        edit_user: "Editar usuario",
        is_active: "Esta activo",
        save: "Guardar",

        // General
        created_at: "Creado el",

        // Roles
        role_name: "Nombre del rol",
        role_description: "Descripción del rol",
        role_is_deleted: "Esta eliminado",
        edit_role: "Editar rol",

    },
};

const systemLanguage: string = "es-MX";

// this function is used to get the string in the current language
export function getString(key: string): string {
    return strings[systemLanguage][key] || strings["es-MX"][key] || key;
}
