import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonsList = pokemons;

describe('Testes do Requisito 7 Teste se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
  it('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const nameTitle = screen.getByText(`${pokemonsList[0].name} Details`);
    expect(nameTitle).toBeInTheDocument();

    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();

    const detailsPokemonText = screen.getByText(pokemonsList[0].summary);
    expect(detailsPokemonText).toBeInTheDocument();
  });
});
