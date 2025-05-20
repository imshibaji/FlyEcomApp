import knex from 'knex';
import config from '../../knexfile';

const db = knex(config.development);

export class BaseModel {
    constructor(table) {
        this.table = table;
    }
    getTable() {
        return this.table;
    }
    async all() {
        return await db(this.table).select('*');
    }
    async find(id) {
        return await db(this.table).select('*').where('id', id).first();
    }
    async create(data) {
        return await db(this.table).insert(data);
    }
    async update(id, data) {
        // remove id
        if(data.id) delete data.id;
        return await db(this.table).update(data).where('id', id);
    }
    async delete(id) {
        return await db(this.table).where('id', id).del();
    }
}