import {Head} from "next/document";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";

const NewMeetup = () => {
    const router = useRouter();
    const addMeetupHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        await router.push('/')
    };
    return (
        <Fragment>
            <Head>
                <title>Meetups</title>
                <meta name='description' content='mohammad rostami - fullStack web developer'/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>

    );
}
export default NewMeetup;