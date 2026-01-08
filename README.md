# Sistema de Gestión de Productos - SOA con Angular

Este proyecto implementa un servicio orientado a servicios (SOA) con operaciones CRUD completas para la gestión de **Productos** y **Tipos de Producto**, con una interfaz de usuario desarrollada en Angular.

---

## Estructura del Proyecto

```
taller 8 de enero/
├── ServicioProductosSOA/          # Backend - Servicio SOAP en .NET 10
│   ├── models/                    # Modelos de datos (TipoProducto, Producto)
│   ├── data/                      # DbContext de Entity Framework
│   ├── service/                   # Servicios SOAP e interfaces
│   ├── Migrations/                # Migraciones de base de datos
│   └── Program.cs                 # Configuración de la aplicación
│
└── ProductosAngularApp/           # Frontend - Aplicación Angular
    ├── src/app/
    │   ├── models/                # Modelos TypeScript
    │   ├── services/              # Servicios para consumir SOAP
    │   ├── components/            # Componentes de UI
    │   └── app.routes.ts          # Configuración de rutas
    └── angular.json
```

---

## Tecnologías Utilizadas

### Backend (.NET)
- **.NET 10.0**
- **CoreWCF 1.8.0** - Framework para servicios SOAP
- **Entity Framework Core 10.0.1** - ORM
- **PostgreSQL** - Base de datos
- **Npgsql 10.0.0** - Proveedor de PostgreSQL para EF Core

### Frontend (Angular)
- **Angular 20.3.7**
- **TypeScript**
- **HttpClient** - Para consumir servicios SOAP
- **RouterModule** - Navegación entre componentes

---

## Base de Datos

### Configuración de PostgreSQL

**Requisitos previos:**
- PostgreSQL instalado y corriendo
- Puerto: `5433`
- Base de datos: `postgres`
- Usuario: `postgres`
- Contraseña: `admin`

### Estructura de Tablas

#### Tabla: `tipo_producto`
| Columna | Tipo    | Descripción                |
|---------|---------|----------------------------|
| id      | int     | ID autoincrementable (PK)  |
| tipo    | text    | Nombre del tipo de producto|

#### Tabla: `producto`
| Columna     | Tipo           | Descripción                    |
|-------------|----------------|--------------------------------|
| id          | int            | ID autoincrementable (PK)      |
| id_tipo     | int            | Foreign Key a tipo_producto    |
| descripcion | text           | Descripción del producto       |
| valor       | double         | Valor/precio del producto      |
| costo       | double         | Costo del producto             |

---

## Instalación y Configuración

### 1. Configurar Base de Datos

Asegúrate de que PostgreSQL esté corriendo en el puerto **5433**:

```bash
# Verificar que PostgreSQL esté corriendo
psql -U postgres -p 5433 -h localhost
```

Si necesitas cambiar la configuración de la base de datos, edita el archivo `ServicioProductosSOA/Program.cs` en la línea 11:

```csharp
options.UseNpgsql(
    "Host=localhost;Port=5433;Database=postgres;Username=postgres;Password=admin"
);
```

---

### 2. Ejecutar el Backend (.NET)

#### Paso 1: Navegar al directorio del backend

```bash
cd ServicioProductosSOA
```

#### Paso 2: Restaurar dependencias

```bash
dotnet restore
```

#### Paso 3: Aplicar migraciones (ya aplicadas, pero por si acaso)

```bash
dotnet ef database update
```

#### Paso 4: Ejecutar el servicio

```bash
dotnet run --launch-profile http
```

El servicio estará disponible en:
- **URL del servicio**: `http://localhost:5008`
- **WSDL TipoProducto**: `http://localhost:5008/TipoProductoService.svc?wsdl`
- **WSDL Producto**: `http://localhost:5008/ProductoService.svc?wsdl`

---

### 3. Ejecutar el Frontend (Angular)

#### Paso 1: Navegar al directorio del frontend

Abre una **nueva terminal** (deja la del backend corriendo):

```bash
cd ProductosAngularApp
```

#### Paso 2: Instalar dependencias (si es necesario)

```bash
npm install
```

#### Paso 3: Ejecutar la aplicación Angular

```bash
ng serve
```

La aplicación estará disponible en:
- **URL**: `http://localhost:4200`

---

## Uso de la Aplicación

### Interfaz de Usuario

Al acceder a `http://localhost:4200`, verás:

1. **Menú de navegación** en la parte superior con dos opciones:
   - **Tipos de Producto**
   - **Productos**

2. **Sección de Tipos de Producto** (`/tipos-producto`):
   - Listar todos los tipos de producto
   - Agregar nuevo tipo de producto
   - Editar tipo de producto existente
   - Eliminar tipo de producto

3. **Sección de Productos** (`/productos`):
   - Listar todos los productos con su tipo asociado
   - Agregar nuevo producto (seleccionando tipo de producto)
   - Editar producto existente
   - Eliminar producto
   - Visualizar valor y costo formateados como moneda

---

## Operaciones CRUD Disponibles

### TipoProducto Service

#### Endpoints SOAP:

1. **ListarTiposProducto()** - Obtener todos los tipos de producto
2. **ObtenerTipoProducto(int id)** - Obtener un tipo por ID
3. **InsertarTipoProducto(TipoProducto)** - Crear nuevo tipo
4. **ActualizarTipoProducto(TipoProducto)** - Actualizar tipo existente
5. **EliminarTipoProducto(int id)** - Eliminar tipo por ID

### Producto Service

#### Endpoints SOAP:

1. **ListarProductos()** - Obtener todos los productos
2. **ObtenerProducto(int id)** - Obtener un producto por ID
3. **InsertarProducto(Producto)** - Crear nuevo producto
4. **ActualizarProducto(Producto)** - Actualizar producto existente
5. **EliminarProducto(int id)** - Eliminar producto por ID

---

## Pruebas con Cliente SOAP

Puedes probar los servicios SOAP usando herramientas como:

- **SoapUI**
- **Postman** (con soporte SOAP)
- **curl**

### Ejemplo con curl - Listar Tipos de Producto:

```bash
curl -X POST http://localhost:5008/TipoProductoService.svc \
  -H "Content-Type: text/xml" \
  -H "SOAPAction: http://tempuri.org/ITipoProductoService/ListarTiposProducto" \
  -d '<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <ListarTiposProducto xmlns="http://tempuri.org/" />
        </soap:Body>
      </soap:Envelope>'
```

### Ejemplo con curl - Insertar Tipo de Producto:

```bash
curl -X POST http://localhost:5008/TipoProductoService.svc \
  -H "Content-Type: text/xml" \
  -H "SOAPAction: http://tempuri.org/ITipoProductoService/InsertarTipoProducto" \
  -d '<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <InsertarTipoProducto xmlns="http://tempuri.org/">
            <tipoProducto>
              <Id>0</Id>
              <Tipo>Electrónicos</Tipo>
            </tipoProducto>
          </InsertarTipoProducto>
        </soap:Body>
      </soap:Envelope>'
```

---

## Resolución de Problemas

### El backend no inicia

**Error: No se puede conectar a PostgreSQL**

Verifica que:
1. PostgreSQL esté corriendo: `pg_ctl status`
2. El puerto sea el correcto (5433)
3. Las credenciales sean correctas (postgres/admin)

**Solución:**
```bash
# Iniciar PostgreSQL (si no está corriendo)
pg_ctl start

# Verificar conexión
psql -U postgres -p 5433 -h localhost
```

---

### El frontend no puede consumir los servicios

**Error: CORS**

Verifica que el backend esté corriendo en `http://localhost:5008`

**Error: No hay datos en las tablas**

Asegúrate de:
1. Las migraciones se aplicaron correctamente
2. Puedes insertar datos manualmente usando la UI Angular

---

### Errores de compilación en Angular

**Error: Cannot find module**

```bash
cd ProductosAngularApp
npm install
```

---

## Comandos Útiles

### Backend (.NET)

```bash
# Compilar el proyecto
dotnet build

# Ejecutar el proyecto
dotnet run

# Crear una nueva migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Revertir última migración
dotnet ef database update PreviousMigrationName

# Eliminar base de datos
dotnet ef database drop
```

### Frontend (Angular)

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# Compilar para producción
ng build

# Ejecutar con puerto específico
ng serve --port 4300

# Abrir en navegador automáticamente
ng serve --open
```

---

## Arquitectura SOA

### Principios Implementados

1. **Separación de Responsabilidades**: Backend y Frontend independientes
2. **Comunicación mediante SOAP**: Protocolo estándar para SOA
3. **Reutilización de Servicios**: Los servicios SOAP pueden ser consumidos por cualquier cliente
4. **Interfaz bien definida**: Contratos de servicio mediante interfaces
5. **Independencia de plataforma**: SOAP permite integración con cualquier tecnología

### Flujo de Datos

```
Usuario → Angular UI → HTTP POST (SOAP XML) → .NET Service → PostgreSQL
                                                      ↓
                                                   Response
                                                      ↓
        Angular UI ← Parse XML Response ← SOAP XML ← .NET Service
```

---

## Mejoras Futuras (Opcional)

1. **Autenticación y Autorización**
   - Implementar WS-Security en SOAP
   - Agregar JWT en el frontend

2. **Validaciones**
   - Validaciones del lado del servidor
   - Validaciones de formularios en Angular

3. **Manejo de Errores**
   - Logging con Serilog en .NET
   - Interceptores HTTP en Angular

4. **UI/UX**
   - Implementar Angular Material
   - Agregar paginación en las tablas
   - Agregar búsqueda y filtros

5. **Testing**
   - Unit tests con xUnit (.NET)
   - Component tests con Jasmine/Karma (Angular)

---

## Información de Contacto

**Proyecto desarrollado para**: Taller del 8 de enero
**Tecnologías**: .NET 10, Angular 20, PostgreSQL, SOAP/CoreWCF

---

## Capturas

A continuación se incluyen capturas de pantalla de la aplicación para referencia rápida.

- **Pantalla Productos:**

   ![Pantalla Productos](capturas/pantalla%20productos.png)

- **Pantalla Tipos de Producto:**

   ![Pantalla Tipos de Producto](capturas/Pantalla%20tipo%20producto.png)

---

## Licencia

Este proyecto es de uso académico.
