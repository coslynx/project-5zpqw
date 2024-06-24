import React from 'react';

const LogHighlighter = ({ logs, highlightedLogs }) => {
  const highlightLogs = () => {
    const highlightedLogsSet = new Set(highlightedLogs);
    return logs.map((log, index) => (
      <div key={index} style={{ backgroundColor: highlightedLogsSet.has(log) ? 'yellow' : 'transparent' }}>
        {log}
      </div>
    ));
  };

  return (
    <div>
      {highlightLogs()}
    </div>
  );
};

export default LogHighlighter;