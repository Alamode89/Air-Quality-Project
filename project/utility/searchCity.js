const { builtinModules } = require("module");

function searchCity(search, graph, rows) {
    // var obj = {};

    var indexFound = rows.findIndex((obj) => obj.city_name.toLowerCase() === search.toLowerCase());
    var sameIndex = graph.findIndex((obj) => obj.city_name.toLowerCase() === search.toLowerCase());
    if ( sameIndex != -1 ) {
        return graph;
    }
    // if (graph.length == 0) { 
    //     obj['city_name'] = "filler";
    //     obj['arithmetic_mean'] = 500000;
    //     graph.push(obj);
    // }
    //else {
        if (indexFound != -1) {
            var obj = {};
            obj['city_name'] = rows[indexFound].city_name;
            obj['arithmetic_mean'] = rows[indexFound].arithmetic_mean;
            graph.push(obj);
        }
    //}
    graph.sort((a,b) => (a.arithmetic_mean < b.arithmetic_mean) ? 1 : ((b.arithmetic_mean < a.arithmetic_mean) ? -1 : 0))
    
    if ( graph.length > 16 ) {
        if ( graph[graph.length-2].arithmetic_mean > rows[indexFound].arithmetic_mean ) {
            graph[graph.length-2] = graph[graph.length-1];
        }
        graph.pop();
    }
    
    return graph
}

module.exports = {
    searchCity
}