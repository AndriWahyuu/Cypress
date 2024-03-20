const userData = require('../../../fixtures/userData.json')

describe('Verify Saucedemo Login Functionality', () => {
  it('Failed Login because locked user', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.wait(20000);
    cy.get('#user-name').type('locked_out_user');
    cy.get('[data-test="password"]').type(userData.valid_password);
    cy.get('.submit-button.btn_action').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.')
  });

  it('Success Login', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('[data-test="password"]').type(userData.valid_password);
    cy.get('.submit-button.btn_action').click();
    cy.url().should('include','www.saucedemo.com/inventory.html')
  })

  it('Failed Login - Wrong Password', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('[data-test="password"]').type('ABC');
    cy.get('.submit-button.btn_action').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  });

  it('Failed Login - Wrong creds CUSTOM COMMAND', () => {
    cy.visit('');
    cy.login('Andriana', 'UI/UX Designer')
    cy.verifyContain('[data-test="error"]', 'Epic sadface: Username and password do not match any user in this service' )
  });
})
