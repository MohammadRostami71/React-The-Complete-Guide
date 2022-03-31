import {Head} from "next/document";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectID} from "mongodb";
import {Fragment} from "react";

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
                <title>Meetups</title>
                <meta name='description' content='mohammad rostami - fullStack web developer'/>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                description={props.meetupData.description}
                address={props.meetupData.address}
            />
        </Fragment>
    );
};

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://mohammad:mohammad0@cluster0.izscz.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    await client.close();
    return {
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}})),
        fallback: true
    };
}


export async function getStaticProps(context) {
    //fetch data for single meetup
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://mohammad:mohammad0@cluster0.izscz.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectID(meetupId)});
    await client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        },
        revalidate: 1
    };
}

export default MeetupDetails;