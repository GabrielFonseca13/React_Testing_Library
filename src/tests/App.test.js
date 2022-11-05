import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do Requisito 1', () => {
  it('Teste se o topo da aplicação contém o link com o texto Home, About e Fav Pokemons', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favPokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokemons).toBeInTheDocument();
  });
  it('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    const INVALID_URL = '/pagina-inexistente';
    act(() => {
      history.push(INVALID_URL);
    });

    const notFoundTitle = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
