import axios from 'axios';
import getMeetupEvents from './getMeetupEvents';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

xdescribe('getMeetupEvents', () => {
  it('should filter out empty events', async () => {
    axios.get
      .mockReturnValueOnce(Promise.resolve({ data: 'existEvent' }))
      .mockReturnValueOnce(Promise.resolve({}))
      .mockReturnValueOnce(Promise.resolve({ data: {} }));
    const events = await getMeetupEvents(['someExistEventUrl', 'someNonExistEventUrl1', 'someNonExistEventUrl2']);
    expect(events).toEqual(['existEvent']);
  });
});
