import { buildMeetupUrls } from './ContentService';
import { getMeetupGroups } from './MeetupGroupService';


jest.mock('./MeetupGroupService', () => ({
  getMeetupGroups: jest.fn(),
}));

describe('buildMeetupUrls', () => {
  it('should return an array of meetup urls', async () => {
    getMeetupGroups.mockReturnValue(Promise.resolve([{
      groupName: 'MeetupOne',
    }, {
      groupName: 'MeetupTwo',
    }]));
    const meetupUrls = await buildMeetupUrls();
    expect(meetupUrls).toEqual([
      'https://api.meetup.com/MeetupOne/events',
      'https://api.meetup.com/MeetupTwo/events',
    ]);
  });
});
