import { useContext, useEffect, useState } from "react";
import { DBContext } from '../../context/database';
import { SQLResultSet, SQLError } from 'expo-sqlite';

export default function useQuery(query : string, variables: any[])
{
    const database = useContext(DBContext);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<SQLError | undefined>(undefined);
    const [data, setData] = useState<SQLResultSet | undefined>(undefined);

    const executeQuery = () =>
    {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        database.executeQuery(query, variables)
        .then((response) => {
            setData(response);
            setError(undefined)
            setLoading(false);
        }).catch((err) => {
            setError(err);
            setData(undefined);
            setLoading(false);
        })
    }
    
    useEffect(() => {
        executeQuery();
    }, []);

    return { loading, error, data, refresh: executeQuery };
}