const { builtinModules } = require("module");

function deleteEntry(searchStatus, userHasSearched, rows) {
    // user has already searched, the searchStatus.index will not be null/undefined value
    if(userHasSearched) {
        console.log(`Attempting to delete entry ${rows[searchStatus.index].city_name}, ${rows[searchStatus.index].parameter_name}, ${rows[searchStatus.index].year}`);
        rows.splice(searchStatus.index, 1);
        //console.log(`Check if deleted, following entry should be different from above: ${rows[searchStatus.index].city_name}, ${rows[searchStatus.index].parameter_name}, ${rows[searchStatus.index].year}`);
    } else {
        console.log(`User has not searched yet, please search before attempting to delete`);
    }
    // require user to search again for new entry to update or delete
    return false;
}

module.exports = {
    deleteEntry
}