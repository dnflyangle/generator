import filterEvents from './filterEvents';

describe('filterEvents', () => {
  it('should filter events by dateRange', () => {
    const events = [[{
      name: 'Big Bang Theory One',
      local_date: '2018-04-12',
      local_time: '14:00',
      group:
       {
         name: 'Big Bang Theory',
       },
      link: 'https://www.bigbangtheory.com/1',
    },
    {
      name: 'Big Bang Theory Two',
      local_date: '2018-04-02',
      local_time: '15:00',
      group:
       {
         name: 'Big Bang Theory',
       },
      link: 'https://www.bigbangtheory.com/2',
    }], [{
      name: 'Harry Potter One',
      local_date: '2018-04-16',
      local_time: '16:00',
      group:
       {
         name: 'Harry Potter',
       },
      link: 'https://www.harrypotter.com/1',
    },
    {
      name: 'Harry Potter Two',
      local_date: '2018-04-08',
      local_time: '17:00',
      group:
       {
         name: 'Harry Potter',
       },
      link: 'https://www.harrypotter.com/2',
    }]];

    const filteredEvents = filterEvents(events, '2018-04-08', '2018-04-14');
    expect(filteredEvents).toEqual([
      {
        eventName: 'Big Bang Theory One',
        date: '2018-04-12',
        time: '14:00',
        groupName: 'Big Bang Theory',
        link: 'https://www.bigbangtheory.com/1',
      },
      {
        eventName: 'Harry Potter Two',
        date: '2018-04-08',
        time: '17:00',
        groupName: 'Harry Potter',
        link: 'https://www.harrypotter.com/2',
      },
    ]);
  });
});
