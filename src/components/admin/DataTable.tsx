'use client';

import Link from 'next/link';

export type Column<T> = {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
};

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  editPath,
  onDelete,
}: {
  columns: Column<T>[];
  data: T[];
  editPath: (id: string) => string;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th key={col.key} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
            <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                  {col.render(item)}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={editPath(item.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-sm text-gray-400">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
