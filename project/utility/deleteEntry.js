const { builtinModules } = require("module");

function deleteEntry(searchStatus, userHasSearched, rows) {
    // user has already searched, value validation for searchStatus.index
    if(userHasSearched && searchStatus.index != "" && searchStatus.index >= 0 && searchStatus.index <= rows.length) {
        console.log(`Attempting to delete entry`);
        rows.splice(searchStatus.index, 1);
    } else {
        console.log(`User has not searched yet or the index does not exist.`);
        // require user to search again for new entry to update or delete
        return false;
    }
    return true;
}

module.exports = {
    deleteEntry
}