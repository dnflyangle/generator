import getMeetupEvents from './getMeetupEvents';
import buildRequest from './buildRequest';

jest.mock('./buildMeetupUrls');
jest.mock('./buildRequest');

describe('getMeetupEvents', () => {
  beforeAll(() => {
    buildRequest.mockImplementation((url) => (url === 'someExistEventUrl' ? 'existEvent' : undefined));
  });

  it('should filter out empty events', async () => {
    const events = await getMeetupEvents(['someExistEventUrl', 'someNonExistEventUrl']);
    expect(events).toEqual(['existEvent']);
  });
});
