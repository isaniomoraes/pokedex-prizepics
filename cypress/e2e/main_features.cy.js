/// <reference types="cypress" />

context('Main Features', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/')
  })

  it('Search by pokemon name', () => {
    cy.get('input#pokedex-search-field').type('pikachu')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'pikachu')
  })

  it('Search by pokemon number', () => {
    cy.get('input#pokedex-search-field').type('1')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'bulbasaur')
  })

  it('Navigate using next button', () => {
    cy.get('input#pokedex-search-field').type('1')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'bulbasaur')
    cy.get('button#btn-next-pokemon').click()
    cy.get('h1').should('contain', 'ivysaur')
  })

  it('Navigate using prev button', () => {
    cy.get('input#pokedex-search-field').type('2')
    // focusout the input to trigger the search
    cy.get('input').blur()
    cy.get('h1').should('contain', 'ivysaur')
    cy.get('button#btn-prev-pokemon').click()
    cy.get('h1').should('contain', 'bulbasaur')

    // check if prev button now is disabled
    it('Check if prev button is disabled in first pokemon', () => {
      cy.get('button#btn-prev-pokemon').should('be.disabled')
    })
  })
})
