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

    // Optional Zod validation
    async validate(data) {
        if (!this.schema) return data;
        return this.schema.parseAsync(data);
    }

    // HOOKS (override in child models)
    async beforeCreate(data) { return data; }
    async afterCreate(data, result) {}

    async beforeUpdate(data) { return data; }
    async afterUpdate(data, result) {}

    async beforeDelete(id) {}
    async afterDelete(id) {}

    async all() {
        return await db(this.table).select('*');
    }
    async find(id) {
        return await db(this.table).select('*').where('id', id).first();
    }

    async findById(id) {
        return db(this.table).where({ id }).first();
    }

    // CREATE
    async create(data) {
        const validData = await this.validate(data);
        await this.beforeCreate(validData);
        const [id] = await db(this.table).insert(validData).returning('id');
        const result = await this.findById(id.id || id); // PostgreSQL returns object
        await this.afterCreate(validData, result);
        return result;
    }
    // UPDATE
    async update(id, data) {
        const validData = await this.validate(data);
        await this.beforeUpdate(validData);
        await db(this.table).where({ id }).update(validData);
        const result = await this.findById(id);
        await this.afterUpdate(validData, result);
        return result;
    }

    // DELETE
    async delete(id) {
        await this.beforeDelete(id);
        const deleted = await db(this.table).where({ id }).del();
        await this.afterDelete(id);
        return deleted;
    }

    where(filter) {
        return db(this.table).where(filter);
    }

    async hasOne(relatedModel, foreignKey, localKey = 'id') {
        return await db(relatedModel.table)
        .join(this.table, `${relatedModel.table}.${foreignKey}`, `${this.table}.${localKey}`)
        .where(`${relatedModel.table}.${foreignKey}`, this[localKey])
        .first();
    }

    async hasMany(relatedModel, foreignKey, localKey = 'id') {
        return await db(relatedModel.table)
        .join(this.table, `${relatedModel.table}.${foreignKey}`, `${this.table}.${localKey}`)
        .where(`${relatedModel.table}.${foreignKey}`, this[localKey])
        .select('*');
    }

    async belongsTo(relatedModel, foreignKey, targetKey = 'id') {
        return await db(this.table)
        .join(relatedModel.table, `${this.table}.${foreignKey}`, `${relatedModel.table}.${targetKey}`)
        .where(`${relatedModel.table}.${targetKey}`, this[targetKey])
        .first();
    }
}

export default function getBaseModel(table) {
    return new BaseModel(table);
}