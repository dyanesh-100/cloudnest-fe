import React, { useState } from 'react';
import SearchBar from '../SearchBarComponent/SearchBarComponent';
import FileList from '../FileListComponent/FileListComponent';
import noRecentFiles from '../../assets/images/no-recents.webp'; // Ensure this image exists in the specified path

const RecentPageComponent = ({ fileAndFolderData = { folders: [], files: [] }, onUploadFile, onDeleteFile }) => {
  const { files = [] } = fileAndFolderData;
  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUpload = (fileId) => {
    onUploadFile(fileId);
  };

  const handleFileDeletion = (fileId) => {
    onDeleteFile(fileId);
  };

  // Helper function to calculate day difference between two dates
  const calculateDayDiff = (date) => {
    const today = new Date();
    const fileDate = new Date(date);
    const daysDiff = Math.floor((today - fileDate) / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  // Filter functions for different categories
  const filterToday = (file) => calculateDayDiff(file.lastOpenedAt) === 0;
  const filterYesterday = (file) => calculateDayDiff(file.lastOpenedAt) === 1;
  const filterEarlierThisWeek = (file) => calculateDayDiff(file.lastOpenedAt) >= 2 && calculateDayDiff(file.lastOpenedAt) <= 6;
  const filterLastWeek = (file) => calculateDayDiff(file.lastOpenedAt) >= 7 && calculateDayDiff(file.lastOpenedAt) <= 13;
  const filterEarlierThisMonth = (file) => calculateDayDiff(file.lastOpenedAt) >= 14 && calculateDayDiff(file.lastOpenedAt) <= 30;
  const filterLastMonth = (file) => calculateDayDiff(file.lastOpenedAt) > 30 && calculateDayDiff(file.lastOpenedAt) <= 60;
  const filterEarlierThisYear = (file) => calculateDayDiff(file.lastOpenedAt) > 60;

  // Function to filter and sort files based on search query
  const myFilesFilter = (file) => {
    return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const sortFn = (a, b) => new Date(b.lastOpenedAt) - new Date(a.lastOpenedAt);

  
  const todayFiles = files.filter(filterToday).filter(myFilesFilter);
  const yesterdayFiles = files.filter(filterYesterday).filter(myFilesFilter);
  const earlierThisWeekFiles = files.filter(filterEarlierThisWeek).filter(myFilesFilter);
  const lastWeekFiles = files.filter(filterLastWeek).filter(myFilesFilter);
  const earlierThisMonthFiles = files.filter(filterEarlierThisMonth).filter(myFilesFilter);
  const lastMonthFiles = files.filter(filterLastMonth).filter(myFilesFilter);
  const earlierThisYearFiles = files.filter(filterEarlierThisYear).filter(myFilesFilter);

  const noFiles = 
    todayFiles.length === 0 &&
    yesterdayFiles.length === 0 &&
    earlierThisWeekFiles.length === 0 &&
    lastWeekFiles.length === 0 &&
    earlierThisMonthFiles.length === 0 &&
    lastMonthFiles.length === 0 &&
    earlierThisYearFiles.length === 0;

  return (
    <React.Fragment>
      <div className='px-8 py-16'>
     
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
        
        {/* Conditionally Render Categories */}
        {todayFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Today</p>
            <FileList
              files={todayFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true} 
            />
          </>
        )}

        {yesterdayFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Yesterday</p>
            <FileList
              files={yesterdayFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true}
            />
          </>
        )}

        {earlierThisWeekFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Earlier This Week</p>
            <FileList
              files={earlierThisWeekFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true}
            />
          </>
        )}

        {lastWeekFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Last Week</p>
            <FileList
              files={lastWeekFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true}
            />
          </>
        )}

        {earlierThisMonthFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Earlier This Month</p>
            <FileList
              files={earlierThisMonthFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true}
            />
          </>
        )}

        {lastMonthFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Last Month</p>
            <FileList
              files={lastMonthFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true}
            />
          </>
        )}

        {earlierThisYearFiles.length > 0 && (
          <>
            <p className='mt-20 mb-10 text-2xl font-semibold'>Earlier This Year</p>
            <FileList
              files={earlierThisYearFiles}
              sortFn={sortFn}
              onDeleteFile={handleFileDeletion}
              onUploadFile={handleFileUpload}
              showLastOpenedDate={true}
            />
          </>
        )}

        {/* Render message and image if no files available */}
        {noFiles && (
          <div className="mt-20 flex flex-col items-center h-[60vh] text-center">
            <img src={noRecentFiles} alt="No Files" className="w-96" />
            <p className="text-xl font-semibold text-gray-600">No recent files</p>
            <p className="text-gray-500 mt-2">See all the files that you've recently opened </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default RecentPageComponent;
