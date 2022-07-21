"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
var opened_chests = new Map();
var non_empty_chests = new Map();
var unvisited_rooms = new Map();
var visited_rooms = new Map();
async function visitObject(object_type, uuid) {
    // console.log(`Visiting ${object_type}:... ${uuid}.`);
    const response = await (0, node_fetch_1.default)(`https://infinite-castles.herokuapp.com/castles/1/${object_type}/${uuid}`);
    const object_response = await response.json();
    return new Promise(resolve => {
        resolve(object_response);
    });
}
function printResults() {
    console.log(`Visited Rooms ${visited_rooms.size}.`);
    console.log(`Opened Chests ${opened_chests.size}.`);
    console.log(`Non-empty Chests ${non_empty_chests.size}.`);
}
async function checkRoom(room_id) {
    //Check if room has been visited before.
    if (!visited_rooms.get(room_id)) {
        var current_room = await visitObject("rooms", room_id);
        // Mark room as visited.
        visited_rooms.set(room_id, "visited");
        // Check all chests in current room.
        for (let key in current_room["chests"]) {
            // Split by stroke. Retrieve the chest uuid.
            var chest_id = current_room["chests"][key].split("/")[4];
            checkChest(chest_id);
        }
        // Visit all adjacent rooms.
        for (let key in current_room["rooms"]) {
            // Split by stroke. Retrieve the room uuid.
            var adjacent_room_id = current_room["rooms"][key].split("/")[4];
            checkRoom(adjacent_room_id);
        }
    }
}
async function checkChest(chest_id) {
    // Check if chest has been opened before.
    if (!opened_chests.get(chest_id)) {
        var current_chest = await visitObject("chests", chest_id);
        // Mark chest as opened.
        opened_chests.set(chest_id, "opened");
        switch (current_chest["status"]) {
            case "This chest is empty :/ Try another one!": {
                // console.log("Status: empty");
                break;
            }
            default: {
                // Mark chest as non-empty.
                non_empty_chests.set(chest_id, "non-empty");
                console.log(`Chest ${current_chest["id"]}: ${current_chest["status"]}.`);
                break;
            }
        }
    }
}
async function startChestQuest() {
    checkRoom("entry");
}
startChestQuest();
// async function visitObject(object_type: string, uuid: string) {
//   console.log(`Visiting ${object_type}: ${uuid}...`);
//   const response = await fetch(`https://infinite-castles.herokuapp.com/castles/1/${object_type}/${uuid}`);
//   const object_response = await response.json();
//   return object_response;
// }
// function openChest(chest_id: string) {
//   if (!opened_chests.get(chest_id)) {
//     // Visit chest url.
//     visitObject("chests", chest_id).then(object_response => {
//       object_response;
//       // Check chest contents.
//       checkChest(object_response);
//     });
//   }
// }
// // Visit the initial room (entry).
// visitObject("rooms", "entry").then(object_response => {
//   object_response;
//   visited_rooms.set(object_response["id"], "visited");
//   for (let key in object_response["chests"]) {
//     // Split by stroke. Retrieve the chest uuid.
//     var chest_id = object_response["chests"][key].split("/")[4];
//     // Open chest.
//     openChest(chest_id);
//   }
// });
// TODO: Move into recursive function.
// Algorithm:
// Enter current room.
// Logs the current chests.
// Log opened chests.
// Log visited rooms.
// Check unvisited rooms.
// Enter unvisited rooms into a separate dictionary.
// Visit unvisited rooms until dictionary is empty.
