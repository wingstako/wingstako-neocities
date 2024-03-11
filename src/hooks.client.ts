import { DirectoryService } from "$lib/directory.service";

async function init() {
    await DirectoryService.init();
}

init();