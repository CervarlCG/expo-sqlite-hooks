import * as SQLite from 'expo-sqlite';
import { SQLResultSet, SQLError } from 'expo-sqlite';

export {
    SQLResultSet, 
    SQLError
}

export default class Database
{
    DB : SQLite.WebSQLDatabase;
    constructor(name : string, version: string)
    {
        this.DB = SQLite.openDatabase(name + version, version);
    }

    async createTables(queries: string[])
    {
        return Promise.all(queries.map(async (query) => {
            return new Promise((resolve, reject) => {
                this.executeQuery(query, [])
                .then(response => resolve(response))
                .catch(err => reject(err));
            })
        }))
    }

    async executeQuery(query: string, values?: any[]) : Promise<SQLite.SQLResultSet>
    {
        return new Promise((resolve, reject) => {
            this.DB.transaction(tx =>{
                tx.executeSql(
                    query, values || [], 
                    (tx, result) => {
                        resolve(result);
                    },
                    (tx, err) => {
                        reject(err);
                        return true;
                    }
                )
            });
        })
    }
}