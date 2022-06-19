import JWT from '../fixtures/JWT';

const getEmailInput = () => cy.get('[data-testid="email"] input');
const getPasswordInput = () => cy.get('[data-testid="password"] input');
const getSubmitButton = () => cy.get('[data-testid="submit"]');
const getInvalidCredentialsAlert = () =>
  cy.get('[data-testid="invalidCredentialsAlert"]');

describe('login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should focus on email input when email is empty', () => {
    getSubmitButton().click();
    getEmailInput().should('be.focused');
  });

  it('should focus on password input when password is empty', () => {
    // TODO: use faker instead
    getEmailInput().type('email@email.com');
    getSubmitButton().click();
    getPasswordInput().should('be.focused');
  });

  it('should appear invalid credentials when email or password are incorrect', () => {
    cy.intercept('POST', '/login', { statusCode: 400 }).as('login');
    // TODO: use faker instead
    getEmailInput().type('email@email.com');
    // TODO: use faker instead
    getPasswordInput().type('Password!0');
    getSubmitButton().click();
    cy.wait('@login');
    getInvalidCredentialsAlert().should('be.visible');
  });

  it('should appear invalid credentials when email or password are incorrect', () => {
    cy.intercept('POST', '/login', { statusCode: 200, body: JWT }).as('login');
    // TODO: use faker instead
    getEmailInput().type('email@email.com');
    // TODO: use faker instead
    getPasswordInput().type('Password!0');
    getSubmitButton().click();
    cy.wait('@login');
    cy.getCookie('accessToken').should(
      'have.property',
      'value',
      JWT.accessToken
    );
  });
});
