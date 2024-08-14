import Alert from '@/components/Alert';
import {
  THIS_MONTH,
  THIS_WEEK,
  TODAY,
  TOTAL,
  STATS,
  STATS_DESCRIPTION,
  QUOTA_LIMIT_DESCRIPTION,
} from '@/constants/uiTexts';
import { httpClient } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

const uploadStatsLabels: Record<string, string> = {
  uploaded_files_qty: TOTAL,
  uploaded_files_qty_today: TODAY,
  uploaded_files_qty_week: THIS_WEEK,
  uploaded_files_qty_month: THIS_MONTH,
};

const StatsPage = () => {
  const uploadStats = useQuery({
    queryKey: ['uploadStats'],
    queryFn: () => httpClient.get('/stats/'),
  });

  return (
    <div>
      <Alert variant="warn" className="mb-5">
        {QUOTA_LIMIT_DESCRIPTION}
      </Alert>
      <h1 className="text-lg leading-6 font-medium ">{STATS}</h1>
      <h2 className="text-sm leading-5 text-gray-500 dark:text-gray-400">
        {STATS_DESCRIPTION}
      </h2>

      {uploadStats.isLoading && <p>Loading...</p>}

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4 lg:grid-cols-4">
        {Object.keys(uploadStats.data?.data || {}).map((key: string) => (
          <div
            key={key}
            className="dark:bg-slate-900 relative pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <p className="text-sm font-medium  truncate">
                {uploadStatsLabels?.[key]}
              </p>
            </dt>
            <dd className="pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold ">
                {uploadStats.data?.data?.[key]}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StatsPage;
