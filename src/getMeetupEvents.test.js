import getMeetupEvents from './getMeetupEvents';
import buildRequest from './buildRequest';
import buildMeetupUrls from './buildMeetupUrls';

jest.mock('./buildMeetupUrls');
jest.mock('./buildRequest');

describe('getMeetupEvents', () => {
  beforeAll(() => {
    buildMeetupUrls.mockReturnValue(['someExistEventUrl', 'someNonExistEventUrl']);
    buildRequest.mockImplementation((url) => (url === 'someExistEventUrl' ? 'existEvent' : undefined));
  });

  it('should filter out empty events', async () => {
    const events = await getMeetupEvents();
    expect(events).toEqual(['existEvent']);
  });
});
