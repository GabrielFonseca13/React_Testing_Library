import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do Requisito 5', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encounteredTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(encounteredTitle).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextPokeButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextPokeButton).toBeInTheDocument();
    userEvent.click(nextPokeButton);

    const nextPokeName1 = screen.getByText(/Charmander/i);
    expect(nextPokeName1).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName2 = screen.getByText(/Caterpie/i);
    expect(nextPokeName2).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName3 = screen.getByText(/Ekans/i);
    expect(nextPokeName3).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName4 = screen.getByText(/Alakazam/i);
    expect(nextPokeName4).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName5 = screen.getByText(/Mew/i);
    expect(nextPokeName5).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName6 = screen.getByText(/Rapidash/i);
    expect(nextPokeName6).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName7 = screen.getByText(/Snorlax/i);
    expect(nextPokeName7).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName8 = screen.getByText(/Dragonair/i);
    expect(nextPokeName8).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const nextPokeName0 = screen.getByText(/Pikachu/i);
    expect(nextPokeName0).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {

  });
});
