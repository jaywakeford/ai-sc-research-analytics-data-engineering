'use client';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { getPdfPath, getBasePath } from '@/utils/paths';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set worker path
const workerSrc = `${getBasePath()}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface PdfViewerProps {
  src: string;
}

export default function PdfViewer({ src }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pdfUrl = getPdfPath(src);

  React.useEffect(() => {
    // Reset state when src changes
    setPageNumber(1);
    setError(null);
    setIsLoading(true);
  }, [src]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error, 'Source:', pdfUrl);
    setError(error);
    setIsLoading(false);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if (error) {
    return (
      <div className="bg-red-900/20 p-4 rounded-lg text-red-200">
        <p>Error loading PDF: {error.message}</p>
        <p className="text-sm mt-2">Source: {getPdfPath(src)}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-3xl overflow-auto max-h-[800px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="loading-spinner" />
          </div>
        )}
        <Document
          file={getPdfPath(src)}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex justify-center p-4">
              <div className="loading-spinner" />
            </div>
          }
          className="flex justify-center"
          error={
            <div className="bg-red-900/20 p-4 rounded-lg text-red-200">
              <p>Failed to load PDF. Please try again later.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            className="border border-gray-200 dark:border-gray-700 shadow-lg"
            width={800}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            loading={
              <div className="flex justify-center p-4">
                <div className="loading-spinner" />
              </div>
            }
            error={
              <div className="bg-red-900/20 p-4 rounded-lg text-red-200">
                <p>Failed to load page {pageNumber}. Please try again later.</p>
              </div>
            }
          />
        </Document>
      </div>

      <div className="flex items-center gap-4 mt-4 sticky bottom-0 bg-gray-900/80 p-4 rounded-lg backdrop-blur-sm">
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <p className="text-gray-300">
          Page {pageNumber} of {numPages}
        </p>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <style jsx>{`
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.1);
          border-left-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 