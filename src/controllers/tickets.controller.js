import TicketRepository from '../repositories/TicketRepository.js';

export async function createTicket(req, res) {
    try {
        const ticketData = req.body;
        const ticket = await TicketRepository.createTicket(ticketData);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getTicketById(req, res) {
    try {
        const ticketId = req.params.id;
        const ticket = await TicketRepository.findTicketById(ticketId);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ error: 'Ticket not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
