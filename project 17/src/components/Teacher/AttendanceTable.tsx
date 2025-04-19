import React from 'react';
import { User, Clock } from 'lucide-react';
import { Subject, StudentAttendance } from '../../types';
import { attendanceRecords } from '../../data';

interface AttendanceTableProps {
  selectedSubject: Subject | null;
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ selectedSubject }) => {
  const filteredRecords = selectedSubject 
    ? attendanceRecords.filter(record => record.subject === selectedSubject)
    : attendanceRecords;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-primary-700">
          {selectedSubject ? `${selectedSubject} Attendance` : 'All Attendance Records'}
        </h3>
        <span className="text-sm text-gray-500">
          {filteredRecords.length} Records
        </span>
      </div>
      
      {filteredRecords.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{record.usn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                      {record.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      {formatTime(record.timestamp)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-gray-400 mb-2">
            <User size={48} className="mx-auto" />
          </div>
          <h4 className="text-gray-700 font-medium mb-1">No Attendance Records</h4>
          <p className="text-gray-500 text-sm">
            {selectedSubject
              ? `No students have marked their attendance for ${selectedSubject} yet`
              : 'Select a subject and have students scan the QR code to mark attendance'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;