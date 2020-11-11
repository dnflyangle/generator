import { query } from './index';

export const getGroupsByOfficeFromDB = async (office) => {
  const { rows } = await query('SELECT * FROM meetup_groups WHERE office = $1', [office]);

  return rows;
};

export const getGroupFromDB = async (office, groupName) => {
  const { rows } = await query('SELECT * FROM meetup_groups WHERE office = $1 and group_name = $2', [office, groupName]);

  return rows;
};

export const addGroupToDB = async (office, groupName) => {
  const { rows } = await query('INSERT INTO meetup_groups(group_name, office) VALUES ($1, $2);', [groupName, office]);

  return rows;
};
