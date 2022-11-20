import { render } from "./src/utility.js";
import { showCatalog } from "./templates/catalog.js";
import { showCreate } from "./templates/create.js";
import { showUpdate } from "./templates/update.js";


const root = document.body;
const ctx = {
    update
};

update();



function update(){
    render(
        [
            showCatalog(ctx),
            showCreate(ctx),
            showUpdate(ctx)
        ],
        root
    )
}