const { method } = require("bluebird");
const { url } = require("inspector");

describe('API Reqres', () => {
  function randomName(){
    const randomString = Math.random().toString(36).substring(2,10)
    const name = "User" + randomString
    return name
  }

  let username = randomName()
  let data = {
    "name": username,
    "job": "UI/UX"
  }

  it('Get List Users', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  });

  it('GCreate Users', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: data
      }).then((response) => {
        expect(response.status).to.eq(201)
        cy.log(data)
      })
  })
})
