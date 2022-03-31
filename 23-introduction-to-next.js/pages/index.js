import {Head} from "next/document";
import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {Fragment} from "react";
// import {useEffect, useState} from "react";

const HomePage = (props) => {
    // const [loadedMeetup,setLoadedMeetup] = useState([]);
    // useEffect(() => {
    //     //send http request and fetch data
    //     setLoadedMeetup(DUMMY_MEETUPS)
    // },[])
    return (
        <Fragment>
            <Head>
                <title>Meetups</title>
                <meta name='description' content='mohammad rostami - fullStack web developer'/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>

    );
}

//SSr
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     //fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }

//SSG
export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://mohammad:mohammad0@cluster0.izscz.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    await client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;
