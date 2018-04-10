import groupEvents from './groupEvents';

describe('groupEvents', () => {
  it('should group events by day of week and time', () => {
    const events = [
      {
        eventName: 'Big Bang Theory One',
        date: '2018-04-12',
        time: '14:00',
        groupName: 'Big Bang Theory',
        link: 'https://www.bigbangtheory.com/1',
      },
      {
        eventName: 'Big Bang Theory Two',
        date: '2018-04-12',
        time: '15:00',
        groupName: 'Big Bang Theory',
        link: 'https://www.bigbangtheory.com/1',
      },
      {
        eventName: 'Harry Potter One',
        date: '2018-04-12',
        time: '14:00',
        groupName: 'Harry Potter',
        link: 'https://www.harrypotter.com/1',
      },
      {
        eventName: 'Harry Potter Two',
        date: '2018-04-09',
        time: '17:00',
        groupName: 'Harry Potter',
        link: 'https://www.harrypotter.com/2',
      },
    ];

    const groupedEvents = groupEvents(events, '2018-04-09');
    expect(groupedEvents).toEqual({
      'Monday 09/04/2018': {
        '5:00 pm': [{
          eventName: 'Harry Potter Two',
          date: '2018-04-09',
          time: '17:00',
          groupName: 'Harry Potter',
          link: 'https://www.harrypotter.com/2',
        }],
      },
      'Tuesday 10/04/2018': {},
      'Wednesday 11/04/2018': {},
      'Thursday 12/04/2018': {
        '2:00 pm': [{
          eventName: 'Big Bang Theory One',
          date: '2018-04-12',
          time: '14:00',
          groupName: 'Big Bang Theory',
          link: 'https://www.bigbangtheory.com/1',
        }, {
          eventName: 'Harry Potter One',
          date: '2018-04-12',
          time: '14:00',
          groupName: 'Harry Potter',
          link: 'https://www.harrypotter.com/1',
        }],
        '3:00 pm': [{
          eventName: 'Big Bang Theory Two',
          date: '2018-04-12',
          time: '15:00',
          groupName: 'Big Bang Theory',
          link: 'https://www.bigbangtheory.com/1',
        }],
      },
      'Friday 13/04/2018': {},
    });
  });
});
