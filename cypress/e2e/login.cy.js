describe('Login testing', function() {
  
  beforeEach(function() {
    cy.visit('http://localhost:5173/login');
  });

  it('login form is visible', function() {
    cy.get('form').should('exist');
    cy.get('[data-cy-name]').should('exist');
    cy.get('[data-cy-email]').should('exist');
    cy.get('[data-cy-password]').should('exist');
    cy.get('[data-cy-submit]').should('exist');
  });

  it('successful login', function() {
    cy.get('[data-cy-name]').type('testuser');
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    cy.contains('Создать новый товар');
  });

  it('failed login', function() {
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    cy.contains('Введите имя, email, пароль');
  });
});