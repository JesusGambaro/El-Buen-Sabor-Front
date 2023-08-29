# Vistas por hacer:

### 4.

> ### Backend
>
> - [ ] La relación entre usuarios, roles y dirección
> - [ ] Poder crear un usuario con un rol
> - [ ] Implementar la creación del usuario con management API de Auth0
> - [ ] Cuando se trate de un cliente, colocar un rol por defecto
> - [ ] GET para obtener todos los usuarios
> - [ ] GET para obtener un usuario
> - [ ] GET todos los roles
> - [ ] POST para crear un usuario
> - [ ] PUT para actualizar un usuario
>
> ### Frontend
>
> - [ ] Listas de usuarios, tanto clientes como empleados
> - [ ] Formulario para crear y editar empleados
> - [ ] Formulario para editar cliente
> - [ ] Inline edit para editar el estado de un usuario

### 5.

> ### Backend
>
> La sesión del empleado se mantendrá abierta durante todo el horario de atención al público del local.
> Si la sesión del empleado está abierta fuera del horario de atención del local y dicha sesión no ha tenido actividad durante más de 30 minutos, se cerrará la sesión automáticamente.
> Si el empleado está dado de baja, no se le permitirá el acceso al sistema.
>
> ### Frontend
>
> - [ ] Crear menu desplegable en la vista de admin para poder, iniciar sesión, editar el perfil, cerrar sesión y ver el horario de atención del local.

### 6.

> ### Frontend
>
> - [ ] Crear vista de perfil de usuario
> - [ ] Crear vista de edición de perfil de usuario

### 7.

> ### Backend
>
> - [ ] Crear filtros para los usuarios, búsqueda por nombre, apellido, email, rol y estado. Dónde enviare si se trata de un cliente o un empleado.
>
> ### Frontend
>
> - [ ] Crear componente para los filtros de los usuarios

### 14, 15, 16, 17.

> ### Backend
>
> - [ ] GET para todos los pedidos
> - [ ] GET para un pedido
> - [ ] PUT para actualizar el estado de un pedido
> - [ ] PUT para actualizar el tiempo de preparación de un pedido(con el rol de cocinero)
> - [ ] GET para obtener todos los estados de los pedidos(segun el rol del empleado que lo solicite)
> - [ ] Crear filtro para los pedidos, búsqueda por numero de pedido, nombre de cliente, apellido de cliente, email de cliente, estado del pedido y fecha de creación del pedido.
>
> ### Frontend
>
> - [ ] Crear vista de pedidos
> - [ ] Crear componente para los filtros de los pedidos
> - [ ] Inline edit para editar el estado de un pedido
> - [ ] Crear vista de detalle de pedido
> - [ ] Crear las vistas para los distintos empleados(cajero, cocinero, repartidor)
>
> ### Backend-Frontend
>
> - [ ] Crear socket para que el cajero pueda ver los pedidos que se van creando en tiempo real
> - [ ] Crear socket para que el cocinero pueda ver los pedidos que se van creando en tiempo real
> - [ ] Crear socket para que el repartidor pueda ver los pedidos que se van creando en tiempo real

### 18.

> ### Frontend
>
> - [ ] Crear modal para la generación de la factura de un pedido

### 19.

> ### Frontend
>
> - [ ] Crear modal para la generación de una nota de crédito de un pedido

### 20 y 22.

> ### Frontend
>
> - [ ] Cambiar los formularios tipo modal por una vista de formulario
> - [ ] Agregar selector de rubro para los productos y los ingredientes en los formularios de creación y edición

### 21.

> ### Frontend
>
> - [ ] Pensar que hacer con la vista de rubros para productos y rubros para ingredientes

### 23.

> ### Backend
>
> - [ ] GET para los rubros de los productos y los ingredientes(siempre los que esten dados de alta)

### 24.

> - [ ] Pensar que hacer con la generación de orden de compra de ingredientes

### 25.

> ### Backend
>
> - [ ] Crear filtros para los ingredientes, por stock, por rubro, por nombre y por estado. El filtro del stock debe ser: Mas del 50%, entre 50% y 25%, menos del 25% y sin stock.
>
> ### Frontend
>
> - [ ] Crear componente para los filtros de los ingredientes
> - [ ] Crear socket para que el encargado de compras pueda ver los ingredientes que se van quedando sin stock en tiempo real

### 26.

> ### Backend
>
> - [ ] GET para conseguir todos los productos más vendidos, traer nombre, cantidad vendida, ordenados por cantidad vendida de mayor a menor
> - [ ] Crear filtro para periodos de tiempo
>
> ### Frontend
>
> - [ ] Traer los datos de los productos más vendidos y mostrarlos en el gráfico
> - [ ] Crear botón para exportar los datos de los productos más vendidos a un archivo .xlsx

### 27.

> ### Backend
>
> - [ ] GET para conseguir todos clientes que más compraron, traer nombre, cantidad de compras, total gastado, ordenados por total gastado de mayor a menor
> - [ ] Crear filtro para periodos de tiempo
>
> ### Frontend
>
> - [ ] Traer los datos de los clientes que más compraron y mostrarlos en el gráfico
> - [ ] Crear botón para exportar los datos de los clientes que más compraron a un archivo .xlsx
> - [ ] Crear botón para redirigir a al detail de ese cliente

### 28.

> ### Backend
>
> - [ ] GET para conseguir el total de ingresos (suma de los importes de todos los pedidos), costos (suma del costo de todos los pedidos) y ganancias del local (ingresos - costos).
> - [ ] Crear filtro para periodos de tiempo
>
> ### Frontend
>
> - [ ] Traer los datos de los ingresos, costos y ganancias y mostrarlos en el gráfico
> - [ ] Crear botón para exportar los datos de los ingresos, costos y ganancias a un archivo .xlsx
