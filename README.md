# chestQuest

## Problem description

here is the challenge (it may take between 30min and 4h to complete depending on your skills)

You will enter our "API castle"
- The "API castle" is made of multiple rooms (many, many)
- Entry of the "API castle" is located at this endpoint (GET): https://infinite-castles.herokuapp.com/castles/1/rooms/entry
- Each of the room has:
- A link to one or several chests (example of empty chest: (GET) https://infinite-castles.herokuapp.com/castles/1/chests/13dd15b3-2275-4788-8cea-1e8aec534eef )
- A link to one or several other rooms
- Chest can either be filled or empty (most of them are empty as you will see)

The goal is to build a script (in js or ts) which will find all of the chests, count all of the non-empty ones, and keep their address
You script may take a while, but if it takes 30min to your script to go through the whole castle, it probably means you need to perform some optimizations

We expect you to provide us with the answers (number of non-empty chests) and source code (you can share your private github with me at the end)

## Prerequisites

```bash
npm install
```

## Instructions for building/running

```bash
tsc -p tsconfig.json
node index.js
```


## Further Reading
https://www.typescriptlang.org/docs/handbook
https://jvilk.com/MakeTypes/#
