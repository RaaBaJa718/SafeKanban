import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const [sortCriteria, setSortCriteria] = useState<string>('dueDate');
  const [filterCriteria, setFilterCriteria] = useState<string>('');

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  const sortTickets = (tickets: TicketData[]) => {
    return [...tickets].sort((a, b) => {
      if (sortCriteria === 'priority') {
        const priorityA = a.priority ?? ''; // Handles possible null values
        const priorityB = b.priority ?? ''; // Handles possible null values
        return priorityA.localeCompare(priorityB);
      }
      if (sortCriteria === 'dueDate') {
        const dueDateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dueDateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return dueDateA - dueDateB;
      }
      return 0;
    });
  };

  const filteredAndSortedTickets = () => {
    const filtered = filterCriteria
      ? tickets.filter(ticket => ticket.status === filterCriteria)
      : tickets;

    return sortTickets(filtered);
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>

          {/* Sorting and Filtering Controls */}
          <div className="controls">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
            </select>

            <label htmlFor="filter">Filter by:</label>
            <select
              id="filter"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <option value="">All</option>
              {boardStates.map(state => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Display the Swimlanes */}
          <div className="board-display">
            {boardStates.map((status) => {
              const filteredTickets = filteredAndSortedTickets().filter(
                ticket => ticket.status === status
              );
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
