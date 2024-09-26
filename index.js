require('dotenv').config()
const server = require('./api/server');

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`\n*** Server up at port ${PORT}! ***\n`);
});