const MAX_DISTANCE_QUERY = 8000;

let mongodb = null;
let geocode = null;

const getPosto = async (req, res) => {
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);

    if (!latitude) {
        res.status(400).send({ error: 'query latitude required' });
        return;
    }

    if (!longitude) {
        res.status(400).send({ error: 'query longitude required' });
        return;
    }

    const query =
        {
            location: {
                $nearSphere: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: MAX_DISTANCE_QUERY
                }
            }
        };

    let posto = await mongodb.find('Posto', query);
    res.json(posto);
};

const getPostoById = async (req, res) => {
    let id = mongodb.ObjectId(req.params.id);
    if (!id) {
        res.status(400).send({ error: 'id is not valid' });
        return;
    }
    let posto = await mongodb.find('Posto', {_id: id});
    res.json(posto);
};

const putPostGeocode = async (req, res) => {
    let posto = await mongodb.find('Posto', { 'geocode': null, try_geocode: null });
    console.log(posto.length);
    for (let i = 0; i < posto.length; i++) {
        let el = posto[i];

        try {
            let objaddress = {
                address: el.endereco + ' - ' + el.bairro + ' - ' + el.municipio + ' - ' + el.uf,
                country: 'Brazil',
                zipcode: el.cep
            };

            let geo = await geocode.geocode(objaddress);

            let upd = { try_geocode: new Date() };
            if (geo.length > 0) {
                upd.geocode = geo;
                upd.location = {
                    type: 'Point',
                    coordinates: [geo[0].longitude, geo[0].latitude]
                };
            }
            await mongodb.updateOne('Posto', { _id: el._id }, upd);

            console.log((i + 1) + ' - ' + el._id);
        } catch (err) {
            console.log((i + 1) + ' - ' + err);
        }
    };
    res.json({ OK: 1 });
};

const setMongodb = (db) => {
    mongodb = db;
};

const setGeocode = (geo) => {
    geocode = geo;
};

module.exports = {
    getPosto: getPosto,
    getPostoById: getPostoById,
    putPostGeocode: putPostGeocode,
    setMongodb: setMongodb,
    setGeocode: setGeocode
};
