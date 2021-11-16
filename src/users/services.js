const {ObjectId} = require('mongodb');
const {Database} = require('../database/index');
const COLLECTION = 'users';


const getAll = async () => { /// trae todos los productos
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray(); // devulve todos los datos como un array
}

const getById = async(id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id: ObjectId(id)});
}

const create = async(product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async (id, User) => {
    const collection = await Database(COLLECTION);
    return result = await collection.updateOne(
        {_id: ObjectId(id)},
        {$set: {...User}},
        {upsert:true}
    );
}

const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    return result = await collection.deleteOne({_id: ObjectId(id)});
}

module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    deleteById
}