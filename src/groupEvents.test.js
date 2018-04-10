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

    const groupedEvents = groupEvents(events, '2018-04-08');
    expect(groupedEvents).toEqual([{
      date: 'Sunday 08/04/2018',
      eventsByDate: [],
    }, {
      date: 'Monday 09/04/2018',
      eventsByDate: [{
        time: '5:00 pm',
        eventsByTime: [
          {
            eventName: 'Harry Potter Two',
            date: '2018-04-09',
            time: '17:00',
            groupName: 'Harry Potter',
            link: 'https://www.harrypotter.com/2',
          }],
      }],
    }, {
      date: 'Tuesday 10/04/2018',
      eventsByDate: [],
    }, {
      date: 'Wednesday 11/04/2018',
      eventsByDate: [],
    }, {
      date: 'Thursday 12/04/2018',
      eventsByDate: [{
        time: '2:00 pm',
        eventsByTime: [{
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
      }, {
        time: '3:00 pm',
        eventsByTime: [{
          eventName: 'Big Bang Theory Two',
          date: '2018-04-12',
          time: '15:00',
          groupName: 'Big Bang Theory',
          link: 'https://www.bigbangtheory.com/1',
        }],
      }],
    }, {
      date: 'Friday 13/04/2018',
      eventsByDate: [],
    }, {
      date: 'Saturday 14/04/2018',
      eventsByDate: [],
    }]);
  });
});
