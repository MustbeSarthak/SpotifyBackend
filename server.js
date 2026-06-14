require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./src/db/db')
const dns = require('dns');

// DNS settings to resolve domain name to IP address and not run out of sync with other regions 
dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
]);

connectDb();

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})

