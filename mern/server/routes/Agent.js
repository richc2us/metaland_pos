import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("Sales_Agents");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("Sales_Agents");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});


// This section will help you create a new record.
router.post("/", async (req, res) => {
//  console.log(req.body);
//  console.log(req.body.buyer.middle_name);
  try {
    let newDocument = {
        company_id: "asdadadasdasdas",
        contact: {
          last_name: req.body.contact.last_name,
          first_name: req.body.contact.first_name,
          middle_name: req.body.contact.middle_name,
          tin_no: req.body.contact.tin_no,
          email: req.body.contact.email, 
          phone: req.body.contact.phone,
        },
        address: {
          address1: req.body.address.address1,
          address2: req.body.address.address2,
          region: req.body.address.region,
          province: req.body.address.province,
          city: req.body.address.city,
          barangay: req.body.address.barangay,
          zip: req.body.address.zip,
        },        
        tin_no:0,
        commission_percentage:req.body.commission_percentage,
        pay_scheme:req.body.pay_scheme,
        team_leader:req.body.team_leader,
        realty:req.body.realty,
        agent_type:"Agent",
        agend_id:"sdadasdasd"
      };
    let collection = await db.collection("Sales_Agents");
    console.log(collection);
    let result = await collection.insertOne(newDocument);
    console.log(result);
    res.send(result).status(204);
    console.log("inserted");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        company_id: "asdadadasdasdas",
        contact: {
          last_name: req.body.contact.last_name,
          first_name: req.body.contact.first_name,
          middle_name: req.body.contact.middle_name,
          tin_no: req.body.contact.tin_no,
          email: req.body.contact.email, 
          phone: req.body.contact.phone,
        },
        address: {
          address1: req.body.address.address1,
          address2: req.body.address.address2,
          region: req.body.address.region,
          province: req.body.address.province,
          city: req.body.address.city,
          barangay: req.body.address.barangay,
          zip: req.body.address.zip,
        },        
        tin_no:0,
        commission_percentage:req.body.commission_percentage,
        pay_scheme:req.body.pay_scheme,
        team_leader:req.body.team_leader,
        realty:req.body.realty,
        agent_type:"Agent",
        agend_id:"sdadasdasd",
      }
    };

    let collection = await db.collection("Sales_Agents");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("Sales_Agents");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
