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
    try {
        const response = await (0, node_fetch_1.default)(`https://infinite-castles.herokuapp.com/castles/1/${object_type}s/${uuid}`);
        const object_response = await response.json();
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        return new Promise(resolve => {
            resolve(object_response);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error visiting ${object_type}: ${uuid}.`);
            return false;
        }
        else {
            console.log('An unexpected error occurred');
            return false;
        }
    }
}
function printResults() {
    console.log(`Visited Rooms ${visited_rooms.size}.`);
    console.log(`Opened Chests ${opened_chests.size}.`);
    console.log(`Non-empty Chests ${non_empty_chests.size}.`);
}
async function checkRoom(room_id) {
    //Check if room has been visited before.
    if (!visited_rooms.get(room_id)) {
        // Mark room as visited.
        visited_rooms.set(room_id, "visited");
        var current_room = await visitObject("room", room_id);
        if (current_room) {
            // Check all chests in current room.
            // if (!Array.isArray(current_room["chests"]) || !current_room["chests"].length) {
            for (let key in current_room["chests"]) {
                // Split by stroke. Retrieve the chest uuid.
                var chest_id = current_room["chests"][key].split("/")[4];
                checkChest(chest_id);
            }
            // }
            // Check if there are further rooms.
            // if (!Array.isArray(current_room["rooms"]) || !current_room["rooms"].length) {
            // Visit all the adjacent rooms.
            for (let key in current_room["rooms"]) {
                // Split by stroke. Retrieve the room uuid.
                var adjacent_room_id = current_room["rooms"][key].split("/")[4];
                checkRoom(adjacent_room_id);
            }
        }
        // }
    }
}
async function checkChest(chest_id) {
    // Check if chest has been opened before.
    if (!opened_chests.get(chest_id)) {
        // Mark chest as opened.
        opened_chests.set(chest_id, "opened");
        var current_chest = await visitObject("chest", chest_id);
        if (current_chest) {
            switch (current_chest["status"]) {
                case "This chest is empty :/ Try another one!": {
                    break;
                }
                default: {
                    // Mark chest as non-empty.
                    non_empty_chests.set(chest_id, "non-empty");
                    // console.log(`Chest ${current_chest["id"]}: ${current_chest["status"]}.`);
                    break;
                }
            }
        }
    }
}
async function startChestQuest() {
    checkRoom("entry");
}
startChestQuest();
// Algorithm:
// Enter current room.
// Logs the current chests.
// Log opened chests.
// Log visited rooms.
// Check unvisited rooms.
// Enter unvisited rooms into a separate dictionary.
// Visit unvisited rooms until dictionary is empty.
