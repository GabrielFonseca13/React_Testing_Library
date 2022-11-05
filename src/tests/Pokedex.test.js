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
    renderWithRouter(<App />);
    const pokemonNameTestId = screen.getAllByTestId(/pokemon-name/i);
    expect(pokemonNameTestId.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId(/pokemon-type-button/i);
    expect(filterButtons.length).toBe(7);
    // console.log(filterButtons);

    expect(filterButtons[0]).toHaveTextContent('Electric');
    expect(filterButtons[1]).toHaveTextContent('Fire');
    expect(filterButtons[2]).toHaveTextContent('Bug');
    expect(filterButtons[3]).toHaveTextContent('Poison');
    expect(filterButtons[4]).toHaveTextContent('Psychic');
    expect(filterButtons[5]).toHaveTextContent('Normal');
    expect(filterButtons[6]).toHaveTextContent('Dragon');

    const allButon = screen.getByRole('button', { name: /All/i });
    expect(allButon).toBeInTheDocument();
    userEvent.click(allButon);
    expect(screen.getByText(/Pikachu/i));

    userEvent.click(filterButtons[4]);
    const psychicPoke1 = screen.getByText(/Alakazam/i);
    expect(psychicPoke1).toBeInTheDocument();

    const nextPokeButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextPokeButton).toBeInTheDocument();

    userEvent.click(nextPokeButton);
    const psychicPoke2 = screen.getByText(/Mew/i);
    expect(psychicPoke2).toBeInTheDocument();
  });
});
