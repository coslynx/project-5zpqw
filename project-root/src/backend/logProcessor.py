import os
import time

class LogProcessor:
    def __init__(self, log_file):
        self.log_file = log_file
        self.log_data = []

    def read_logs_from_file(self):
        if os.path.exists(self.log_file):
            with open(self.log_file, 'r') as file:
                for line in file:
                    self.log_data.append(line.strip())
        else:
            print("Log file does not exist.")

    def update_logs_real_time(self):
        while True:
            with open(self.log_file, 'r') as file:
                new_logs = file.readlines()
                if new_logs != self.log_data:
                    self.log_data = new_logs
                    # Update table display with new logs
            time.sleep(1)

    def search_logs(self, keyword):
        results = [log for log in self.log_data if keyword in log]
        return results

    def sort_logs(self, criteria):
        if criteria == 'timestamp':
            self.log_data.sort(key=lambda x: x.split()[0])
        elif criteria == 'log_level':
            self.log_data.sort(key=lambda x: x.split()[1])

    def filter_logs(self, criteria, value):
        if criteria == 'log_level':
            filtered_logs = [log for log in self.log_data if value in log]
        elif criteria == 'message':
            filtered_logs = [log for log in self.log_data if value in log]
        return filtered_logs

    def highlight_logs(self, keyword):
        highlighted_logs = [f'<span style="background-color: yellow;">{log}</span>' if keyword in log else log for log in self.log_data]
        return highlighted_logs

    def export_logs(self, file_name):
        with open(file_name, 'w') as file:
            for log in self.log_data:
                file.write(log + '\n')

    # Add more functionalities as needed

# Usage example:
# log_processor = LogProcessor('path/to/log/file.log')
# log_processor.read_logs_from_file()
# log_processor.update_logs_real_time()
# search_results = log_processor.search_logs('error')
# log_processor.sort_logs('timestamp')
# filtered_logs = log_processor.filter_logs('log_level', 'INFO')
# highlighted_logs = log_processor.highlight_logs('error')
# log_processor.export_logs('exported_logs.txt')