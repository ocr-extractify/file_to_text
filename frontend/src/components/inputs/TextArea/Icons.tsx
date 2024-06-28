import { MdCopyAll } from 'react-icons/md';
import { LuDownload } from 'react-icons/lu';

type Props = {
  data: React.ReactNode;
};

const Icons = ({ data }: Props) => {
  async function copy() {
    await navigator.clipboard.writeText(data as string);
  }

  async function download() {
    const text = data as string;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="absolute right-4 top-2">
      <button
        onClick={copy}
        className="p-1.5 rounded-full transition-transform transform active:scale-90 active:bg-gray-300"
      >
        <MdCopyAll className="w-5 h-5" />
      </button>
      <button
        onClick={download}
        className="p-1.5 rounded-full transition-transform transform active:scale-90 active:bg-gray-300"
      >
        <LuDownload className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Icons;
