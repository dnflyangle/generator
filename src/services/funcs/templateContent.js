
import ejs from 'ejs';
import fs from 'fs';

import logger from '../../utils/logger';

const templateContent = (groupedEvents) => {
  try {
    const data = fs.readFileSync(`${__dirname}/emailTemplate.ejs`, 'utf8');
    const template = ejs.compile(data);
    const htmlContent = template({ groupedEvents });
    fs.writeFileSync('output.html', htmlContent);
  } catch (err) {
    logger.error('unable to template events, with err: ', err);
  }
};

export default templateContent;
