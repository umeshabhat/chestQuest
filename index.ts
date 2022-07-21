import fetch from 'node-fetch';

async function getChests() {
  try {
    const response = await fetch('https://infinite-castles.herokuapp.com/castles/1/rooms/entry', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);      
    }
    
    
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
    var current_room = await response.json();

    console.log("Current room:" + current_room["id"]);

    // dictionary= new Map<string, string>();
    // dictionary.set("key", "value");
    // dictionary.get("key");
    // dictionary.delete("key");
    // dictionary.clear(); //Removes all key-value pairs

    for (let key in current_room["chests"]) {      
      // Split by stroke. Retrieve the chest uuid.
      console.log(current_room["chests"][key].split("/")[4]);
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

getChests();
