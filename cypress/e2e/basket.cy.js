describe('Basket testing', function() {
  it('unauthorized user cannot enter', function() {
    cy.visit('http://localhost:5173/basket');
    cy.contains('Имя');
    cy.contains('Email');
    cy.contains('Пароль');
    cy.contains('Войти');
  });

  it('empty basket', function() {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy-name]').type('testuser');
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    
    cy.visit('http://localhost:5173/basket');
    cy.contains('В корзине нет товаров');
  });

  it('add product to basket', function() {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy-name]').type('testuser');
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    
    cy.visit('http://localhost:5173');
    cy.get('[data-cy-add="1"]').click();

    cy.contains('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    cy.contains('Полная сумма: 109.95 руб.');
  });

  it('increase product quantity', function() {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy-name]').type('testuser');
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    
    cy.visit('http://localhost:5173');
    cy.get('[data-cy-add="1"]').click();
    
    cy.get('[data-cy-increase="1"]').click();
    cy.contains('Полная сумма: 219.90 руб.');
  });

  it('decrease product quantity', function() {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy-name]').type('testuser');
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    
    cy.visit('http://localhost:5173');
    cy.get('[data-cy-add="1"]').click();
    
    cy.get('[data-cy-increase="1"]').click();
    cy.get('[data-cy-decrease="1"]').click();
    cy.contains('Полная сумма: 109.95 руб.');
  });

  it('delete product', function() {
    cy.visit('http://localhost:5173/login');
    cy.get('[data-cy-name]').type('testuser');
    cy.get('[data-cy-email]').type('test@example.com');
    cy.get('[data-cy-password]').type('password123');
    cy.get('[data-cy-submit]').click();
    
    cy.visit('http://localhost:5173');
    cy.get('[data-cy-add="1"]').click();
    
    cy.get('[data-cy-delete="1"]').click();
    cy.contains('В корзине нет товаров');
  });
});