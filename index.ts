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

// "Visits" (HTTP GET) a specified location with accepted types being "room"/"chest" and its uuid.
async function visitObject(object_type: string, uuid: string) {
  try {
    const response = await fetch(`https://infinite-castles.herokuapp.com/castles/1/${object_type}s/${uuid}`);
    const object_response = await response.json();
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    return new Promise(resolve => {
      resolve(object_response);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error visiting ${object_type}: ${uuid}.`);
      return false;
    } else {
      console.log('An unexpected error occurred');
      return false;
    }
  }
}

// Prints the accumulated results.
function printResults() {
  console.log(`Visited Rooms ${visited_rooms.size}.`);
  console.log(`Opened Chests ${opened_chests.size}.`);
  console.log(`Non-empty Chests ${non_empty_chests.size}.`);
}

// Checks a specified room for chests inside and adjacent rooms.
async function checkRoom(room_id: string) {
  //Check if room has been visited before.
  if (!visited_rooms.get(room_id)) {

    // Mark room as visited.
    visited_rooms.set(room_id, "visited");

    var current_room: any = await visitObject("room", room_id);

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

// Checks if a specified chest is empty/not.
async function checkChest(chest_id: string) {
  // Check if chest has been opened before.
  if (!opened_chests.get(chest_id)) {

    // Mark chest as opened.
    opened_chests.set(chest_id, "opened");

    var current_chest: any = await visitObject("chest", chest_id);

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

// Record starting time.
var startTime = new Date().getTime();

// Start Chest Quest!
checkRoom("entry");

// Record ending time.
var endTime = new Date().getTime(); 
var timeDiff = endTime - startTime; //in ms.
timeDiff /= 1000; // strip the ms.
var seconds = Math.round(timeDiff); // get seconds.
console.log(`Elapsed time: ${seconds} seconds.`);

// Algorithm:
//////////////////////////////////////////
// Enter current room.
// Logs the current chests.
// Log opened chests.
// Log visited rooms.
// Check unvisited rooms.
// Enter unvisited rooms into a separate dictionary.
// Visit unvisited rooms until dictionary is empty.
//////////////////////////////////////////