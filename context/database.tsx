import React from 'react';
import SQLiteDatabase from '../database';

export const DBContext = React.createContext<SQLiteDatabase>(null);

export function DBProvider({ db, children } : { db: SQLiteDatabase | null, children : React.ReactNode })
{
    return (
        <DBContext.Provider value={db}>
            {children}
        </DBContext.Provider>
    )
}