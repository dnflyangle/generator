import buildMeetupUrls from './buildMeetupUrls';

jest.mock('../../constants/MeetupGroupNames', () => ([
  'MeetupOne',
  'MeetupTwo',
]));
describe('buildMeetupUrls', () => {
  it('should return an array of meetup urls', () => {
    const meetupUrls = buildMeetupUrls();
    expect(meetupUrls).toEqual([
      'https://api.meetup.com/MeetupOne/events',
      'https://api.meetup.com/MeetupTwo/events',
    ]);
  });
});
