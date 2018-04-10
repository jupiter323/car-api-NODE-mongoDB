const car = require('../../../models/car');
const listing = require('../../../models/listing');
const https = require('https');
const http = require('http');
const path = require('path'), fs = require('fs');
const helpers = require("../../../services/helpers");


module.exports.getModelData = function (req, res) {

    let modelYear = req.params.modelYear;
    let makeName = req.params.makeName;
    let modelName = req.params.modelName;
    let styleName = encodeURIComponent(req.params.styleName);
    console.log("stylename======", styleName);

    let makeModels = require('../../../uploads/service/details/' + modelYear + '_' + makeName + '_' + modelName + '_' + styleName + '.json')
    res.send(makeModels);

    // car.getModelData(modelId, function(err, model_info){
    //     if(err) {res.status(501).send(err)}
    //     listing.find({model_id : modelId}, function(err, listings){
    //         if(err) {res.status(501).send(err)}            
    //         res.send({model_info : model_info , listings: listings});
    //     });        
    // })
}

module.exports.getModelGalleryData = function (req, res) {
    console.log("get gallery data");

    let styleId = req.params.styleId;
    console.log("stylle ID:====", styleId)

    let request = "https://313496:6d84d5c446a84c98@media.chromedata.com/MediaGallery/service/style/" + styleId + "/.json";
    console.log(request);
    // res.send(request); 

    https.get(request, (resp) => {

        let data = '';
        //A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            console.log("data=======", data)

            let galleryData = data.substring(0, 1) == '{' ? JSON.parse(data) : require('../../../uploads/service/details/gallery_data/temp.json');
            res.send(galleryData);
        });


    }).on("error", (err) => {


        console.log("Error: " + err.message);
        res.status(500).send(err.message);
    });

}



module.exports.getRelatedModels = function (req, res) {
    let modelId = req.params.modelId;
    car.getRelatedModels(modelId, function (err, related_models) {
        if (err) res.status(501).send(err);
        res.send(related_models);
    })
}

module.exports.getModel = function (req, res) {
    let modelId = req.params.modelId;
    console.log(modelId, "modelId");
    car.findModels({ model_id: modelId }, function (err, data) {
        if (err || !data.length) {
            helpers.sendError(res, "Invalid Car Model");
        }
        else {
            res.send(data);

        }

    })

}

module.exports.getModelsbyMakeId = function (req, res) {
    let makeId = req.params.makeId;
    car.findModels({ make_id: makeId }, function (err, data) {
        if (err || !data.length) {
            helpers.sendError(res, "Invalid Car Model");
        }
        else {
            res.send(data);

        }

    })

}