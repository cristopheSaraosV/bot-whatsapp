import { APPLICATION } from '../environment';
import server from './server/server';

function main() {

    try {
        server.listen(APPLICATION.PORT)
        console.log(`Server listening on port http://localhost:${APPLICATION.PORT}`);
    } catch (error) {
        console.log(error);
    }
}

main();
