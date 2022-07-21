"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function getChests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, node_fetch_1.default)('https://infinite-castles.herokuapp.com/castles/1/rooms/entry', {
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
            var current_room = yield response.json();
            console.log("Current room:" + current_room["id"]);
            for (let key in current_room["chests"]) {
                // console.log("Chest:" + current_room["chests"][key]);
                // Split by stroke.
                console.log(current_room["chests"][key].split("/")[4]);
            }
            return true;
        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            }
            else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    });
}
getChests();
