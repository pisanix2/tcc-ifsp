const { MongoClient, ObjectId } = require('mongodb');

var db = null;

const connect = (config) => {
    return new Promise(async (resolve, reject) => {
        let cnstring = 'mongodb://' + config.host + ':' + config.port;
        let client = await MongoClient.connect(cnstring);
        db = client.db(config.database);

        // TODO: Verificar como criar o indice uma unica vez, aqui irá criar cada vez que conectar no banco.
        const collec = db.collection('Posto');
        collec.createIndex({ location: '2dsphere' });

        resolve();
    });
};

const _ObjectId = (_id) => {
    if (!ObjectId.isValid(_id)) {
        return false;
    }
    return ObjectId(_id);
};

const find = (collection, query) => {
    const collec = db.collection(collection);
    return collec.find(query).toArray();
};

const updateOne = (collection, filter, update) => {
    const collec = db.collection(collection);
    return collec.updateOne(filter, { $set: update });
};

module.exports = {
    connect: connect,
    find: find,
    updateOne: updateOne,
    ObjectId: _ObjectId
};
