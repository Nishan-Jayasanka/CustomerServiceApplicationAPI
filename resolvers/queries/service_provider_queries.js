const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const { User, ServiceRequests } = require('../../models');

const service_provider_queries = {
  pendingServiceRequestsForMe: async (parent, args, { models, user }) => {
    if(!user){
      throw new AuthenticationError("Please login to continue")
    }
    const foundUser = await models.User.findById(user.id)
    if(!foundUser.roles.includes("service_provider")){
      throw new ForbiddenError("You don't have enough permission to do this")
    }
    
    const pendingRequests=await ServiceRequests.find({ state: 'Pending', provider_id: user.id }).limit(
      100
    );
    console.log(pendingRequests);
    return pendingRequests;
  },

  acceptedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if(!user){
      throw new AuthenticationError("Please login to continue")
    }
    const foundUser = await models.User.findById(user.id)
    if(!foundUser.roles.includes("service_provider")){
      throw new ForbiddenError("You don't have enough permission to do this")
    }
    
    const acceptedRequests= await ServiceRequests.find({
      state: 'Accepted',
      provider_id: user.id
    }).limit(100);
    console.log(acceptedRequests);
    return acceptedRequests;
  }
};

module.exports = service_provider_queries;
