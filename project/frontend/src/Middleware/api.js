import axios from "axios";

function searchName(param) {
    const args = {
        name: param.name,
        choice: param.choice,
    };

    console.log("Data coming Here: ", args);

    return axios({
        method: "POST",
        url: "http://localhost:1337/api/airQu/search/",
        data: args,
    });
}

export { searchName };