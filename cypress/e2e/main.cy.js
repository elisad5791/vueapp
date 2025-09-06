describe('Main page testing', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  });

  it('texts, labels', function () {
    cy.contains('Happy Shop');
    cy.contains('Главная');
    cy.contains('Панель администрирования');
    cy.contains('Корзина');
    cy.contains('Войти');
    cy.contains('Найти');
    cy.contains('Сбросить');
    cy.contains('Товары');
  });

  it('products are visible', function () {
    cy.get('[data-cy-product]').should('have.length', 20);
    cy.get('img').should('have.length', 20);
    cy.contains('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    cy.contains('Mens Casual Premium Slim Fit T-Shirts');
    cy.contains('Mens Cotton Jacket');
  });

  it('search works correct', function () {
    cy.get('[data-cy-product]').should('have.length', 20);

    cy.get('[data-cy-search-title]').type('slim');
    cy.get('[data-cy-search-button]').click();
    cy.get('[data-cy-product]').should('have.length', 2);

    cy.get('[data-cy-search-reset]').click();
    cy.get('[data-cy-product]').should('have.length', 20);

    cy.get('[data-cy-min-price]').type(100);
    cy.get('[data-cy-max-price]').type(150);
    cy.get('[data-cy-search-button]').click();
    cy.get('[data-cy-product]').should('have.length', 4);
  });
});