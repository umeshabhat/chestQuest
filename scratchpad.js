"use strict";
// Error visiting rooms: cc842ae9-21bb-454a-93b1-cd919e357149.
// Error visiting chests: b2e86a38-c637-460e-a3fe-3245f7ff864c.
// Error visiting chests: ef45cdc8-ddd0-40f6-9d4c-a8b83230f402.
// Error visiting room: 4ed7c277-28ac-4be4-85ce-ead6461627c8.
// Error visiting chest: 317c01d8-3103-472d-a1da-d7b96da37554.
// Error visiting chest: 7fa4cf6e-70cd-4ea0-9545-4630f3c43aa2.
// Error visiting chest: b368ab53-1b25-4b31-93aa-2b013835ef60.
// async function visitObject() {
//   try {
//     const current_response = await fetch('https://infinite-castles.herokuapp.com/castles/1/rooms/entry', {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//       },
//     }).then(response => response.json())
//       .catch(error => console.log(error.message));
//     // if (!response.ok) {
//     //   throw new Error(`Error! status: ${response.status}`);
//     // }
//     // const result = await response.json().then(res => console.log(res));
//     // const result = response.json();
//     return current_response;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log('error message: ', error.message);
//       return error.message;
//     } else {
//       console.log('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// }
// async function visitObject(object_type: string, uuid: string) {
//   console.log(`Visiting ${object_type}: ${uuid}...`);
//   try {
//     const response = await fetch('https://infinite-castles.herokuapp.com/castles/1/rooms/entry', {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Error! status: ${response.status}`);
//     }
//     // JSON response.
//     // TODO: put back await()
//     let json_response = response.json();
//     return json_response;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log('error message: ', error.message);
//       return error.message;
//     } else {
//       console.log('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// }
//https://infinite-castles.herokuapp.com/castles/1/rooms/entry
//https://infinite-castles.herokuapp.com/castles/1/chests/
// TODO: Move into recursive function.
// Algorithm:
// Enter current room.
// Logs the current chests.
// Log opened chests.
// Log visited rooms.
// Check unvisited rooms.
// Enter unvisited rooms into a separate dictionary.
// Visit unvisited rooms until dictionary is empty.
// Current room.
// var current_room:any = visitObject("room", "something");
// var current_room: any = visitObject();
// console.log(current_room);
// console.log("Current room:" + current_room["id"]);
// dictionary= new Map<string, string>();
// dictionary.set("key", "value");
// dictionary.get("key");
// dictionary.delete("key");
// dictionary.clear(); //Removes all key-value pairs
// var unopened_chests = new Map<string, string>();
// var non_empty_chests = new Map<string, string>();
// var unvisited_rooms = new Map<string, string>();
// var visited_rooms = new Map<string, string>();
// for (let key in current_room["chests"]) {
//   // Split by stroke. Retrieve the chest uuid.
//   var chest_id = current_room["chests"][key].split("/")[4];
//   unopened_chests.set(chest_id, "unopened");
// }
// unopened_chests.forEach((value: string, key: string) => {
//   visitObject("chest", key);
// });
// console.log("Found rooms:" + object_response["rooms"]);
// console.log("Found chests:" + object_response["chests"]);
