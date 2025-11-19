import MainController from "./control/MainController";
import MainScreen from "./view/MainScreen";
import Database from "./db/Database";

const db = new Database();
const controller = new MainController(db);
new MainScreen(controller);


