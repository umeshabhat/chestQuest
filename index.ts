import fetch from 'node-fetch';

var opened_chests = new Map<string, string>();
var non_empty_chests = new Map<string, string>();
var unvisited_rooms = new Map<string, string>();
var visited_rooms = new Map<string, string>();

async function visitObject(object_type: string, uuid: string) {

  console.log(`Visiting ${object_type}: ${uuid}...`);

  const response = await fetch(`https://infinite-castles.herokuapp.com/castles/1/${object_type}/${uuid}`);
  const object_response = await response.json();
  return object_response;
}

function checkChest(chest:any) {
      // Mark chest as opened.
      opened_chests.set(chest["id"], "opened");

      switch (chest["status"]) {
        case "This chest is empty :/ Try another one!": {
          console.log("Status: empty")
          break;
        }
        default: {
          // Mark chest as non-empty.
          non_empty_chests.set(chest["id"], "non-empty");
          console.log(`Status: ${chest["status"]}`);          
          break;
        }
      }
}

function openChest(chest_id: string) {
  if (!opened_chests.get(chest_id)) {
    // Visit chest url.
    visitObject("chests", chest_id).then(object_response => {
      object_response;

      // Check chest contents.
      checkChest(object_response);

    });
  }
}

function printResults() {
  console.log(`Visited Rooms ${visited_rooms.size}.`);
  console.log(`Opened Chests ${opened_chests.size}.`);
  console.log(`Non-empty Chests ${non_empty_chests.size}.`);
}

// Visit the initial room (entry).
visitObject("rooms", "entry").then(object_response => {
  object_response;

  visited_rooms.set(object_response["id"], "visited");

  for (let key in object_response["chests"]) {
    // Split by stroke. Retrieve the chest uuid.
    var chest_id = object_response["chests"][key].split("/")[4];
    // Open chest.
    openChest(chest_id);
  }

});

// TODO: Move into recursive function.
// Algorithm:
// Enter current room.
// Logs the current chests.
// Log opened chests.
// Log visited rooms.
// Check unvisited rooms.
// Enter unvisited rooms into a separate dictionary.
// Visit unvisited rooms until dictionary is empty.