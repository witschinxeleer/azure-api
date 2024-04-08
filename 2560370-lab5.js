

const express = require('express');

const app = express();
app.use(express.json());


let cars = {
    1:{
    "id":1,
    "make":"Toyota",
    "model":"Camry",
    "year":2020,
    "color":"Red",
    "engineType":"V6"
    },
    
     2:{
    "id":2,
    "make":"Toyota",
    "model":"Camry",
    "year":2020,
    "color":"Red",
    "engineType":"V6"
    },
    3:{
        "id":3,
        "make":"Toyota",
        "model":"Camry",
        "year":2020,
        "color":"Red",
        "engineType":"V6"
        },
};


const PORT = 3000;

app.listen(PORT,()=>{
    console.log("Server Listening on PORT:", PORT);
});

// end points to be created



app.get("/cars",(request,response)=>{
    
    if(Object.keys(cars).length==0){
        return response.status(404).send({Response:"Empty DB"});
    }else{
        let temp =[];
        for (const [key, value] of Object.entries(cars)) {
            temp.push(value);
        }
        return response.send(temp);
    }
});


app.get("/cars/:carId",(request,response)=>{
    
    const carDetailId=request.params.carId;

    if(Object.keys(cars).length >= carDetailId){
        const result = cars[carDetailId];
        response.send(result[carDetailId]);
    }else{
        response.status(404).send("ID NOT FOUND");
    }
});

app.post("/cars",(request,response)=>{
    const body = request.body;

    const newSize = Object.keys(cars).length+1;
    let tempObj = new Object;

    tempObj["id"]=newSize;
    tempObj["make"]=body["make"];
    tempObj["model"]=body["model"];
    cars[newSize]=tempObj;
    let temp =[];
        for (const [key, value] of Object.entries(cars)) {
            temp.push(value);
        }
        return response.send(temp);
});


app.put("/cars/:carId",(request,response)=>{

    const carDetailId=request.params.carId;
    const body = request.body;

    if(Object.keys(cars).length>=carDetailId){
        cars[carDetailId]["make"] = body["make"] ? body["make"]: cars[carDetailId]["make"];
        cars[carDetailId]["model"] = body["model"] ? body["model"] :cars[carDetailId]["model"];
        cars[carDetailId]["year"] = body["year"] ? body["year"]:cars[carDetailId]["year"];
        cars[carDetailId]["color"] = body["color"] ? body["color"]:cars[carDetailId]["color"];
        cars[carDetailId]["engineType"] = body["engineType"] ? body["engineType"]:cars[carDetailId]["engineType"];
        let temp =[];
        for (const [key, value] of Object.entries(cars)) {
            temp.push(value);
        }
        return response.send(temp);
    }else{
        response.status(404).send("ID NOT FOUND");
    }

});


app.delete("/cars/:userId",(request,response)=>{

        
    if(Object.keys(cars).length>=carDetailId){

        const id= request.params.userId;
        delete cars[id];
        let temp =[];
        for (const [key, value] of Object.entries(cars)) {
            temp.push(value);
        }
        return response.send(temp);
    }else{
        response.status(404).send("ID NOT FOUND");
    }
});

app.put("/cars/change-spec/:userId",(request,response)=>{
    const id=request.params.userId;
    const requestBody=request.body;

    if(Object.keys(cars).length>=carDetailId){

        for (const [key, value] of Object.entries(requestBody)) {
            cars[id][key]=cars[id][key]? cars[id][key]:value;
        }
        let temp =[];
        for (const [key, value] of Object.entries(cars)) {
            temp.push(value);
        }
        return response.send(temp);
    }else{
        response.status(404).send("ID NOT FOUND");
    }
});


app.delete("/cars/changeSpec/:userId/:spec",(request,response)=>{
    const specification = request.params.spec;
    
    if(Object.keys(cars).length>=carDetailId){
        const id = request.params.userId;
        delete cars[id][specification];
        let temp =[];
        for (const [key, value] of Object.entries(cars)) {
            temp.push(value);
        }
        return response.send(temp);
    }else{
        
        response.status(404).send("ID NOT FOUND");
    }

});