import ngrok from 'ngrok';
import axios from 'axios';

const run = async () => {
    const url = await ngrok.connect({
        proto: 'tcp', // http|tcp|tls, defaults to http
        addr: 3306, // port or network address, defaults to 80
        authtoken: '2QLu4yuQNJgOLsvSiIIAR6d8fk0_6ygpcmnTLFrKuVvbbMVH1', // http basic authentication for tunnel
    });
    const user = process.argv[2];
    const password = process.argv[3];
    const host = url.split('//')[1].split(':')[0];
    const port = url.split('//')[1].split(':')[1];

    const sqlData = {
        host,
        port,
        user,
        password,
        database: 'elbuensabordb'
    };

    console.log('DATA', sqlData);

    const res = await axios.post('https://auth0-sql-config-api.cyclic.app/postConfig', sqlData);
    return res;
};

run();
