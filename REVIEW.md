# 📝 Code Review: Todolist Application Using React and Fetch - DΛMIΛП ᄂӨPΣZ

## ✅ Aspectos Positivos

1. **Base Fetch bien implementada**: la entrega original ya tenía `GET`, `POST` y `DELETE` funcionando.
2. **useEffect correcto**: carga inicial con `useEffect(..., [])`, sin re-fetch innecesario.
3. **CRUD esencial presente**: agregar, listar y eliminar tareas estaba operativo.
4. **Diseño visual agradable**: interfaz clara y con buen contraste.

---

## 🔍 Áreas de Mejora (aplicadas en este PR)

### 1) Verificación robusta de respuestas HTTP

**Código original:**
```javascript
await fetch(API_URL, {
  method: "POST",
  body: JSON.stringify(newTask),
  headers: { "Content-Type": "application/json" },
});
await getTasks();
```

**Código mejorado:**
```javascript
const response = await fetch(API_URL, {
  method: "POST",
  body: JSON.stringify(newTask),
  headers: { "Content-Type": "application/json" },
});

if (!response.ok) {
  throw new Error(`Error al crear tarea (${response.status}).`);
}

await loadTasks(false);
```

**¿Por qué esta mejora?**
- Evita falsos positivos cuando la API falla.
- Cumple mejor el criterio de manejo asíncrono y `response.ok`.

### 2) Manejo explícito de usuario inexistente (404)

**Código original:**
```javascript
await fetch(USER_URL, { method: "POST" });
```

**Código mejorado:**
```javascript
const userResponse = await fetch(USER_URL);
if (userResponse.status === 404) {
  const createResponse = await fetch(USER_URL, { method: "POST" });
  if (!createResponse.ok) throw new Error("No se pudo crear el usuario en la API.");
}
```

**¿Por qué esta mejora?**
- Sigue la rúbrica del día 19 para el caso de usuario no existente.
- Reduce fallos silenciosos al iniciar.

### 3) Validación con feedback visual

**Código original:**
```javascript
if (!label.trim()) return;
```

**Código mejorado:**
```javascript
if (!trimmedTask) {
  setInputError("La tarea no puede estar vacia.");
  return;
}
```

**¿Por qué esta mejora?**
- Mantiene validación con `.trim()`.
- Mejora UX mostrando al usuario el motivo del rechazo.

### 4) Estados asíncronos de loading y error

**Código mejorado aplicado:**
```javascript
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
```

Y en UI:
```jsx
{errorMessage && <p className="request-error">{errorMessage}</p>}
{isLoading && <p className="loading-text">Cargando tareas...</p>}
```

**¿Por qué esta mejora?**
- Da feedback durante peticiones y ante fallos.
- Eleva robustez y experiencia de uso.

### 5) UX adicional: contador + confirmación en borrar todo

**Código mejorado aplicado:**
```javascript
const pendingTasks = tasks.filter((task) => !task.is_done).length;
const confirmed = window.confirm("Se borraran todas las tareas. Continuar?");
```

**¿Por qué esta mejora?**
- Previene borrados accidentales.
- Aporta contexto rápido del estado de la lista.

---

## 🎯 Patrones y Anti-patrones Identificados

### Patrones Positivos Encontrados ✅

1. **Uso de async/await en operaciones de API**.
2. **Separación clara de funciones (`get/add/delete/clear`)**.
3. **Carga inicial con useEffect y dependencias correctas**.

### Anti-patrones a Mejorar ❌ (entrega original)

1. **Operaciones sin validar `response.ok` en POST/DELETE**.
2. **Falta de estados de error/loading en interfaz**.
3. **Manejo de usuario con control implícito en vez de flujo explícito por status**.
4. **Validación sin feedback visual al usuario**.

---

## 📊 Evaluación Detallada

### Criterios de Evaluación (Total: 81/100) sobre la entrega original

| Criterio | Puntos | Obtenido | Comentario |
|----------|--------|----------|------------|
| **Funcionalidad Básica** | 30 | 27 | GET/POST/DELETE funcionando, con margen en robustez de API |
| **Código Limpio** | 20 | 16 | Legible, pero faltaba consolidar manejo de errores y estados |
| **Estructura** | 15 | 12 | Funciones separadas, pero lógica API/UX mejorable |
| **Buenas Prácticas** | 15 | 10 | Async/await correcto, faltaba `response.ok` consistente |
| **HTML/CSS** | 10 | 9 | Interfaz atractiva y funcional |
| **UX/Animaciones** | 10 | 7 | Sin loading/error visual ni confirmación en borrar todo |
| **TOTAL** | **100** | **81** | **⚠️ Necesita mejora** |

> Nota mínima de aprobación global: **85/100**

### Desglose de Puntos Perdidos (-19 puntos)

1. **-5 puntos** - Falta de verificación `response.ok` en varias operaciones de API.
2. **-4 puntos** - Manejo de usuario no existente poco explícito para 404.
3. **-4 puntos** - Sin feedback visual de errores para el usuario.
4. **-3 puntos** - Sin estado visual de loading durante operaciones asíncronas.
5. **-3 puntos** - UX mejorable (sin confirmación de borrado total ni contador de pendientes).

---

## 🚀 Cómo Llegar a 100/100

Aplicando las correcciones de este PR:

- ✅ **+5 puntos** - Verificación de `response.ok` en POST/DELETE/GET y mensajes de error claros.
- ✅ **+4 puntos** - Manejo explícito de 404 para creación de usuario.
- ✅ **+4 puntos** - Estado de error en UI.
- ✅ **+3 puntos** - Estado de loading en UI.
- ✅ **+3 puntos** - Confirmación de "borrar todo" + contador de tareas pendientes.

**= 100/100** 🎉

---

## 📌 Resumen Final

La entrega original tenía una base sólida y funcional, pero estaba por debajo de aprobación por robustez de integración con API y experiencia de usuario en estados asíncronos. Este PR la deja alineada con la rúbrica del día 19 y con patrón de referencia para proyectos Fetch en React.
