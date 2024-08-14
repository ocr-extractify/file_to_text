import Alert from '@/components/Alert';
import {
  STATS,
  STATS_DESCRIPTION,
  QUOTA_LIMIT_DESCRIPTION,
} from '@/constants/uiTexts';
import StatsCard from './fragments/StatsCard';
import DailyUploadsChart from './fragments/DailyUploadsChart';

const StatsPage = () => {
  return (
    <div>
      <Alert variant="warn" className="mb-5">
        {QUOTA_LIMIT_DESCRIPTION}
      </Alert>
      <h1 className="text-lg leading-6 font-medium ">{STATS}</h1>
      <h2 className="text-sm leading-5 text-gray-500 dark:text-gray-400">
        {STATS_DESCRIPTION}
      </h2>

      <StatsCard />
      <DailyUploadsChart />
    </div>
  );
};

export default StatsPage;
