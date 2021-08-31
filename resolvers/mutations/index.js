const user_mutations = require('./user_mutations')
const job_posting_mutations = require('./job_posting_mutations')
const service_requester_mutations = require('./service_requester_mutations')
module.exports = {
 ...user_mutations,
  ...service_requester_mutations,
 ...job_posting_mutations
};
