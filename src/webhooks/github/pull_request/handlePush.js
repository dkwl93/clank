const _ = require('lodash');
const { getSlackChannelId } = require('../../../constants');
const { updateLabel } = require('../../../slack/postMessage');

const handlePush = async (payload, res) => {
  console.log(payload);
};
