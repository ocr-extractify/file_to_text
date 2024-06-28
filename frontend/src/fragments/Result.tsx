import TextArea from '@/components/inputs/TextArea';
import TextSkeleton from '@/components/skeletons/TextSkeleton';
import {
  ANALYZED_FILE_CONFIDENCE,
  ANALYZED_FILE_DETECTED_LANGUAGES,
  ANALYZED_FILE_LANGUAGE_CODE,
  ANALYZED_FILE_LEARN_MORE,
} from '@/constants/uiTexts';
import BoxSkeleton from '@/components/skeletons/BoxSkeleton';
import { toPercentage } from '@/utils/datastructures/float';
import { APIFile } from '@/utils/types';

type Props = {
  result: APIFile;
  isLoading?: boolean;
};

const Result = ({ result, isLoading }: Props) => {
  return (
    <div className="relative bg-white">
      <div className="lg:px-8">
        <div className="relative mx-auto px-4 sm:px-6 lg:px-0 space-y-2">
          <div className="pt-12 sm:pt-16 lg:pt-20 space-y-2">
            {isLoading ? (
              <TextSkeleton className="h-[1.875rem]" />
            ) : (
              <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                {result.name}
              </h2>
            )}
            {isLoading ? (
              <TextSkeleton className="h-[1.25rem]" />
            ) : (
              <h3 className="text-base font-medium text-gray-500">
                {new Date(result.created_at).toLocaleString()}
              </h3>
            )}
          </div>

          {isLoading ? (
            <BoxSkeleton className="w-full h-48" />
          ) : (
            <TextArea label="Text" className="h-48" readOnly>
              {result.analysis.text}
            </TextArea>
          )}
          <div className="mt-10">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
              <div className="border-t-2 border-gray-100 pt-6">
                <dt className="text-2xl font-medium text-gray-500">
                  {ANALYZED_FILE_CONFIDENCE}
                </dt>
                <dd className="text-xl font-medium tracking-tight text-gray-900">
                  {isLoading ? (
                    <TextSkeleton />
                  ) : (
                    <>
                      {toPercentage(
                        result.analysis?.pages?.[0].layout?.confidence || 0,
                      )}
                    </>
                  )}
                </dd>
              </div>

              <div className="border-t-2 border-gray-100 pt-6 grid">
                <dt className="text-2xl font-medium text-gray-500">
                  {ANALYZED_FILE_DETECTED_LANGUAGES}
                </dt>
                <dd className="text-base font-medium tracking-tight text-gray-900">
                  {isLoading ? (
                    <TextSkeleton />
                  ) : (
                    <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.analysis?.pages?.[0]?.detectedLanguages?.map(
                        (dl) => (
                          <div className="flex flex-col rounded-md shadow-md p-1">
                            <div className="flex justify-between">
                              <span>{ANALYZED_FILE_LANGUAGE_CODE}</span>
                              <span>{dl.languageCode}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{ANALYZED_FILE_CONFIDENCE}</span>
                              <span>{toPercentage(dl.confidence)}</span>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
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

export default Result;
