import fetch from 'node-fetch';

interface room {
  id: string;
  rooms: string[];
  chests: string[];
}

var opened_chests = new Map<string, string>();
var non_empty_chests = new Map<string, string>();
var visited_rooms = new Map<string, string>();

// "Visits" (HTTP GET) a specified location with accepted types being "room"/"chest" and its uuid.
async function visitObject(object_type: string, uuid: string) {
  try {
    const response = await fetch(`https://infinite-castles.herokuapp.com/castles/1/${object_type}s/${uuid}`);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const object_response = await response.json();
    return new Promise(resolve => {
      resolve(object_response);
    });
  } catch (error) {
    if (error instanceof Error) {
      // console.log(`Error visiting ${object_type}: ${uuid}.`);
      return false;
    } else {
      // console.log('An unexpected error occurred');
      return false;
    }
  }
}

// Prints the accumulated results.
function printResults(): void {
  console.log(`Visited Rooms ${visited_rooms.size}.`);
  console.log(`Opened Chests ${opened_chests.size}.`);
  console.log(`Non-empty Chests ${non_empty_chests.size}.`);
}

// Checks a specified room for chests inside and adjacent rooms.
async function checkRoom(room_id: string) {
  if (!visited_rooms.get(room_id)) { // Check if room has been visited before.
    visited_rooms.set(room_id, "visited"); // Mark room as visited.
    var current_room: any = await visitObject("room", room_id);
    if (current_room) { // Check all chests in current room.
      if (Array.isArray(current_room["chests"]) && current_room["chests"].length > 0) { // Check if there are chests. Check if valid array.
        for (let key in current_room["chests"]) {
          var chest_id = current_room["chests"][key].split("/")[4]; // Split by stroke. Retrieve the chest uuid.
          checkChest(chest_id);
        }
      }
      if (Array.isArray(current_room["rooms"]) && current_room["rooms"].length > 0) { // Check if there are further rooms. Check if valid array.
        for (let key in current_room["rooms"]) {  // Visit all the adjacent rooms.
          var adjacent_room_id = current_room["rooms"][key].split("/")[4]; // Split by stroke. Retrieve the room uuid.
          checkRoom(adjacent_room_id);
        }
      }
    }
  }
  return true;
}

// Checks if a specified chest is empty/not.
async function checkChest(chest_id: string) {
  if (!opened_chests.get(chest_id)) { // Check if chest has been opened before.
    opened_chests.set(chest_id, "opened"); // Mark chest as opened.
    var current_chest: any = await visitObject("chest", chest_id);
    if (current_chest) {
      switch (current_chest["status"]) {
        case "This chest is empty :/ Try another one!": {
          break;
        }
        default: {
          non_empty_chests.set(chest_id, "non-empty"); // Mark chest as non-empty.
          // console.log(`Chest ${current_chest["id"]}: ${current_chest["status"]}.`);
          break;
        }
      }
    }
  }
  return true;
}

async function startChestQuest() {
  var startTime: number = new Date().getTime(); // Record starting time.
  var timeDiff:number ; // time difference.
  var endTime; // ending time.
  await checkRoom("entry") // Start Chest Quest!
    .then((returnStatus) => {      
      endTime = new Date().getTime(); // Record ending time.
      timeDiff = endTime - startTime; //in ms.
      timeDiff /= 1000; // strip the ms.
      var seconds = Math.round(timeDiff); // get seconds.
      console.log(`Elapsed time: ${seconds} seconds.`);
    })
    .then((returnStatus) => {
      printResults();
    });
}

startChestQuest();

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