import compose from 'koa-compose';
import pokemonRouters from './pokemons/router';

export default compose([pokemonRouters]);
