import { useContext, useEffect, useState } from "react";
import { DBContext } from '../../context/database';
import { ISQLiteUpdate, ISQLiteWhere } from '../../interfaces';
import { SQLResultSet } from 'expo-sqlite';


export default function useUpdate(name: string)
{
    const database = useContext(DBContext);

    const updateRow = async (newVal : ISQLiteUpdate, where: ISQLiteWhere) : Promise<SQLResultSet> =>
    {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${name} SET ${newVal.column}=? WHERE ${where.field}${where.conditional}?;`
            database.executeQuery(sql, [newVal.value, where.value])
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    return updateRow;
}