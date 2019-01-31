import Server from './server'
import MockDatabase from './MockDatabase';

const port = parseInt(process.env.PORT) || 3000; // parseInt to allow TS to see that it's alwas a number type.
const db = new MockDatabase();
const server = new Server(db);

server.listen(port);