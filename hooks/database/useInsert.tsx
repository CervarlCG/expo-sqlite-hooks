import { useContext, useEffect, useState } from "react";
import { DBContext } from '../../context/database';
import { SQLResultSet } from 'expo-sqlite';

export default function useInsert(name: string)
{
    const database = useContext(DBContext);
    
    const insert = async (fields: string[], variables: any[]) : Promise<SQLResultSet> =>
    {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO ${name} (${fields.join(",")}) 
                values (${fields.map(() => '?').join(",")});
            `;
            database.executeQuery(sql, variables)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    return insert;
}