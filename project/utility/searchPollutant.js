const { builtinModules } = require("module");

function searchPollutant(search, graph, rows) {
    var obj = {};

    var indexFound = rows.findIndex((obj) => obj.parameter_name.toLowerCase() === search.toLowerCase());
    if (graph.length == 0) { 
        obj['parameter_name'] = "filler";
        obj['num'] = 180000;
        graph.push(obj);
    }
    //else {
        if (indexFound != -1) {
            var obj = {};
            obj['parameter_name'] = rows[indexFound].parameter_name;
            obj['num'] = rows[indexFound].num;
            graph.push(obj);
        }
    //}

    graph.sort((a,b) => (a.num < b.num) ? 1 : ((b.num < a.num) ? -1 : 0))
    return graph
}

module.exports = {
    searchPollutant
}