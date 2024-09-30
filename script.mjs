// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from './databases.mjs';

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  try {

    //Look in central to tell us what db contains user
    const returnedCentralValue = await central(id);

    //Look in specific user database, reccomended by central
    const basicUserData = await dbs[returnedCentralValue](id)

    //Look in vault for PRIVATE user data
    const privateUserData = await vault(id)

    let userData = gatherData(id, basicUserData, privateUserData)

    return userData;

  } catch (err) {
    console.error(err);
  }
}

console.log(await getUserData(3));

// Helper Function
function gatherData(id, bud, pud){
    return {
        id: id,
        name: pud.name,
        username: bud.username,
        email: pud.email,
        address: pud.address,
        phone: pud.phone,
        website: bud.website,
        company: bud.company
    }
}

//What do we know?
//Central db: tells us what other db to look in for a user
// db1, db2, db3 container user information
// dbs[valueReturnedFromCentral](id)
// vault contains PRIVATE user info

// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }
