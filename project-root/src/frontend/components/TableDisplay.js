import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import _ from 'lodash';

const TableDisplay = ({ logs }) => {
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    filterLogs();
    sortLogs();
  }, [logs, searchTerm, sortKey, sortDirection]);

  const filterLogs = () => {
    const filtered = logs.filter(log => {
      return log.message.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredLogs(filtered);
  };

  const sortLogs = () => {
    if (sortKey) {
      const sorted = _.orderBy(filteredLogs, [sortKey], [sortDirection]);
      setFilteredLogs(sorted);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSort = key => {
    if (key === sortKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search logs..." />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('timestamp')}>Timestamp</th>
            <th onClick={() => handleSort('level')}>Level</th>
            <th onClick={() => handleSort('message')}>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{Moment(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>{log.level}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;