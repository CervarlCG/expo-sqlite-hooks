import { acc } from 'react-native-reanimated';
import { ISQLiteSchema, ISQLiteField, ISQLiteData } from '../schema';


export default function validateSchema( fields: ISQLiteField[], field: ISQLiteData[] )
{
    const currentFields = fields.reduce((acc, current) => ({...acc, [current.name]: current}), {})
    fieldExists(currentFields, field[0]);

}

function fieldExists(fields: {}, value: ISQLiteData): boolean
{
   return fields[value.name];
}

function checkFieldDataType(field: ISQLiteField, value: any)
{
    const type = field.type;
    let isValid = false;
    switch(type)
    {
        case "TEXT":
            isValid = typeof value === "string";
            break;
        case "REAL":
            isValid = typeof value === "number" && value % 1 !== 0;
            break;
        case "INTEGER":
            isValid = typeof value === "number" && value % 1 === 0;
        default: 
            break;
    }

    return isValid;
}