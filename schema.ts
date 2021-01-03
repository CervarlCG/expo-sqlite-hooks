export interface ISQLiteSchema
{
    name: string,
    fields: ISQLiteField[],
    primaryKey: string | null
}

export interface ISQLiteField
{
    name: string,
    type: "TEXT" | "INTEGER" | "REAL",
    required: boolean,
    default?: any,
    foreignKey: {
        table: string,

    }
}

interface ForeignKey{
    table: string,
    field: string,
}

export interface ISQLiteData
{
    name: string,
    value: any
}

export default class SQLiteSchema
{
    private schema : ISQLiteSchema;
    
    constructor(name : string)
    {
        this.schema = {name, fields: [], primaryKey: null};
    }
    
    add(field: ISQLiteField | ISQLiteField[])
    {
        if(!Array.isArray(field))
            this.schema.fields.push(field);
        else
            field.map(f => this.schema.fields.push(f));
    }

    setPrimaryKey(fieldName : string)
    {
        if(this.fieldExist(fieldName))
            this.schema.primaryKey = fieldName;
    }

    private fieldExist(fieldName: string) : Boolean
    {
        let fieldFinded = false;
        let i = 0;
        while(!fieldFinded || i < this.schema.fields.length - 1)
        {
            if(this.schema.fields[i].name === fieldName)
                fieldFinded = true;
            i++;
        }
        return fieldFinded;
    }

    getSchema()
    {
        return this.schema;
    }
}