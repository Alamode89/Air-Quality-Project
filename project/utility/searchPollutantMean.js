const { builtinModules } = require("module");

function searchPolluMean(search, graph, rows) {
    // var obj = {};

    var indexFound = rows.findIndex((obj) => obj.pollutant.toLowerCase() === search.toLowerCase());
    var sameIndex = graph.findIndex((obj) => obj.pollutant.toLowerCase() === search.toLowerCase());
    if ( sameIndex != -1 ) {
        return graph;
    }
    // if (graph.length == 0) { 
        
    //     obj['pollutant'] = "filler";
    //     obj['arithmetic_mean'] = 6000000;
    //     graph.push(obj);
    //     console.log("This thing works!");
    // }
    //else {
        var obj = {};
        if (indexFound != -1) {
            obj['pollutant'] = rows[indexFound].pollutant;
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
    searchPolluMean
}