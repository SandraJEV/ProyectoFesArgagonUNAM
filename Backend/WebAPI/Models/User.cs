// Namespace donde vive la clase. Convención: Models contiene las entidades o estructuras de datos.
namespace WebAPI.Models
{
    // Clase pública que representa un usuario del sistema.
    public class User
    {
        // Identificador único del usuario. Usualmente es clave primaria en la base de datos.
        public int UserID { get; set; }

        // Nombre(s) del usuario. Se inicializa como cadena vacía para evitar nulls.
        public string FirstName { get; set; } = string.Empty;

        // Apellido(s) del usuario. También se inicializa como cadena vacía.
        public string LastName { get; set; } = string.Empty;

        // Correo electrónico del usuario. Se espera que sea único.
        public string Email { get; set; } = string.Empty;

        // Contraseña ya encriptada (hash). No se guarda la contraseña original.
        public string PasswordHash { get; set; } = string.Empty;

        // ID del rol asignado al usuario (por ejemplo: administrador, técnico, etc.).
        public int RoleID { get; set; }

        // ID del área a la que pertenece el usuario (por ejemplo: Soporte, Sistemas).
        public int AreaID { get; set; }

        // ID del supervisor o jefe directo. Puede ser null si no reporta a nadie.
        public int? ReportsTo { get; set; }

        // Fecha y hora en que fue creado el usuario.
        public DateTime CreatedAt { get; set; }

        // Indica si el usuario está habilitado (activo) o no en el sistema.
        public bool IsEnabled { get; set; }
    }
}
