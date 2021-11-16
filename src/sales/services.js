const {ObjectId} = require('mongodb');
const {Database} = require('../database/index');
const COLLECTION = 'sales';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async(id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({_id: ObjectId(id)});
}

const create = async(sale) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(sale);
    return result.insertedId;
}

const update = async (id, Sale) => {
    const collection = await Database(COLLECTION);
    return result = await collection.updateOne(
        {_id: ObjectId(id)},
        {$set: {...Sale}},
        {upsert:true}
    );
}

const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    return result = await collection.deleteOne({_id: ObjectId(id)});
}

module.exports.SalesService = {
    getAll,
    getById,
    create,
    update,
    deleteById
}