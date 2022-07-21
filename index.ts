import fetch from 'node-fetch';

interface room {
  id: string;
  rooms: string[];
  chests: string[];
}

var opened_chests = new Map<string, string>();
var non_empty_chests = new Map<string, string>();
var unvisited_rooms = new Map<string, string>();
var visited_rooms = new Map<string, string>();

async function visitObject(object_type: string, uuid: string) {
  // console.log(`Visiting ${object_type}:... ${uuid}.`);
  const response = await fetch(`https://infinite-castles.herokuapp.com/castles/1/${object_type}/${uuid}`);
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

async function checkRoom(room_id: string) {
  //Check if room has been visited before.
  if (!visited_rooms.get(room_id)) {

    var current_room: any = await visitObject("rooms", room_id);

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

async function checkChest(chest_id: string) {
  // Check if chest has been opened before.
  if (!opened_chests.get(chest_id)) {
    var current_chest: any = await visitObject("chests", chest_id);

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


// Algorithm:
// Enter current room.
// Logs the current chests.
// Log opened chests.
// Log visited rooms.
// Check unvisited rooms.
// Enter unvisited rooms into a separate dictionary.
// Visit unvisited rooms until dictionary is empty.