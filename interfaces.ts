export interface ISQLiteUpdate
{
    column: string,
    value: any
}

export interface ISQLiteWhere
{
    field: string, 
    conditional: string, 
    value: any
}