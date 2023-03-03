



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

   // Importar rutas
const userRoutes = require('./src/routes/userRoutes');
const hospitalRoutes = require('./src/routes/hospitalRoutes');
const medicRoutes= require('./src/routes/medicRoutes');
const observationRoutes = require('./src/routes/observationRoutes');
//const patientRoutes= requiere('./src/routes/patientRoutes');
 
dotenv.config(); 

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


 // Importar rutas
app.use('/api', userRoutes);
app.use('/api',hospitalRoutes);
app.use('/api',medicRoutes);
app.use ('/api',observationRoutes );
//app.use('/api',patientRoutes);
const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión con MongoDB:'));
db.once('open', function() {
  console.log('Conexión exitosa con MongoDB!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});


