import { useContext, useEffect, useState } from "react";
import { DBContext } from '../../context/database';
import { ISQLiteWhere } from '../../interfaces'
import { SQLResultSet } from 'expo-sqlite';

export default function useDelete(name: string)
{
    const database = useContext(DBContext);

    const deleteRow = async (where : ISQLiteWhere) : Promise<SQLResultSet> =>
    {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${name} WHERE ${where.field}${where.conditional}?;`
            database.executeQuery(sql, [where.value])
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }

    return deleteRow;
}