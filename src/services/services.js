
import UsersDAO from '../dao/mongo/UsersDAO.js';
import ProductDAO from '../dao/mongo/ProductDAO.js';
import TicketDAO from '../dao/mongo/TicketDAO.js';

export const usersService = UsersDAO;
export const productsService = ProductDAO;
export const TicketsService = TicketDAO;
