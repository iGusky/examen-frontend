export interface Usuario {
  id?:             number;
  nombre:          string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  permisos:        "Ventas" | "Recursos Humanos" | "Gerente";
}