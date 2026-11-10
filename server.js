import express from "express";

const app = express();
app.set("json spaces", 2);
app.use(express.json());

let productos = [
    { id: 1, nombre: "Papa", precio: 330, stock: 20000 },
    { id: 2, nombre: "Yuca", precio: 280, stock: 15000 },
    { id: 3, nombre: "Plátano", precio: 150, stock: 30000 },
    { id: 4, nombre: "Tomate", precio: 450, stock: 12000 },
    { id: 5, nombre: "Cebolla", precio: 380, stock: 18000 },
    { id: 6, nombre: "Zanahoria", precio: 320, stock: 10000 },
    { id: 7, nombre: "Arroz", precio: 520, stock: 25000 },
    { id: 8, nombre: "Frijol", precio: 890, stock: 8000 },
];

let siguienteID = 9;

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.get("/productos", (req, res) => {
    const { nombre } = req.query;
    if (nombre) {
        const filtrados = productos.filter((p) =>
            p.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        return res.status(200).json(filtrados);
    }
    res.status(200).json(productos);
});

app.get("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find((p) => p.id === id);
    if (!producto) return res.status(404).json({ error: "No existe" });
    res.json(producto);
});

app.post("/productos", (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || precio === undefined) {
        return res.status(400).json({
            error: "Faltan datos: nombre y precio son obligatorios"
        });
    }
    const nuevo = { id: siguienteID++, nombre, precio, stock: 0 };
    productos.push(nuevo);
    res.status(201).json(nuevo);
});

app.put("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find((p) => p.id === id);
    if (!producto) return res.status(404).json({ error: "No existe" });
    const { nombre, precio, stock } = req.body;
    if (nombre !== undefined) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;
    if (stock !== undefined) producto.stock = stock;
    res.json(producto);
});

app.patch("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find((p) => p.id === id);
    if (!producto) return res.status(404).json({ error: "No existe" });
    const { nombre, precio, stock } = req.body;
    Object.assign(producto, { nombre, precio, stock });
    res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) return res.status(404).json({ error: "No existe" });
    productos.splice(i, 1);
    res.status(204).end();
});

app.listen(3001, () => console.log("Servidor R LOCALHOST"));

