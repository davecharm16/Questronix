const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');



app.use(cors());
app.use(express.json());



//routes
const productRoute = require('./routes/ProductRoute');

app.use('/product', productRoute);

db.sequelize.sync().then(()=>{
    app.listen(5000, ()=>{
        console.log('Server is running on PORT 5000')
    })
})
.catch((e)=>{
    console.log('ErrorCreating Tables or DB' + e)
});

