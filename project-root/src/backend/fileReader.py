import os
import time

class LogReader:
    def __init__(self, log_file_path):
        self.log_file_path = log_file_path
        self.log_file = None
        self.current_position = 0

    def open_log_file(self):
        if os.path.exists(self.log_file_path):
            self.log_file = open(self.log_file_path, 'r')
            self.log_file.seek(0, os.SEEK_END)
            self.current_position = self.log_file.tell()
        else:
            print("Log file not found.")

    def read_logs(self):
        if self.log_file:
            self.log_file.seek(self.current_position)
            logs = self.log_file.read()
            self.current_position = self.log_file.tell()
            return logs
        else:
            print("Log file is not open.")

    def close_log_file(self):
        if self.log_file:
            self.log_file.close()
        else:
            print("Log file is not open.")

    def tail_logs(self, interval=1):
        if self.log_file:
            while True:
                where = self.log_file.tell()
                line = self.log_file.readline()
                if not line:
                    time.sleep(interval)
                    self.log_file.seek(where)
                else:
                    print(line.strip())
        else:
            print("Log file is not open.")