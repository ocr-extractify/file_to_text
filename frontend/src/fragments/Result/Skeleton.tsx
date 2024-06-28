import TextArea from '@/components/inputs/TextArea';
import {
  ANALYZED_FILE_CONFIDENCE,
  ANALYZED_FILE_DETECTED_LANGUAGES,
  ANALYZED_FILE_LANGUAGE_CODE,
  ANALYZED_FILE_LEARN_MORE,
} from '@/constants/uiTexts';

const Skeleton = () => {
  return (
    <div className="relative bg-white">
      <div className="lg:px-8">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-0 space-y-2">
          <div className="pt-12 sm:pt-16 lg:pt-20 space-y-2">
            <h2 className="skeleton w-5/6"></h2>

            <h3 className="skeleton w-24 py-2"></h3>
          </div>

          <TextArea label="Text" className="h-48 skeleton" readOnly />

          <div className="mt-10">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-2xl font-medium text-gray-500 truncate">
                  {ANALYZED_FILE_CONFIDENCE}
                </dt>
                <dd className="skeleton w-24"></dd>
              </div>

              <div className="border-t-2 border-gray-100 pt-6 grid">
                <dt className="text-2xl font-medium text-gray-500">
                  {ANALYZED_FILE_DETECTED_LANGUAGES}
                </dt>
                <dd className="text-base font-medium tracking-tight text-gray-900">
                  <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex flex-col rounded-md shadow-md p-1 space-y-2">
                      <div className="flex justify-between">
                        <span className="truncate">
                          {ANALYZED_FILE_LANGUAGE_CODE}
                        </span>
                        <span className="skeleton w-12 p-2"></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="truncate">
                          {ANALYZED_FILE_CONFIDENCE}
                        </span>
                        <span className="skeleton w-12 p-2"></span>
                      </div>
                    </div>

                    <div className="flex flex-col rounded-md shadow-md p-1 space-y-2">
                      <div className="flex justify-between">
                        <span className="truncate">
                          {ANALYZED_FILE_LANGUAGE_CODE}
                        </span>
                        <span className="skeleton w-12 p-2"></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="truncate">
                          {ANALYZED_FILE_CONFIDENCE}
                        </span>
                        <span className="skeleton w-12 p-2"></span>
                      </div>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
            <div className="mt-10">
              <a href="#" className="text-base font-medium text-indigo-600">
                {ANALYZED_FILE_LEARN_MORE}
                <span aria-hidden="true">&rarr;</span>{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
