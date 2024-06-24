import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';

const LogSorter = ({ logs }) => {
  const [sortedLogs, setSortedLogs] = useState([]);

  useEffect(() => {
    sortLogs();
  }, [logs]);

  const sortLogs = () => {
    const sorted = _.orderBy(logs, ['timestamp'], ['desc']);
    setSortedLogs(sorted);
  };

  return (
    <div>
      <h2>Sorted Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.map((log, index) => (
            <tr key={index}>
              <td>{moment(log.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>{log.level}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogSorter;