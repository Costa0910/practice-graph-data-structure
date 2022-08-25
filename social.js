// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID++;
    const newUser = {
      id: this.currentID,
      name
    }

    this.users[this.currentID] = newUser;
    this.follows[this.currentID] = new Set();
    return this.currentID;
  }

  getUser(userID) {
    // Your code here
    if (this.users[userID]) {
      return this.users[userID];
    }

    return null;
  }

  follow(userID1, userID2) {
    // Your code here
    if (this.users[userID1] && this.users[userID2]) {
      this.follows[userID1].add(userID2);
      return true;
    }

    return false;
  }

  getFollows(userID) {
    // Your code here
    if (this.users[userID]) {
      let frinds = this.follows[userID];
      return frinds;
    }

    return null;
  }

  getFollowers(userID) {
    // Your code here
    const followers = new Set();

    for (let follow in this.follows) {
      let follower = this.follows[follow];
      // console.log(follower.has(2));
      if (follower.has(userID)) {
        followers.add(Number(follow));
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    const follow = [];
    this.getFollows(userID).forEach(foll => follow.push(foll));

    const queue = [ follow ];
    const visited = new Set();
    const recommendFriends = [];

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const currentNode = currentPath[currentPath.length - 1];

      if (!visited.has(currentNode)) {
        visited.add(userID);
        visited.add(currentNode);

        const follows = [];
        this.getFollows(currentNode).forEach(foll => follows.push(foll));

        if (currentPath.length > 1 && currentPath.length <= degrees + 1) {
          recommendFriends.push(currentNode);
        }

        for (const follow of follows) {
          queue.push([...currentPath, follow]);
        }
      }
    }

    return recommendFriends;
  }
}

module.exports = SocialNetwork;