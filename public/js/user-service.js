import reqwest from 'reqwest';

class UserService {

  getUser(){
    return reqwest({
        url: `/api/user`,
        method: 'get'
    });
  }
}

module.exports = new UserService();
