import MEETUP_GROUP_NAMES from '../../constants/MeetupGroupNames';


const buildMeetupUrls = () => MEETUP_GROUP_NAMES.map(groupName => `https://api.meetup.com/${groupName}/events`);

export default buildMeetupUrls;
