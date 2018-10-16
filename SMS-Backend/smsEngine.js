const MongoClient = require("mongodb").MongoClient;


const url = "mongodb://localhost:27017/";

module.exports = {

    getOrganizations: (res) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if (err) throw err;
            var dbo = db.db("smsDB");

            dbo.collection("organizations").find({}).toArray(function (err, result) {
                if (err) throw err;
                var orgNames = [];
                for (let org in result) {
                    orgNames[org] = {
                        _id: result[org]._id,
                        organizationName: result[org].organizationName
                    }
                }
                // console.log(result);
                res.send(JSON.stringify(orgNames));
                db.close();
            });

        })
    },
    getProjects: (req, res) => {

        MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {

            if (err) throw err;
            var dbo = db.db("smsDB");

            dbo.collection("organizations").findOne({ organizationName: req.body.orgName }, (err, result) => {
                if (err) throw err;
                // var project = { 
                //     organizationName: req.body.orgName, 
                //     project: result.project 
                // }
                // console.log(result);
                res.send(result.project);
                db.close();
            })

        });
    }
};