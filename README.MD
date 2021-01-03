# Expo SQLite Hooks
Package that extends the expo-sqlite functionalities to use modern react hooks with functional components

## Example

### Initialize the Database

```jsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Database from 'expo-sqlite-hooks/database';
import { DBProvider } from 'expo-sqlite-hooks/context/database';
import Pets from './src/components/pets';

const table = `
  create table if not exists pets(
    name varchar(50) not null unique,
    type varchar(50) not null
  );
`
export default function App() {
  const [db, setDB] = useState(null);

  useEffect(() => {
    // Initialize the database
    const db = new Database("myPets", "1.0");
    db.createTables([table])
    .then(response => {
      setDB(db);
    })
    .catch(err => {
      //Do something...
    })
  }, [])
  return (
    <View style={styles.container}>
      {
        // Show a custom loading component
        db === null ? 
          <Text>Loading DB</Text>
        :
          <DBProvider db={db}>
            <Pets/>
          </DBProvider>
      }
    </View>
  );
}
```

### Database Hooks
```jsx
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

export default function Pets()
{
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [pets, setPets] = useState([])
    const {loading, error, data, refresh} = useQuery("select * from pets", []);
    const insertPet = useInsert("pets");
    const updatePet = useUpdate("pets");
    const deletePet = useDelete("pets");

    useEffect(() => {
        //Get all pets in the query
        if(data)
        {
            const myPets = [];
            for(let i = 0; i < data.rows.length; i++)
            {
                myPets.push(data.rows.item(i));
            }
            setPets(myPets);
        }
    }, [data]);

    // Add hook
    const handleAdd = () => {
        insertPet(["name", "type"], [name, type])
        .then(response => {
            alert("Pet Added");
            refresh();
        })
        .catch(err => {
            alert("Pet can't be added");
            console.error(err);
        })
    }

    // Update hook
    const handleUpdate = () => {
        updatePet({column: "type", value: type}, {field: "name", conditional: "=", value: name})
        .then(response => {
            alert("Pet updated");
            refresh();
        })
        .catch(err =>{
            alert("Pet can't be updated");
            console.error(err);
        })
    }

    // Delete Hook
    const handleDelete = () => {
        deletePet({field: "name", conditional: "=", value: name})
        .then(response => {
            alert("Pet deleted");
            refresh();
        })
        .catch(err =>{
            alert("Pet can't be deleted");
            console.error(err);
        })
    }


    return (
    <View>
        <TextInput placeholder="Pet Name" onChangeText={(text) => setName(text)}/>
        <TextInput placeholder="Pet Type" onChangeText={(text) => setType(text)}/>
        <Button title="Add" onPress={handleAdd}/>
        <Button title="Update" onPress={handleUpdate}/>
        <Button title="Remove" onPress={handleDelete}/>
        {
        pets.map(pet => {
            return <Text key={pet.name}>Pet Name: {pet.name} Pet type: {pet.type}</Text>
        })
        }
    </View>
    )
}
```

### API

### Database
`import Database from 'expo-sqlite-hooks/database';`

#### Methods

##### constructor
| Parameter | Type |Description|
|-----------|------|-----------|
| name | string | The name of the database|
| version | string | The version of the database|

return: void

##### createTables
| Parameter | Type |Description|
|-----------|------|-----------|
| queries | string[] | The SQLite queries to create the tables|

##### executeQuery
| Parameter | Type |Description|
|-----------|------|-----------|
| query | string | The SQLite query|
| values | any[] | values to use as variables to replace '?' chars in the query|

### Provider
`import { DBProvider } from 'expo-sqlite-hooks/context/database';`

#### Parameters
| Parameter | Type |Description|
|-----------|------|-----------|
| db | Database | The database 

### useQuery
#### Parameters
| Parameter | Type |Description|
|-----------|------|-----------|
| query | string | The SQLite query|
| variables | any[] | values to use as variables to replace '?' chars in the query|

return: 
```
{
    loading: boolean
    error: SQLError class (expo-sqlite)
    data: SQLResultSet (expo-sqlite)
    refresh: () => void //Reload the query
}
```

### useInsert
#### Parameters
| Parameter | Type |Description|
|-----------|------|-----------|
| name | string | table name|

return: `(fields: string[], variables: any[]) => Promise<SQLResultSet>`

| Parameter | Type |Description|
|-----------|------|-----------|
| fields | string[] | Fields name|
| variables| any[] | fields values|


### useUpdate
#### Parameters
| Parameter | Type |Description|
|-----------|------|-----------|
| name | string | table name|

return: `(newVal : ISQLiteUpdate, where: ISQLiteWhere) => Promise<SQLResultSet>`

| Parameter | Type |Description|
|-----------|------|-----------|
| newVal | {column: string, value: any} | New Field|
| where| {field: string, conditional: string, value: any} | Where clausule|

### useDelete
#### Parameters
| Parameter | Type |Description|
|-----------|------|-----------|
| name | string | table name|

return: `( where: ISQLiteWhere) => Promise<SQLResultSet>`

| Parameter | Type |Description|
|-----------|------|-----------|
| where| {field: string, conditional: string, value: any} | Where clausule|