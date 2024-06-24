import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const LogFilter = ({ logs }) => {
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [filterCriteria, setFilterCriteria] = useState('');

  useEffect(() => {
    applyFilter();
  }, [logs, filterCriteria]);

  const applyFilter = () => {
    if (filterCriteria === '') {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => log.message.includes(filterCriteria));
      setFilteredLogs(filtered);
    }
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Filter logs by message" onChange={handleFilterChange} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.level}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LogFilter;