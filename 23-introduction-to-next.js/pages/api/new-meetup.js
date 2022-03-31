import {MongoClient} from "mongodb";

// api/new-meetup

async function Handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        // const {title, address, description, image} = data;
        const client = await MongoClient.connect('mongodb+srv://mohammad:mohammad0@cluster0.izscz.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        await client.close();
        res.status(201).json({message: 'Meetup Inserted'});
    }
}

export default Handler;