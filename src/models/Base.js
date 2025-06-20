import knex from 'knex';
import config from '../../knexfile';

const db = knex(config.development);

export class BaseModel {
    constructor(table, schema = null) {
        this.table = table;
        this.schema = schema; // zod schema
    }
    getTable() {
        return this.table;
    }

    async validate(data) {
        if (!this.schema) return data;
        return this.schema.parseAsync(data);
    }

    // HOOKS
    async beforeCreate(data) {}
    async afterCreate(data, result) {}

    async all() {
        return await db(this.table).select('*');
    }
    async find(id) {
        return await db(this.table).select('*').where('id', id).first();
    }
    async create(data) {
        const validData = await this.validate(data);
        await this.beforeCreate(validData);
        const [id] = await db(this.table).insert(validData);
        const result = await this.find(id);
        await this.afterCreate(validData, result);
        return result;
    }
    async update(id, data) {
        const validData = await this.validate(data);
        await this.beforeCreate(validData);
        const result = await db(this.table).where({ id }).update(validData);
        console.log(result);
        await this.afterCreate(validData, result);
        return result;
    }
    async delete(id) {
        return await db(this.table).where('id', id).del();
    }

    where(filter) {
        return db(this.table).where(filter);
    }

    // RELATIONSHIP HELPERS
    async hasOne(relatedModel, foreignKey, localKey = 'id') {
        return db(relatedModel.table)
            .where(foreignKey, this[localKey])
            .first();
    }

    async hasMany(relatedModel, foreignKey, localKey = 'id') {
        return db(relatedModel.table)
        .where(foreignKey, this[localKey]);
    }

    async belongsTo(relatedModel, foreignKey, targetKey = 'id') {
        return db(relatedModel.table)
        .where(targetKey, this[foreignKey])
        .first();
    }
}

export default function getBaseModel(table) {
    return new BaseModel(table);
}