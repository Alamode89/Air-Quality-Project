const { builtinModules } = require("module");

function searchPollutant(search, graph, rows) {

    var indexFound = rows.findIndex((obj) => obj.parameter_name.toLowerCase() === search.toLowerCase());
    // if (graph.length == 0) { 
    //     var obj = {};
    //     obj['parameter_name'] = "filler";
    //     obj['num'] = 180000;
    //     graph.push(obj);
    //     graph.push(obj);
        var sameIndex = graph.findIndex((obj) => obj.parameter_name.toLowerCase() == search.toLowerCase());
        if (sameIndex != -1) {
            return graph;
        }
    // }
    //else {
        if (indexFound != -1) {
            var obj = {};
            obj['parameter_name'] = rows[indexFound].parameter_name;
            obj['num'] = rows[indexFound].num;
            graph.push(obj);
        }
    //}

    graph.sort((a,b) => (a.num < b.num) ? 1 : ((b.num < a.num) ? -1 : 0));
    // var i = graph.length;
    if ( graph.length > 16 ) {
        if ( graph[graph.length-2].num > rows[indexFound].num ) {
            graph[graph.length-2] = graph[graph.length-1];
            console.log("changes were made");
            console.log(graph);
        } 
        graph.pop(); 
    }
    return graph
}

module.exports = {
    searchPollutant
}